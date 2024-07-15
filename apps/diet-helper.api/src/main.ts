import { Application } from './app/app';

const app = new Application();

(async () => {
  await app.start();
})();
