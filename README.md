**[构建的服务地址](https://work-wx.liubao.org.cn/)** 

### 实现了如下功能：
- 扫码授权登录
- 网页授权登录
- 获取用户信息
- 自建应用消息推送
- 群聊相关api
- 通讯录管理相关api
- 外部联系人相关api

### how to use
copy .env.example in the root directory changes to .env, and add your own configuration
## QuickStart

### Development

```bash
$ npm i
$ npm run dev
$ open http://localhost:7004/
```

Don't tsc compile at development mode, if you had run `tsc` then you need to `npm run clean` before `npm run dev`.

### Deploy

```bash
$ npm run tsc
$ npm start
```
<b>tips:如果使用docker部署一定要删除--daemon  
如果不需要docker部署，请在package.json文件启动命令开启后台模式</b>
```bash
 "start": "egg-scripts start --port=7004 --daemon --workers=1 --title=egg-server-work-wx"
```
### docker build
```bash
docker build -t work-wx . #创建镜像
docker run -itd --name work-wx -p 7004:7004 work-wx #运行一个容器 work-wx也可换成上面创建的镜像id
```

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
