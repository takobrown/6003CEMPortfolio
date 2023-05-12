import Koa from "koa";
//import Router, { RouterContext } from "koa-router";
import logger from "koa-logger";
import json from "koa-json";

import { router as cats } from "./routes/cats";

const app: Koa = new Koa();
//const router: Router = new Router();

/*const welcomeAPI = async (ctx: RouterContext, next: any) => {
  ctx.body = { message: "Welcome to The Pet Shelter API!" };
  await next();
}

//End-point
router.get('/api/v1', welcomeAPI);*/



app.use(logger());
app.use(json());
//app.use(router.routes());
app.use(cats.routes());

app.listen(10888);