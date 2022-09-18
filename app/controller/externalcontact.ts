import BaseController from './base';

// 外部联系人管理
export default class externalContactController extends BaseController {
  // 获取客户列表
  async list() {
    const { ctx, config } = this;
    const { data: { external_userid: externalUserId } } = await ctx.curl(config.workWx.BaseUrl + `/externalcontact/list?access_token=${ctx.state.accessToken}&userid=${this.getQuery().userId}`, {
      dataType: 'json',
      contentType: 'json',
    });
    this.success({ data: externalUserId });
  }

  // 获取客户列表
  async get() {
    const { ctx, config } = this;
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/externalcontact/get?access_token=${ctx.state.accessToken}&external_userid=${this.getQuery().externalUserId}`, {
      dataType: 'json',
      contentType: 'json',
    });
    this.success({ data });
  }

  // 批量获取客户详情
  async batch() {
    const { ctx, config } = this;
    const userIdList = this.getBody().userIdList || [ 'LiuBao' ];
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/externalcontact/batch/get_by_user?access_token=${ctx.state.accessToken}`, {
      dataType: 'json',
      contentType: 'json',
      method: 'POST',
      data: {
        userid_list: userIdList,
        cursor: '',
        limit: 100,
      },
    });
    this.success({ data });
  }

  // 创建企业群发
  async addMsgTemplate() {
    const { ctx, config } = this;
    const sender = this.getBody().sender || 'LiuBao';
    const content = this.getBody().content || '文本消息内容';
    const externalUserId = this.getBody().externalUserId || [ 'wmiigBCQAAezWM7F24TNoKYJUaDm0L5A' ];
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/externalcontact/add_msg_template?access_token=${ctx.state.accessToken}`, {
      dataType: 'json',
      contentType: 'json',
      method: 'POST',
      data: {
        chat_type: 'single',
        external_userid: externalUserId,
        sender,
        text: {
          content,
        },
      },
    });
    this.success({ data });
  }

  // 获取群发记录列表
  async getGroupMsgListV2() {
    const { ctx, config } = this;
    const currentTime = Date.parse(new Date().toString()) / 1000;
    const creator = this.getBody().creator;
    const chatType = this.getBody().chatType || 'single'; // single为客户，group为客户群
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/externalcontact/get_groupmsg_list_v2?access_token=${ctx.state.accessToken}`, {
      dataType: 'json',
      contentType: 'json',
      method: 'POST',
      data: {
        chat_type: chatType,
        start_time: currentTime - 10000, // 一个月以前
        end_time: currentTime,
        creator,
        filter_type: 1,
        limit: 50,
        cursor: '',
      },
    });
    this.success({ data });
  }
}
