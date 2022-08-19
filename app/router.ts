import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const workAccessToken = middleware.workAccessToken();

  router.get('/', controller.home.index);
  /* 企业微信api start */
  router.get('/work/getToken', controller.work.getToken);
  router.all('/work/send', workAccessToken, controller.work.send);
  router.get('/work/authorize', workAccessToken, controller.work.authorize); // 企业微信网页授权
  router.get('/work/back', workAccessToken, controller.work.back); // 授权后回调地址
  router.post('/work/recall', workAccessToken, controller.work.recall); // 撤回应用消息
  router.get('/work/openqr', workAccessToken, controller.work.openqr); // 构造登录二维码
  /* 企业微信api end */
};
