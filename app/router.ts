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

  /* 群聊相关api start */
  router.post('/work/appchat/create', workAccessToken, controller.appChat.create); // 创建群聊会话
  router.post('/work/appchat/send', workAccessToken, controller.appChat.send); // 发送群聊会话
  router.get('/work/appchat/get', workAccessToken, controller.appChat.get); // 获取群聊会话
  router.post('/work/appchat/update', workAccessToken, controller.appChat.update); // 获取群聊会话
  /* 群聊相关api end */

  /* 成员管理相关api start */
  router.post('/work/user/list_id', workAccessToken, controller.user.list); // 获取成员ID列表
  /* 成员管理相关api end */
};
