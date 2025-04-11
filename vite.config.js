import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  server: {
    port: 3000, // Fixes the development server to port 3000
    strictPort: true, // Ensures Vite fails if port 3000 is in use instead of switching to another port
    host: true, // Allows external access (e.g., from other devices on the network, optional)
  },
});