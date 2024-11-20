require('dotenv').config();
const mongoose=require('mongoose')
const dbUri=process.env.MONGO_URI
module.exports=()=>{
  return mongoose.connect(dbUri);

}