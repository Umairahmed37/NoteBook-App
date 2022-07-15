const express = require('express');
const router = express.Router();
const fetchmyuser = require("../Middleware/fetchmyuser")
const Notes = require("../Models/Notes")
const { body, validationResult } = require('express-validator');


//ROUTE 1: Fetching all notes where address is "/notes/fetchallnotes".
router.get('/fetchallnotes', fetchmyuser, async function (req, res) {
  const gotnotes = await Notes.find({ user: req.user.id })
  res.json(gotnotes)

})

//ROUTE 2: Adding a User note "/notes/addnote".
router.post('/addnote', fetchmyuser, [
  body('Title', "Please Enter valid Title").isLength({ min: 5 }),
  body('Description', "Please provide min 5 characters").isLength({ min: 8 }),
], async function (req, res) {

  try {

    const { Title, Description, Tag } = req.body
    //if there is error while validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //if user already exist
    let ifexist = await Notes.findOne({ Title: req.body.Title })
    if (ifexist) {
      return res.status(500).json({ error: "Sorry note already exist" })
    }

    const note = new Notes({
      Title, Description, Tag, user: req.user.id
    })
    const savednote = await note.save()
    res.json(savednote)
  } catch (error) {
    console.error(error.message);
    res.status(500).send("There occured some issue!!")
  }

})

//ROUTE 3: Updating a note "/notes/updatenote/id".
router.put('/updatenote/:id', fetchmyuser, async (req, res) => {
  const { Title, Description, Tag } = req.body
  const newnote = {}
  try {
    if (Title) { newnote.Title = Title }
    if (Description) { newnote.Description = Description }
    if (Tag) { newnote.Tag = Tag }


    //find the note to be updated and update it 
    let note = await Notes.findById(req.params.id);

    if (!note) { return res.status(404).send("note not found") }

      // if (note.user.toString() !== req.user.id) {
      //   return res.status(401).send("Not Allowed")
      // }
    note = await Notes.findByIdAndUpdate(req.params.id, { $set: newnote }, { new: true })
    res.json({ note })
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error While Updating Note");
  }

})

//ROUTE 4: Deleting a note "/notes/deletenote/id".
router.delete('/deletenote/:id', fetchmyuser, async (req, res) => {
  try {
      let note=await Notes.findById(req.params.id)
      if(!note){return res.status(404).send("Not Found")}

       
      // if(note.id !== req.user.id ){
      //   return res.status(401).send("Not Allowed")
      // }
      note=await Notes.findByIdAndDelete(req.params.id)
      res.json({ "Success": "Note has been deleted", note: note });
  } catch (error) {
    console.error(error.message);
     
  }
})

module.exports = router


