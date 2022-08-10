import {EggAppConfig, EggAppInfo, PowerPartial} from 'egg';
import dotenv from "dotenv"; // 引入环境变量

dotenv.config()

export default (appInfo: EggAppInfo) => {
  const config = {} as PowerPartial<EggAppConfig>;

  // override config from framework / plugin
  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1660110624517_4272';

  // add your egg config in here
  config.middleware = [];

  // work-wx config
  config.workWx = {
    AgentId:process.env?.AgentId || 'your 自建应用id',
    Secret:process.env?.Secret || 'your 自建应用密钥',
    CorpId:process.env?.CorpId || 'your 企业id'
  };

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};
