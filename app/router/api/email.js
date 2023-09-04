

const email = require("../../controllers/email.controller");



module.exports = {
 group: {
   prefix: "/email",
 },
 routes: [
   {
     method: "post",
     path: "/sendEmail",
     handler: email.sendEmail,
   }
 ]
}