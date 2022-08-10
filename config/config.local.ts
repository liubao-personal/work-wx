import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {
    // redis配置
    redis: {
      clients: {
        workWx: {
          port: 6379,
          host: '127.0.0.1',
          password: 'root',
          db: 0,
        },
        app: {
          port: 6379,
          host: '127.0.0.1',
          password: 'root',
          db: 2,
        },
      },
    },
  };
  return config;
};
