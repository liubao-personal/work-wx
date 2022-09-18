import BaseController from './base';

// 成员管理
export default class userController extends BaseController {
  /**
   * 获取成员ID列表
   */
  async list() {
    const { ctx, config } = this;
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/user/list_id?access_token=${ctx.state.contactsAccessToken}`, {
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

  // 获取成员详情
  async get() {
    const { ctx, config } = this;
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/user/get?access_token=${ctx.state.accessToken}&userid=${this.getQuery().userId}`, {
      dataType: 'json',
      contentType: 'json',
    });
    this.success({ data });
  }

  // 获取部门成员列表(组织架构)
  async simplelist() {
    const { ctx, config } = this;
    const departmentId = this.getQuery().departmentId ? `&department_id=${this.getQuery().departmentId}` : '';
    const { data: { userlist } } = await ctx.curl(config.workWx.BaseUrl + `/user/simplelist?access_token=${ctx.state.accessToken}${departmentId}&fetch_child=1`, {
      dataType: 'json',
      contentType: 'json',
    });
    this.success({ data: userlist });
  }

  // 获取部门列表
  async departmentList() {
    const { ctx, config } = this;
    // const departmentId = this.getQuery().departmentId?`&department_id=${this.getQuery().departmentId}`:'';
    const { data: { department } } = await ctx.curl(config.workWx.BaseUrl + `/department/list?access_token=${ctx.state.accessToken}`, {
      dataType: 'json',
      contentType: 'json',
    });
    this.success({ data: department });
  }
}
