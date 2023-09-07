
const koa = require("koa");
const config = require("../../config/config");
const Routes = require("../router");
const cors = require('@koa/cors');
const serve = require('koa-static');

class Server {
  constructor() {
    this.port = config.port;
    this.app = new koa();
    this.routes = Routes;
  }

  async start() {
    this._attachHeaders();
    this._setupRoutes();
    this._listen(this.app);
    this._startScheduler();
  }

  _attachHeaders() {

    this.app.use(cors())
       this.app.use(async (ctx, next) => {
           await next();
       })


       this.app.use(serve(process.cwd()))
       this.app.use(async (ctx, next) => {
           ctx.set('Access-Control-Allow-Origin','https://resume-hussain.onrender.com.'||'http://localhost:3000' ||'https://hussain.co.in'|| 'https://www.hussain.co.in'|| '*');
           ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-parse-key, x-parse-id');
           ctx.set('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
           await next();
       });


   }

  _startScheduler() {
  }

  _setupRoutes() {
    this.routes.create(this.app);
  }

  _listen(app) {
    app.listen(this.port, () => {
      console.log("App is working in", config.environment, "environment");
      console.log(`App is running on port ${this.port}`);
    });
  }
}

module.exports = new Server();
