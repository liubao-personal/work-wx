import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router, middleware } = app;
  const workAccessToken = middleware.workAccessToken();
  const contactsAccessToken = middleware.contactsAccessToken();

  router.get('/', controller.home.index);
  /* 企业微信api start */
  router.get('/work/getToken', controller.work.getToken); // 获取自建应用的access_token
  router.get('/work/getContactsToken', controller.work.getContactsToken); // 获取通讯录的access_token,用来调用通讯录api
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

  /* 通讯录管理相关api start */
  router.get('/work/user/get', workAccessToken, controller.user.get); // 获取成员ID详情
  router.post('/work/user/list_id', contactsAccessToken, controller.user.list); // 获取成员ID列表(全量)
  router.get('/work/user/simplelist', workAccessToken, controller.user.simplelist); // 获取部门成员(组织架构)
  router.get('/work/department/list', workAccessToken, controller.user.departmentList); // 获取部门ID列表
  /* 通讯录管理相关api end */
};
