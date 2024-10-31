import { fileURLToPath } from 'url';

export default {
  base: '/',
  build: {
    rollupOptions: {
      input: {
        landing: fileURLToPath(new URL('./index.html', import.meta.url)),
        repositories: fileURLToPath(new URL('./repositories.html', import.meta.url)),
      },
    },
  },
};
