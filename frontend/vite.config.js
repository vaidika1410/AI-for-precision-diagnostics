import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Change `/your-repo-name/` to match your GitHub repository name!
export default defineConfig({
  plugins: [react()],
  base: 'AI-for-precision-diagnostics', 
});
