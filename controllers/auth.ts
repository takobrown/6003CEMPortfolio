import passport from "koa-passport";
import { BasicStrategy } from "passport-http";
import { RouterContext } from "koa-router";

import * as users from '../models/users';

/*const verifyPassowrd = (user: any, password: string) => {
  return user.password === password;
}*/

passport.use(new BasicStrategy(async (username, password, done) => {
  if (username === "admin" && password === "password") {
    done(null, { username: "admin" });
  } else {
    done(null, false);
  }
}));

export const basicAuth = async (ctx: RouterContext, next: any) => {
  await passport.authenticate("basic", { session: false })(ctx, next);
  if (ctx.status == 401) {
    ctx.body = {
      message: 'Unauthorized to access!'
    };
  } else {
    ctx.body = {
      message: "Login Success"
    }
  }
}