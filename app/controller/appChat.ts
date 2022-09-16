import BaseController from './base';

// 群聊相关api
export default class appChatController extends BaseController {
  /**
   * 创建群聊
   */
  async create() {
    const { ctx, config } = this;
    const { name, owner, userlist, chatid } = this.getBody();
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/appchat/create?access_token=${ctx.state.accessToken}`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        name: name || '测试群聊',
        owner: owner || 'LiuBao',
        userlist: userlist || [ 'LiuBao', 'Yang' ],
        chatid: chatid || 'ceshi0001',
      },
    });
    this.success({ data });
  }

  /**
   * 发送群聊会话
   */
  async send() {
    const { ctx, config } = this;
    const { chatid } = this.getBody();
    const msgtype = this.getBody().msgtype || 'text';
    const msgtypeInfo = this.getBody().msgtypeInfo || { content: '测试群聊消息推送' };
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/appchat/send?access_token=${ctx.state.accessToken}`, {
      method: 'POST',
      dataType: 'json',
      contentType: 'json',
      data: {
        chatid,
        msgtype,
        [msgtype]: msgtypeInfo,
        safe: 0,
      },
    });
    this.success({ data });
  }

  /**
   * 获取群聊会话
   */
  async get() {
    const { ctx, config } = this;
    const chatid = this.getQuery().chatid || 'ceshi0001';
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/appchat/get?access_token=${ctx.state.accessToken}&chatid=${chatid}`, {
      dataType: 'json',
      contentType: 'json',
    });
    this.success({ data });
  }

  /**
   * 修改群聊会话
   */
  async update() {
    const { ctx, config } = this;
    const { chatid, name, owner, addUserList, delUserList } = this.getBody();
    const { data } = await ctx.curl(config.workWx.BaseUrl + `/appchat/update?access_token=${ctx.state.accessToken}`, {
      dataType: 'json',
      contentType: 'json',
      method: 'POST',
      data: {
        chatid: chatid || 'ceshi0001',
        name,
        owner,
        add_user_list: addUserList || [],
        del_user_list: delUserList || [],
      },
    });
    this.success({ data });
  }
}
