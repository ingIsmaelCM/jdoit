
const appConfig: Record<string, string | number> = {
  port: process.env.APP_PORT || 3000,
  name: process.env.APP_NAME || "myapp",
  env: process.env.APP_ENV||'env',
  key: process.env.APP_KEY||''
};

export default appConfig;