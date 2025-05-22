import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useToast } from '@/contexts/ToastContext';
import { extractAuthInfoFromHash, fetchUserInfo } from '@/services/googleAuth';
import { useAuthStore } from '@/stores/authStore';

function GoogleAuthCallbackPage() {
  const [isProcessing, setIsProcessing] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const { toast } = useToast();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { accessToken, error } = extractAuthInfoFromHash();

        if (error) {
          setError('인증 과정에서 오류가 발생했습니다: ' + error);
          toast.error({
            title: '로그인 실패',
            description: '인증 과정에서 오류가 발생했습니다.',
          });
          return;
        }

        if (!accessToken) {
          setError('액세스 토큰을 찾을 수 없습니다.');
          toast.error({
            title: '로그인 실패',
            description: '액세스 토큰을 찾을 수 없습니다.',
          });
          return;
        }

        // 액세스 토큰으로 사용자 정보 가져오기
        const userInfo = await fetchUserInfo(accessToken);

        // 로그인 처리 및 상태 저장
        login(userInfo, accessToken);

        toast.success({
          title: '로그인 성공',
          description: `${userInfo.name}님, 환영합니다!`,
        });

        // 홈페이지로 리다이렉트
        navigate('/');
      } catch (err) {
        console.error('Auth callback error:', err);
        setError('인증 처리 중 오류가 발생했습니다.');
        toast.error({
          title: '로그인 실패',
          description: '인증 처리 중 오류가 발생했습니다.',
        });
      } finally {
        setIsProcessing(false);
      }
    };

    handleAuthCallback();
  }, [login, navigate, toast]);

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

export default GoogleAuthCallbackPage;
