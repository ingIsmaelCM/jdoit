export const authConfig: Record<string, any>={
  expiresIn: process.env.AUTH_EXPIRES_IN||'60s',
  jwtCookieName: process.env.AUTH_JWT_COOKIE_NAME||'accessToken'
}