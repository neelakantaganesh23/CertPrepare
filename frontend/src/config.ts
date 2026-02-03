const config = {
  apiBase: (import.meta as any).env.VITE_API_BASE || 'http://localhost:3001/api',
  environment: (import.meta as any).env.MODE,
};

export default config;
