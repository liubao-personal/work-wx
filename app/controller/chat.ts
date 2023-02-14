import BaseController from './base';

export default class ChatController extends BaseController {
  public async test() {
    const { ctx } = this;
    const { ChatGPTAPI } = await import ('chatgpt'); // es6动态加载纯esm的包
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    const query = this.getQuery().query;

    // const res = await api.sendMessage('请用中文和我说话');
    const res = await api.sendMessage(query, {
      onProgress: partialResponse => console.log(partialResponse.text),
    });
    ctx.body = res.text;
  }
}
