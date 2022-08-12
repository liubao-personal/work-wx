import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const workAccessToken = middleware.workAccessToken();

  router.get('/', controller.home.index);
  /* 企业微信api start */
  router.get('/work/getToken', controller.work.getToken);
  router.get('/work/send', workAccessToken, controller.work.send);
  router.get('/work/authorize', workAccessToken, controller.work.authorize); // 企业微信网页授权
  router.get('/work/back', workAccessToken, controller.work.back); // 授权后回调地址
  /* 企业微信api end */
};
