const CoinService = require("../services/coin.service");

class CoinController {
  constructor() {}

  async getAllCoin(ctx) {
    let headers = ctx.request.headers["x-cmc_pro_api_key"];
    try {
      if (headers == "9234M-8709C-8298S-9709T") {
        let response = await CoinService.getAllCoin();
        if (response) {
          ctx.body = response;
        }
      } else {
        ctx.body = {};
      }
    } catch (err) {
      return (ctx.body = err);
    }
  }
  async getIndividualCoin(ctx) {
    let params = ctx.request.body;
    let headers = ctx.request.headers["x-cmc_pro_api_key"];
    try {
      if (headers == "9234M-8709C-8298S-9709T") {
        let response = await CoinService.getIndividualCoin(params);
        // console.log("ress",response);
        if (response) {
          ctx.body = response;
        }
      } else {
        ctx.body = {};
      }
    } catch (err) {
      return (ctx.body = err);
    }
  }

  async getCoin(ctx) {
    let params = ctx.request.body;
    let headers = ctx.request.headers["x-cmc_pro_api_key"];
    try {
      if (headers == "9234M-8709C-8298S-9709T") {
        let response = await CoinService.getCoin(params);
        // console.log("ress",response);
        if (response) {
          ctx.body = response;
        }
      } else {
        ctx.body = {};
      }
    } catch (err) {
      return (ctx.body = err);
    }
  }
}

module.exports = new CoinController();
