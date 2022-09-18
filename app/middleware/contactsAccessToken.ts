/**
 * 企业微信通讯录access_token中间件校验
 * 有则传递，无则生成
 */
module.exports = () => {
  return async function(ctx, next) {
    ctx.state.contactsAccessToken = await ctx.service.base.getWechatRedis().get('contacts:access_token');
    if (!ctx.state.contactsAccessToken) {
      ctx.state.contactsAccessToken = await ctx.service.work.getContactsToken();
    }
    await next();
  };
};
