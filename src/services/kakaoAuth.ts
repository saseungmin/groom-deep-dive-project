// 카카오 개발자 콘솔에서 등록한 애플리케이션의 JavaScript 키를 입력
const KAKAO_APP_KEY = import.meta.env.VITE_KAKAO_APP_KEY;
const KAKAO_REDIRECT_URI = `${window.location.origin}/auth/kakao/callback`;

/**
 * 카카오 SDK 초기화
 */
export const initializeKakao = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_APP_KEY);
      console.log('Kakao SDK initialized');
    }
    resolve();
  });
};

/**
 * 카카오 로그인 요청 함수
 */
export const initiateKakaoLogin = async (): Promise<void> => {
  // SDK 초기화 확인
  await initializeKakao();

  // 카카오 로그인 요청
  window.Kakao.Auth.authorize({
    redirectUri: KAKAO_REDIRECT_URI,
    scope: 'profile_nickname, profile_image', // account_email(biz만 가능) 동의 항목
  });
};

/**
 * 액세스 토큰을 사용하여 사용자 정보 요청
 */
export const fetchKakaoUserInfo = (): Promise<Kakao.API.ApiResponse> => {
  return new Promise((resolve, reject) => {
    window.Kakao.API.request({
      url: '/v2/user/me',
      success: (response) => {
        resolve(response);
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};

/**
 * 카카오 로그아웃
 */
export const logoutKakao = (): Promise<void> => {
  return new Promise((resolve) => {
    if (window.Kakao && window.Kakao.Auth.getAccessToken()) {
      window.Kakao.Auth.logout(() => {
        resolve();
      });
    } else {
      resolve();
    }
  });
};

/**
 * 카카오 연결 끊기 (회원 탈퇴)
 */
export const unlinkKakao = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    window.Kakao.API.request({
      url: '/v1/user/unlink',
      success: () => {
        resolve();
      },
      fail: (error) => {
        reject(error);
      },
    });
  });
};
