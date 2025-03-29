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
         '@public': path.resolve(__dirname, 'public/assets'),
         '@context': path.resolve(__dirname, 'src/context/'),
         '@hooks': path.resolve(__dirname, 'src/hooks/'),
      },
   },
   server: {
      proxy: {
         '/api': {
            // Proxy requests starting with /api
            target: 'http://localhost:8000', // Your PHP backend development server URL
            changeOrigin: true, // Required for CORS in some cases
            rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Remove the /api prefix when forwarding
         },
      },
   },
});
