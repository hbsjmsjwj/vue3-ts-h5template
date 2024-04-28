export const isDev = process.env.NODE_ENV === 'development';
export const whiteListRouteNames = [
  'Home',
  'login',
  'register',
  '401',
  '404',
  '403',
  '500',
] as const;
export const redirectUrlKey = 'redirectUrl' as const;
export const proxyLocation = '/api';
export const axiosConfig = {
  baseURL:proxyLocation,
  // 设置超时时间
  timeout: 60000,
  // 跨域时候允许携带凭证
  withCredentials: true,
};