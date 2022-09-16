import BaseController from './base';

// 成员管理
export default class userController extends BaseController {
  /**
   * 获取成员ID列表
   */
  async list() {
    const { ctx, config } = this;
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/user/list_id?access_token=${ctx.state.accessToken}`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        // cursor: 0,
        // limit: 10000
      },
    });
    this.success({ data });
  }
}
