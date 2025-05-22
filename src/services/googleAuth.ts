interface GoogleAuthResponse {
  accessToken: string;
  profile: {
    id: string;
    name: string;
    email: string;
    picture: string;
  };
}

// Google OAuth 2.0 인증 엔드포인트
const OAUTH2_ENDPOINT = 'https://accounts.google.com/o/oauth2/v2/auth';
const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = `${window.location.origin}/auth/google/callback`;
const SCOPE = 'email profile';

/**
 * Google OAuth 로그인 요청 함수
 */
export const initiateGoogleLogin = () => {
  const params = new URLSearchParams({
    client_id: CLIENT_ID,
    redirect_uri: REDIRECT_URI,
    response_type: 'token',
    scope: SCOPE,
    include_granted_scopes: 'true',
    state: Math.random().toString(36).substring(2, 15),
  });

  window.location.href = `${OAUTH2_ENDPOINT}?${params.toString()}`;
};

/**
 * URL의 해시 파라미터에서 OAuth 인증 정보 추출
 */
export const extractAuthInfoFromHash = (): {
  accessToken: string | null;
  error: string | null;
} => {
  if (!window.location.hash) {
    return { accessToken: null, error: null };
  }

  const params = new URLSearchParams(window.location.hash.substring(1));
  const accessToken = params.get('access_token');
  const error = params.get('error');

  return { accessToken, error };
};

/**
 * 액세스 토큰을 사용하여, 사용자 프로필 정보 요청
 */
export const fetchUserInfo = async (
  accessToken: string,
): Promise<GoogleAuthResponse['profile']> => {
  const response = await fetch(
    'https://www.googleapis.com/oauth2/v3/userinfo',
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error('Failed to fetch user info');
  }

  const data = await response.json();

  return {
    id: data.sub,
    name: data.name,
    email: data.email,
    picture: data.picture,
  };
};
