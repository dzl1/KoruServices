import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from 'vite';

const root = fileURLToPath(new URL('.', import.meta.url));

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(root, 'index.html'),
        approach: resolve(root, 'approach.html'),
        childProtectionPrivacy: resolve(root, 'child-protection-privacy.html'),
        gallery: resolve(root, 'gallery.html'),
      },
    },
  },
});
