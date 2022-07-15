
const mongoose=require('mongoose')
const mongoURI="mongodb://localhost:27017/iNoteBook?readPreference=primary&appname=MongoDB%20Compass&ssl=false"

const connectmongo=()=>{
  mongoose.connect(mongoURI,()=>{
    console.log("Mongo connected successfully");
  })
}
 
module.exports=connectmongo