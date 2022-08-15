import BaseService from './Base';

/**
 * 企业微信 Service
 */
export default class Test extends BaseService {
  public async getToken() {
    const { ctx, config } = this;
    let dateResult: string = await ctx.service.base.getWechatRedis().get('work:access_token') || '';
    if (!dateResult) {
      const { data: { access_token, expires_in } } = await ctx.curl(
        config.workWx.BaseUrl + 'gettoken?corpid=' + config.workWx.CorpId + '&corpsecret=' + config.workWx.Secret, {
          dataType: 'json',
          timeout: 2000,
        },
      );
      dateResult = access_token;
      await ctx.service.base.getWechatRedis().set('work:access_token', access_token, 'EX', expires_in || 7200);
    }
    return dateResult;
  }

  public async sendMessage(accessToken: string, msgtype: string, msgtypeInfo: object, to) {
    const { ctx, config } = this;
    const AgentId = config.workWx.AgentId;
    return await ctx.curl(config.workWx.BaseUrl + 'message/send?access_token=' + accessToken, {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
      data: {
        touser: to.touser || 'UserID1|UserID2|UserID3', // id以中竖线拼接
        toparty: to.toparty, // id以中竖线拼接
        totag: to.totag, // id以中竖线拼接
        msgtype,
        agentid: AgentId,
        [msgtype]: msgtypeInfo,
        safe: 0,
        enable_id_trans: 0,
        enable_duplicate_check: 0,
        duplicate_check_interval: 1800,
      },
    });
  }
}
