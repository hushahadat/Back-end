
const apiRoutes = require("./api");
const KoaRouter = require("koa-router");
const json = require("koa-json");
const bodyParser = require("koa-bodyparser");
const helmet = require("koa-helmet");
const compose = require("koa-compose"); // to compose and customise calls explicitly
const mount = require("koa-mount");
const Koa = require("koa");
class Routes {
  constructor() {
    this.apiRoutes = apiRoutes;
  }

  create(app) {
    
    this.app = app;
    this.router = new KoaRouter();
    this._attachMiddleware(app);
    this._attachAPIRoutes(this.router);
  }

  _attachMiddleware(app) {
    this.app.use(json());
    this.app.use(bodyParser({ jsonLimit: "20mb" }));
    this.app.use(helmet.xssFilter());
    app.use(this.router.routes()).use(this.router.allowedMethods());
    app.use(
      helmet.contentSecurityPolicy({
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          styleSrc: ["'self'", "'unsafe-inline'"],
        },
      })
    );
  }
  _attachAPIRoutes() {
    this._attachRoutes(this.apiRoutes, "/api");
  }

  _attachRoutes(routeGroups, prefix = ""){
    let parentApp = new Koa()
    routeGroups.forEach(({ group, routes }) => {
      let { prefix, groupMiddleware } = group
 
 
      let groupApp = new Koa()
      let groupAppRouter = new KoaRouter()
 
 
      routes.forEach(({ method, path, middleware, handler }) => {
        let middlewares = []
 
 
        // when passed as an array of function
        if (Array.isArray(middleware)) middlewares = [...middleware]
 
 
        // when passed as a single function
        if (typeof middleware === 'function') middlewares.push(middleware)
 
 
        // adding middleware to routes
        groupAppRouter[method](path, compose([...middlewares, handler]))
      })
 
 
      let groupMiddlewares = []
 
 
      // when passed as an array of function
      if (Array.isArray(groupMiddleware)) groupMiddlewares = [...groupMiddleware]
 
 
      // when passed as a single function
      if (typeof groupMiddleware === 'function') groupMiddlewares.push(groupMiddleware)
      groupApp.use(compose(groupMiddlewares))
      groupApp.use(groupAppRouter.routes())
 
 
      parentApp.use(mount(prefix, groupApp))
    })
 
 
    this.app.use(mount(prefix, parentApp))
  }
 
 

  _handleRouteError(route) {
    console.log("route",route);
    return async (ctx, next) => {
      if (typeof route == "function") route(ctx).catch(next);
      else await next();
    };
  }
}

module.exports = new Routes();
