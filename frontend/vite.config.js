import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url'; // Required for __dirname equivalent in ESM
import { defineConfig } from 'vite';

// Define __dirname equivalent
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
   plugins: [react(), tailwindcss()],
   resolve: {
      alias: {
         '@': path.resolve(__dirname, 'src'),
         '@components': path.resolve(__dirname, 'src/components'),
         '@pages': path.resolve(__dirname, 'src/pages'),
         '@assets': path.resolve(__dirname, 'src/assets'),
         '@style': path.resolve(__dirname, 'src/style'),
      },
   },
});
