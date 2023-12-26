

const email = require("../../controllers/email.controller");
const helper = require('../../helper/helper')



module.exports = {
 group: {
   prefix: "/email",
 },
 routes: [
   {
     method: "post",
     path: "/sendEmail",
     middleware :helper.decryptBody,
     handler: email.sendEmail,
   },
   {
    method: "post",
    path: "/getDaata",
    // middleware :helper.decryptBody,
    handler: email.getDaata,
  }
 ]
}