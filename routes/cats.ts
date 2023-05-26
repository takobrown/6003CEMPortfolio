import Router, { RouterContext } from "koa-router";
import bodyParser from "koa-bodyparser";
import * as model from "../models/cats";
import { validateCats } from "../controllers/validation";
import { basicAuth } from "../controllers/auth";

/*const cats = [
  { title: 'Cat1', fullText: 'detail1' },
  { title: 'cat2', fullText: 'detail2' },
  { title: 'cat3', fullText: 'detail3' },
  { title: 'cat4', fullText: 'detail4' },
]*/

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
  if (result.status == 201) {
    ctx.status = 201;
    ctx.body = body;
  } else {
    ctx.status = 500;
    ctx.body = { err: "Failed to insert data." }
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
  if (cats.length) {
    ctx.body = cats[0];
  } else {
    ctx.status = 404;
  }
  await next();
}

const updateRecord = async (ctx: RouterContext, next: any) => {
  /*let id = +ctx.params.id;
  let { title, fullText } = ctx.request.body;
  if ((id < cats.length + 1) && (id > 0)) {
    cats[id - 1].title = title;
    cats[id - 1].fullText = fullText;
    ctx.status = 200;
    ctx.body = cats;
  } else {
    ctx.status = 404;
  }
  await next();
}*/
  const body = ctx.request.body;
  const id = +ctx.params.id; // assuming that the record's id is passed as a parameter in the request

  try {
    const existingRecord = await model.getById(id); // assuming that the model has a getById method to fetch the existing record
    if (!existingRecord) {
      ctx.status = 404;
      ctx.body = { err: "Record not found." };
      return;
    }

    const updatedRecord = { ...existingRecord, ...body }; // merge the existing record with the updated values

    const result = await model.update(id, body); // assuming that the model has an update method to update the record
    if (result.status == 200) {
      ctx.status = 200;
      ctx.body = body;
    } else {
      ctx.status = 500;
      ctx.body = { err: "Failed to update data." };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { err: "Failed to update data." };
  }

  await next();
}

/*const deleteRecord = async (ctx: RouterContext, next: any) => {
  let id = +ctx.params.id;
  if ((id < cats.length + 1) && (id > 0)) {
    cats.splice(id - 1, 1);
    ctx.status = 200;
    ctx.body = cats;
  } else {
    ctx.status = 404;
  }
  await next();
}*/

const deleteRecord = async (ctx: RouterContext, next: any) => {
  const id = ctx.params.id; // assuming that the record's id is passed as a parameter in the request

  try {
    const existingRecord = await model.getById(id); // assuming that the model has a getById method to fetch the existing record
    if (!existingRecord) {
      ctx.status = 404;
      ctx.body = { err: "Record not found." };
      return;
    }

    const result = await model.deleteCats(id); // assuming that the model has a delete method to delete the record
    if (result.status == 200) {
      ctx.status = 200;
      ctx.body = { msg: "Record deleted." };
    } else {
      ctx.status = 500;
      ctx.body = { err: "Failed to delete data." };
    }
  } catch (err) {
    ctx.status = 500;
    ctx.body = { err: "Failed to delete data." };
  }

  await next();
}

//Endpoint
router.get('/', getAll);
router.post('/', basicAuth, bodyParser(), validateCats, createRecord);
router.get('/:id([0-9]{1,})', getById);
router.put('/:id([0-9]{1,})', basicAuth, bodyParser(), validateCats, updateRecord);
router.put('/:id([0-9]{1,})', bodyParser(), updateRecord);
router.delete('/:id([0-9]{1,})', basicAuth, deleteRecord);

export { router };
