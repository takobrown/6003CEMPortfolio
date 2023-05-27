import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/cats';
import request from 'supertest';

const app: Koa = new Koa();
const getID = 6;
const putID = 1;
const deleteID = 1;
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);

describe('Get / - Get api endpoint', ()=> {
  test.concurrent('Get all cats records with 200 code', async ()=>{
    const result = await request(app.callback()).get('/api/v1/cats');
    expect(result.statusCode).toEqual(200);
  }),
  test('Get a cat record with id with 200 code', async ()=>{
    const result = await request(app.callback()).get(`/api/v1/cats/${getID}`);
    expect(result.statusCode).toEqual(200);
  }),
  test('Get 404 code', async ()=>{
    const result = await request(app.callback()).get('/api/v1');
    expect(result.statusCode).toEqual(404);
  })
})

describe('Post / - Post api endpoint', ()=> {
  test('Post a cat record with 400 code', async ()=>{
    const result = await request(app.callback()).post(`'/api/v1/cats'`);
    expect(result.statusCode).toEqual(400);
  }),
  test('Post a cat record with 401 code', async ()=>{
    const result = await request(app.callback()).post('/api/v1/cats');
    expect(result.statusCode).toEqual(401);
  }),
  test('Post a cat record with 404 code', async ()=>{
    const result = await request(app.callback()).post('/api/v1');
    expect(result.statusCode).toEqual(404);
  })  
})

describe('Put / - Put api endpoint', ()=> { 
  test('Put a cat record with 400 code', async ()=>{
    const result = await request(app.callback()).put(`'/api/v1/cats/${putID}'`);
    expect(result.statusCode).toEqual(400);
  })
  test('Put a cat record with 404 code', async ()=>{
    const result = await request(app.callback()).put('/api/v1');
    expect(result.statusCode).toEqual(404);
  })
})

describe('Delete / - Delete api endpoint', ()=> {
  test('Delete a cat record with 400 code', async ()=>{
    const result = await request(app.callback()).delete(`'/api/v1/cats/${deleteID}'`);
    expect(result.statusCode).toEqual(400);
  })
  test('Delete a cat record with 404 code', async ()=>{
    const result = await request(app.callback()).delete('/api/v1');
    expect(result.statusCode).toEqual(404);
  })
})