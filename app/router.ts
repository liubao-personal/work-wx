import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const workAccessToken = middleware.workAccessToken()

  router.get('/', controller.home.index);
  /* 企业微信api start */
  router.get('/work/getToken', controller.work.getToken)
  router.get('/work/send', workAccessToken, controller.work.send)
  /* 企业微信api end */
};
