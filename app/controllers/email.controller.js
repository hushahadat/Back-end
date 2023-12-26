
const EmailService = require("../services/email.service.js");


class EmailController {
 constructor() {}


  async sendEmail(ctx) {
   let params = ctx.request.body;
   try {
     let response = await EmailService.sendEmail(params);
     if(response){
      ctx.body = response
     }
   } catch (err) {
     return (ctx.body = err);
   }
 }
 async getDaata(ctx) {
  let params = ctx.request.body;
  try {
    let response = await EmailService.getDaata(params);
    if(response){
     ctx.body = response
    }
  } catch (err) {
    return (ctx.body = err);
  }
}
}
module.exports = new EmailController();