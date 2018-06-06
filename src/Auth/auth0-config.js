export const AUTH_CONFIG = (process.env.NODE_ENV === 'development') ? {
  domain: 'hodltab.auth0.com',
  clientId: 'bcvfRNa8uDnGA2IiXXX2y0fG7z69bZTq',
  callbackUrl: 'http://localhost:3000/callback',
  dbConnectionName: 'Username-Password-Authentication',
  container: 'auth0-login-container'
} : {
  domain: 'hodltab.auth0.com',
  clientId: 'bcvfRNa8uDnGA2IiXXX2y0fG7z69bZTq',
  callbackUrl: 'http://139.59.76.115/callback',
  dbConnectionName: 'Username-Password-Authentication',
  container: 'auth0-login-container'
}
