const nodemailer = require("nodemailer");
const config = require("../../config/config");


class SendMail{
    constructor(){
         this.transporter = nodemailer.createTransport({
            host: config.smtp_host,
            port: config.smtp_port,
            secure: true,
            auth: {
              user: config.nodeAppUser,
              pass: config.nodeAppPassword
            }
        });

    }
    async createTransporterAndSendMail(params){
        return new Promise(async (resolve, reject)=>{
            try{
                const info = await this.transporter.sendMail({
                    from: config.nodeAppUser, 
                    to: params?.to, 
                    subject: "Request Recieved", 
                    html:params?.htmlBody, 
                  });
                  if(info){
                    resolve({status : 'success',message:"Request Send",data:info})
                  }
               reject({status : 'error',message:"Failed to send Email",data:{}})
    
            }catch(err){
                console.log("er",err);
                reject({status : 'error',message:"Fialed", data:err})
            }

        })
    } 
}

module.exports = new SendMail()