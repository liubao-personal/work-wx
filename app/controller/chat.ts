import BaseController from './base';
import { PassThrough } from 'stream';

export default class ChatController extends BaseController {
  public async test() {
    const { ctx } = this;
    const { ChatGPTAPI } = await import ('chatgpt'); // es6动态加载纯esm的包
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    const query = this.getQuery().keywords;
    this.ctx.set('Content-Type', 'text/event-stream; charset="utf-8"');
    this.ctx.set('Connection', 'keep-alive');
    this.ctx.set('Cache-Control', 'no-cache');
    this.ctx.set('Access-Control-Allow-Origin', '*');
    const stream = new PassThrough();
    api.sendMessage(query, {
      onProgress: partialResponse => stream.write(`${partialResponse.text}\n\n`),
    })
      .then(response => {
        console.log(1222, response.text);
      });
    stream.on('close', function() {
      console.log('closed.');
    });
    ctx.body = stream;
  }

  public async text() {
    const { ctx } = this;
    const { ChatGPTAPI } = await import ('chatgpt'); // es6动态加载纯esm的包
    const api = new ChatGPTAPI({
      apiKey: process.env.OPENAI_API_KEY || '',
    });
    const query = this.getQuery().keywords;
    const res = await api.sendMessage(query);
    ctx.body = { code: 0, success: true, result: res.text };
  }
}
