const config = require("../../config/config");

let  DB
(async function (){
    try{
        
        const { MongoClient ,ServerApiVersion } = require('mongodb')
        const url = config?.db
        const client = new MongoClient(url,{
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }});
         client.connect();
        DB = client.db("user_collection");
        console.log("Db connected");
    }
    catch(er){
        console.log("errrr",er)
    }
})()
class MongoDb{
    constructor(collection_name){
        this.collection_name = collection_name
    }
    async find(params){
        try{
            let col =  DB.collection(this.collection_name)
            let query = {...params}
            let record = await col.find(query).toArray()
            return record
        }catch(er){
            console.log("er",er)
        }
    }


}

module.exports =  MongoDb;