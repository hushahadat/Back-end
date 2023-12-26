const dotEnv = require('dotenv')
dotEnv.config()

module.exports = {
    nodeAppUser  : process.env.NODE_APP_USER,
    nodeAppPassword : process.env.NODE_APP_PASSWORD,
    port : process.env.NODE_APP_PORT,
    environment : process.env.ENVIRONMENT,
    smtp_host : process.env.SMTP_HOST,
    smtp_port : process.env.SMTP_PORT,
    personalMail : process.env.PERSONALMAIL,
    name : process.env.NAME,
    db : process.env.DB
}