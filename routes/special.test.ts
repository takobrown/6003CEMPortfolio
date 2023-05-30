import Koa from "koa";
import json from "koa-json";
import passport from 'koa-passport';
import { router } from '../routes/special';
import request from 'supertest';

const app: Koa = new Koa();

app.use(json());
app.use(passport.initialize());
app.use(router.middleware());
app.listen(3000);

describe('Get / - Private route requires authentication', ()=> {
  test('private route with 401 status', async ()=>{
    const result = await request(app.callback()).get('/api/v1/private')
    expect(result.statusCode).toEqual(401);
  }),
  test('private route with 404 status', async ()=>{
    const result = await request(app.callback()).get('/api')
    expect(result.statusCode).toEqual(404);
  }),
  test('private route with 400 status', async ()=>{
    const result = await request(app.callback()).get(`'/api/v1/private'`)
    expect(result.statusCode).toEqual(400);
  })
})