import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { config as dotenvConfig } from 'dotenv';

export default defineConfig(({ mode }) => {
  // Carrega o arquivo .env.development durante o desenvolvimento
  if (mode === 'development') {
    dotenvConfig({ path: '.env.development' });
  }
  // Carrega o arquivo .env.production durante a construção para produção
  if (mode === 'production') {
    dotenvConfig({ path: '.env.production' });
  }

  // Restante da configuração do Vite
  return {
    plugins: [react()],
    resolve: {
      alias: [{ find: '@', replacement: path.resolve(__dirname, './src') }],
    },
  };
});