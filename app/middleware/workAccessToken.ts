/**
 * 企业微信access_token中间件校验
 * 有则传递，无则生成
 */
module.exports = () => {
  return async function(ctx, next) {
    ctx.state.accessToken = await ctx.service.base.getWechatRedis().get('work:access_token');
    if (!ctx.state.accessToken) {
      ctx.state.accessToken = await ctx.service.work.getToken();
    }
    await next();
  };
};
