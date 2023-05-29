import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/users';
import request from 'supertest';

const app: Koa = new Koa();

const username = 'baby';
app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3001);

describe('Get / - Get  api endpoint', ()=> {
  test('Get all users with 200 code', async ()=>{
    const result = await request(app.callback()).get('/api/v1/users');
    expect(result.statusCode).toEqual(200);
  }),

  test('Get username with 200 code', async ()=>{
    const result = await request(app.callback()).get(`/api/v1/users/${username}`);
    expect(result.statusCode).toEqual(200);
  }),

  test('Get with 400 code', async ()=>{
    const result = await request(app.callback()).get(`'/api/v1/users/${username}'`);
    expect(result.statusCode).toEqual(400);
  }),

  test('Get 404 code', async ()=>{
    const result = await request(app.callback()).get('/api/v1');
    expect(result.statusCode).toEqual(404);
  })
})

describe('Post / - Post  api endpoint', ()=> {
  test('Post a user record with 400 code', async ()=>{
    const result = await request(app.callback()).post(`'/api/v1/users/${username}'`);
    expect(result.statusCode).toEqual(400);
  }),
  test('Post a user by username with 500 code', async ()=>{
    const result = await request(app.callback()).post('/api/v1/users');
    expect(result.statusCode).toEqual(500);
  })
})

describe('Put / - Put  api endpoint', ()=> { 
  test('Put a user record with 400 code', async ()=>{
    const result = await request(app.callback()).put(`'/api/v1/users/${username}'`);
    expect(result.statusCode).toEqual(400);
  }),
  test('Put a user record with 404 code', async ()=>{
    const result = await request(app.callback()).put('/api/v1');
    expect(result.statusCode).toEqual(404);
  }) 
})

describe('Delete / - Delete  api endpoint', ()=> {
  test('Delete a user record with 400 code', async ()=>{
    const result = await request(app.callback()).delete(`'/api/v1/users/${username}'`);
    expect(result.statusCode).toEqual(400);
  }),
  test('Delete a user record with 404 code', async ()=>{
    const result = await request(app.callback()).delete('/api/v1');
    expect(result.statusCode).toEqual(404);
  })
})