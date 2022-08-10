import { Service, Singleton } from 'egg';
import { Redis } from 'ioredis';

export default class BaseService extends Service {
  // redis workWx
  getWechatRedis() {
    return ((this.app.redis as Singleton<Redis>).get('workWx'));
  }

  // redis app
  getAppRedis() {
    return ((this.app.redis as Singleton<Redis>).get('app'));
  }

}
