const mongoose = require('mongoose');
const {Schema}= mongoose

const NotesSchema = new Schema({
  Adminuser:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  },
  Title:{
    type: String,
    required:true,
  },
  Description:{
    type: String,
    required:true,
    
  },
  Tag:{
    type: String,
    default: "General"

  },
  Date:{
    type:Date,
    default:Date.now
  }
});

const notes=mongoose.model("notes", NotesSchema)
module.exports= notes
 