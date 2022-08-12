import BaseController from './base';

export default class WorkController extends BaseController {
  protected accessToken: string;

  async getToken() {
    const { ctx } = this;
    const dateResult: string = await ctx.service.work.getToken();
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
}
