import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router';

import { useToast } from '@/contexts/ToastContext';
import { fetchKakaoUserInfo, initializeKakao } from '@/services/kakaoAuth';
import { useAuthStore } from '@/stores/authStore';

function KakaoAuthCallbackPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();

  const [params] = useSearchParams();
  const code = params.get('code');

  useEffect(() => {
    const handleKakaoCallback = async () => {
      try {
        await initializeKakao();
        // 카카오 SDK가 인증 프로세스 완료 후 자동으로 액세스 토큰을 저장함

        if (!code) {
          setError(
            '카카오 로그인에 실패했습니다. 액세스 토큰을 찾을 수 없습니다.',
          );
          toast.error({
            title: '로그인 실패',
            description: '카카오 로그인에 실패했습니다. 다시 시도해주세요.',
          });
          return;
        }

        window.Kakao.Auth.setAccessToken(code);

        const status = await window.Kakao.Auth.getStatusInfo();

        if (status.status !== 'connected') {
          window.Kakao.Auth.setAccessToken(null);
          setError('카카오 로그인에 실패했습니다. 다시 시도해주세요.');
          return;
        }

        const kakaoToken = window.Kakao.Auth.getAccessToken();

        // 사용자 정보 요청
        const userInfo = await fetchKakaoUserInfo();

        // 로그인 처리 및 상태 저장
        login(
          {
            id: userInfo.id,
            name: userInfo.properties.nickname,
            email: userInfo.kakao_account.email || `${userInfo.id}@kakao.user`,
            picture: userInfo.properties.profile_image || '',
          },
          kakaoToken,
        );

        toast.success({
          title: '로그인 성공',
          description: `${userInfo.properties.nickname}님, 환영합니다!`,
        });

        // 홈페이지로 리다이렉트
        navigate('/');
      } catch (err) {
        console.error('Kakao auth callback error:', err);
        setError('인증 처리 중 오류가 발생했습니다.');
        toast.error({
          title: '로그인 실패',
          description: '인증 처리 중 오류가 발생했습니다.',
        });
      } finally {
        setIsProcessing(false);
      }
    };

    handleKakaoCallback();
  }, [login, navigate, toast, code]);

  if (isProcessing) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">로그인 처리 중...</h2>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900 mx-auto"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">로그인 오류</h2>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            로그인 페이지로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  return null;
}

export default KakaoAuthCallbackPage;
