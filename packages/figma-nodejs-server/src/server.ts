import Koa from 'koa';
import cors from '@koa/cors';
import bodyparser from '@koa/bodyparser';
const app = new Koa();
app.use(bodyparser());
app.use(cors());
app.use((ctx, next) => {
  console.log(ctx.request.body);
  ctx.body = 'Figma Nodejs Server Hello';    
});

app.listen(3030, () => {
  console.log('server is running at port http://localhost:3030');
});
