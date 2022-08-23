**[构建的服务地址](https://work-wx.liubao.org.cn/)** 

### 实现了如下功能：
- 扫码授权登录
- 网页授权登录
- 获取用户信息
- 应用消息推送

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

### Npm Scripts

- Use `npm run lint` to check code style
- Use `npm test` to run unit test
- se `npm run clean` to clean compiled js at development mode once

### Requirement

- Node.js 8.x
- Typescript 2.8+
