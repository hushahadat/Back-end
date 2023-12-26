const SendMail = require('../helper/sendMail')
const template = require('../templateBody/template')
const config = require("../../config/config")
const MongoDb = require('../helper/mongoDb.js')

class EmailService{
    constructor(){
        this.account_collection = new MongoDb('account_collection');
    }
    async sendEmail(params){
        return new Promise(async (resolve, reject)=>{
            try{
                if(params){
                    let personalMail = {
                        to : config?.personalMail,
                        name : config?.name,
                        userMessage : params?.message,
                        userEmail : params?.email,
                        userName : params?.name  
                    }
                    let temp = eval("`"+template?.personalTemplate+ "`")
                    personalMail['htmlBody'] = temp
                   let res =  await SendMail.createTransporterAndSendMail(personalMail)
                   if(res?.status == 'success'){
                    let userMail ={
                        to : params?.email,
                        name : params?.name,
                    }
                     temp = eval("`"+template?.userTemplate+ "`")
                    userMail['htmlBody'] = temp
                   let ress = await SendMail.createTransporterAndSendMail(userMail)
                   if(ress?.status == 'success'){
                    resolve({status : 'success',message:" Request send",data:ress})
                    }
                   }
                   
                }
                reject({status : 'error',message:"Params is not present",data:""})
            }catch(err){
                console.log("err",err);
                reject({status : 'error',message:"Failed in try catch",data:err})
            }

        })
    }

    async getDaata(params){
        try{
            let data = await  this.account_collection.find(params)
            return data

        }catch(er){
            console.log("err",er)
        }
    }
}
module.exports = new EmailService()