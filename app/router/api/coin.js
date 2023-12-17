const coin = require('../../controllers/coin.controller')
const helper = require('../../helper/helper')


module.exports = {
    group: {
      prefix: "/coin",
    },
    routes: [
      {
        method: "post",
        path: "/getAllCoin",
        // middleware :helper.decryptBody,
        handler: coin.getAllCoin,
      },
      {
        method: "post",
        path: "/getIndividualCoin",
        // middleware :helper.decryptBody,
        handler: coin.getIndividualCoin,
      },
      {
        method: "post",
        path: "/getCoin",
        // middleware :helper.decryptBody,
        handler: coin.getCoin,
      }
    ]
   }