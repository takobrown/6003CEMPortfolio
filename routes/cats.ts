import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/cats";

const cats = [
  { title: 'Cat1', fullText: 'detail1' },
  { title: 'cat2', fullText: 'detail2' },
  { title: 'cat3', fullText: 'detail3' },
  { title: 'cat4', fullText: 'detail4' },
]

const router = new Router({ prefix: '/api/v1/cats' });

//CRUD Function
const getAll = async (ctx: RouterContext, next: any) => {
  //ctx.body = cats;
  let cats = await model.getAll();
  if (cats.length) {
    ctx.body = cats;
  } else {
    ctx.body = {};
  }
  await next();
}

const createRecord = async (ctx: RouterContext, next: any) => {
  /*let { title, fullText } = ctx.request.body;
  let newRecord = { title: title, fullText: fullText };
  cats.push(newRecord);
  ctx.status = 201;
  ctx.body = newRecord;*/
  const body = ctx.request.body;
  let result = await model.add(body);
  if (reseult.status == 201){
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = {err: "Failed to insert data."}
  }
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  /*if((id < cats.length +1) && (id > 0)){
    ctx.body = cats [id-1];
  } else {
    ctx.status = 404;
  }*/
  let cats = await model.getById(id);
  if (cats.length){
    ctx.body = cats[0];
  } else {
    ctx.status = 404;
  }
  await next();
}

const updateRecord = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  let { title, fullText } = ctx.request.body;
  if ((id < cats.length +1) && (id > 0)) {
    cats[id-1].title = title;
    cats[id-1].fullText = fullText;
    ctx.status = 200;
    ctx.body = cats;
  } else {
    ctx.status = 404;
  }
  await next();
}

const deleteRecord = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  if ((id < cats.length +1) && (id > 0)) {
    cats.splice(id-1, 1);
    ctx.status = 200;
    ctx.body = cats;
  } else {
    ctx.status = 404;
  }
  await next();
}

//Endpoint
router.get('/', getAll);
router.post('/', bodyParser(), createRecord);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', bodyParser(),updateRecord);
router.delete('/:id([0-9]{1,})', deleteRecord);

export { router };
