import { EggAppConfig, EggAppInfo, PowerPartial } from 'egg';
import dotenv from 'dotenv'; // 引入环境变量

dotenv.config();

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660110624517_4272';

  // csrf 安全配置
  config.security = {
    csrf: {
      enable: false,
      domainWhiteList: [ '*' ], // 安全白名单，例如'.domain.com'
    },
  };

  // add your egg config in here
  config.middleware = [
    'req',
    'workAccessToken',
  ];
  config.workAccessToken = {
    enable: false, // workAccessToken中间件注册全局开关，默认close
  };

  // work-wx config
  config.workWx = {
    BaseUrl: process.env?.BASEURL,
    AgentId: process.env?.AGENTID || 'your 自建应用id',
    Secret: process.env?.SECRET || 'your 自建应用密钥',
    ContactsSecret: process.env?.ContactsSecret || 'your 通讯录密钥',
    CorpId: process.env?.CORPID || 'your 企业id',
    RedirectUri: process.env?.REDIRECT_URI || 'your 回调地址，用来授权时接收code',
  };

  config.chat = {
    url: process.env.CHATURL,
  };

  // add your special config in here
  const bizConfig = {
    mySiteUrl: 'https://liubao.org.cn',
    mongoose: {
      client: {
        url: process.env.MONGODBURL,
        options: { useUnifiedTopology: true },
      },
    },
    redis: {
      clients: {
        workWx: {
          port: process.env.REDISPORT,
          host: process.env.REDISHOST,
          password: process.env.REDISPASSWORD,
          db: process.env.REDISDB,
        },
        app: {
          port: process.env.REDISPORT,
          host: process.env.REDISHOST,
          password: process.env.REDISPASSWORD,
          db: 2,
        },
      },
    },
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
