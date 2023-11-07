var CryptoJS = require("crypto-js")

class Helper{
    constructor() {}
    async decryptBody (ctx,next){
        let params = ctx.request.body;
        if(params?.dycrpt == true){
            let param = JSON.parse(params?.body)
            let tokenId = Buffer.from(param.Token, "base64").toString('utf8');
            let data =  CryptoJS.AES.decrypt(param?.api_body,tokenId).toString(CryptoJS.enc.Utf8)
            data =JSON.parse(data)
            ctx.request.body = data
        }
        await next()
    }
}
module.exports =  new Helper()

 