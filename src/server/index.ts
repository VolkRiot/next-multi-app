import Koa from 'koa';
import next from 'next';
import Router from '@koa/router';

const port = parseInt(process.env.PORT as any, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  router.get('/example/apollo', async (ctx) => {
    await app.render(ctx.req, ctx.res, '/example/apollo', ctx.query);
    ctx.respond = false;
  });

  router.all('*', async (ctx) => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.path = ctx.path.replace('/example/_next', '/_next');
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
  });
});
