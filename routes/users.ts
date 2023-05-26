/// Add User
// Update User Info
// Delete User

import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/users";

const router = new Router({ prefix: '/api/v1/users' });


const findByUsername = async (ctx: RouterContext, next: any) => {
  let username = ctx.params.username;
  let users = await model.findByUsername(username);
  if (users.length) {
    ctx.body = users[0];
  } else {
    ctx.status = 404;
  }
  await next();
}

//Get All user
const getAllUsers = async (ctx: RouterContext, next: any) => {
  const users = await model.getAllUsers();
  ctx.body = users;
  await next();
}

const addUser = async (ctx: RouterContext, next: any) => {
  const user = ctx.request.body;
  const result = await model.addUser(user);
  if (result.status === 201) {
    ctx.status = 201;
  } else {
    ctx.status = 500;
  }
  await next();
}

const updateUser = async (ctx: RouterContext, next: any) => {
  const id = parseInt(ctx.params.id);
  const user = ctx.request.body;
  const result = await model.updateUser(id, user);
  if (result.status === 200) {
    ctx.status = 200;
  } else {
    ctx.status = 500;
  }
  await next();
}

const deleteUser = async (ctx: RouterContext, next: any) => {
  const id = parseInt(ctx.params.id);
  const result = await model.deleteUser(id);
  if (result.status === 200) {
    ctx.status = 200;
  } else {
    ctx.status = 500;
  }
  await next();
}



//router.get('/', getAll);
router.get('/:username', findByUsername);
router.use(bodyParser());
router.get('/', getAllUsers);
router.post('/', addUser);
router.put('/username', updateUser);
router.delete('/username', deleteUser);


export { router };
