import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/users";

const router = new Router({ prefix: '/api/v1/users' });

const findByUsername = async (ctx: RouterContext, next: any) => {
  let username = ctx.params.username;
  /*if((id < cats.length +1) && (id > 0)){
    ctx.body = cats [id-1];
  } else {
    ctx.status = 404;
  }*/
  let users = await model.findByUsername(username);
  if (users.length) {
    ctx.body = users[0];
  } else {
    ctx.status = 404;
  }
  await next();
}


//router.get('/', getAll);
//router.get('/:id([0-9]{1,})', getById);
router.get('/:username', findByUsername);

export { router };