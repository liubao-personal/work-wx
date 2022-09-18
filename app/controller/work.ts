import BaseController from './base';

export default class WorkController extends BaseController {
  protected accessToken: string;

  async getToken() {
    const { ctx } = this;
    const dateResult: string = await ctx.service.work.getToken();
    await this.success({ data: dateResult });
  }

  /**
   * 因部分api自建应用无权限调用，需使用通讯录秘钥换的access_token
   */
  async getContactsToken() {
    const { ctx } = this;
    const dateResult: string = await ctx.service.work.getContactsToken();
    await this.success({ data: dateResult });
  }

  async send() {
    const { ctx } = this;
    const body = ctx.request.body;
    const msgtype = body.msgtype || 'text';
    const msgtypeInfo = body.msgtypeInfo || { content: 'hi 我是智能助手锅巴，欢迎使用我的demo测试消息推送' };
    const to = body.to || { touser: '@all', toparty: '', totag: '' };
    const accessToken = ctx.state.accessToken;
    const { data } = await ctx.service.work.sendMessage(accessToken, msgtype, msgtypeInfo, to);
    await this.success({ data });
  }

  /**
   * 企业微信自建应用网页授权地址
   */
  async authorize() {
    const { ctx, config } = this;
    const oauthUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${config.workWx.CorpId}&redirect_uri=${encodeURIComponent(config.workWx.RedirectUri)}&response_type=code&scope=snsapi_privateinfo&state=STATE&agentid=${config.workWx.AgentId}#wechat_redirect`;
    ctx.status = 301;
    ctx.redirect(oauthUrl);
  }

  /**
   * 回调地址拿到code后进行换取用户信息
   */
  async back() {
    const { ctx, config } = this;
    const code = this.getQuery().code;
    const { data: user } = await ctx.curl(config.workWx.BaseUrl + `user/getuserinfo?access_token=${ctx.state.accessToken}&code=${code}`, {
      dataType: 'json',
    });
    const { UserId, DeviceId, user_ticket } = user; // 用户id,设备号,成员票据(访问敏感信息)
    const { data: detail } = await ctx.curl(config.workWx.BaseUrl + `user/getuserdetail?access_token=${ctx.state.accessToken}`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        user_ticket,
      },
    });
    const userInfo: object = { UserId, DeviceId, ...detail }; // 拿到合并后的对象
    this.success({ data: user });
    await ctx.service.base.getWechatRedis()
      .set(`work:userInfo:${UserId}`, JSON.stringify(userInfo));
  }

  /**
   * 撤回应用消息
   */
  async recall() {
    const { ctx, config } = this;
    const msgid = this.getBody().msgid;
    const { data } = await ctx.curl(config.workWx.BaseUrl + `message/recall?access_token=${ctx.state.accessToken}`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        msgid,
      },
    });
    this.success({ data });
  }

  /**
   * 扫码登录的构建地址，重定向后拿到登录者信息
   */
  async openqr() {
    const { ctx, config } = this;
    const oauthUrl = `https://open.work.weixin.qq.com/wwopen/sso/qrConnect?appid=${config.workWx.CorpId}&agentid=${config.workWx.AgentId}&redirect_uri=${encodeURIComponent(config.workWx.RedirectUri)}&state=STATE`;
    ctx.status = 301;
    ctx.redirect(oauthUrl);
  }
}
