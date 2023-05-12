import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";

const cats = [
  { title: 'Cat1', fullText: 'detail1' },
  { title: 'cat2', fullText: 'detail2' },
  { title: 'cat3', fullText: 'detail3' },
  { title: 'cat4', fullText: 'detail4' },
]

const router = new Router({ prefix: '/api/v1/cats' });

//CRUD Function
const getAll = async (ctx: RouterContext, next: any) => {
  ctx.body = cats;
  await next();
}

const createRecord = async (ctx: RouterContext, next: any) => {
  let { title, fullText } = ctx.request.body;
  let newRecord = { title: title, fullText: fullText };
  cats.push(newRecord);
  ctx.status = 201;
  ctx.body = newRecord;
  await next();
}

const getById = async (ctx: RouterContext, next: any) => {
  await next();
}

const updateRecord = async (ctx: RouterContext, next: any) => {
  await next();
}

const deleteRecord = async (ctx: RouterContext, next: any) => {
  await next();
}

//Endpoint
router.get('/', getAll);
router.post('/', bodyParser(), createRecord);
router.get('/:id', getById);
router.put('/:id', updateRecord);
router.delete('/:id', deleteRecord);

export { router };
