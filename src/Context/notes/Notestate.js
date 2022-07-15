import Notecontext from "./Notecontext";
import { useState } from 'react'
import Notes from "../../Components/Notes";


const Notestate = (props) => {
  const host = "http://localhost:5000";

  const notesinitial = []
  const [notes, setNotes] = useState(notesinitial)



  //get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      }
    })

    const json = await response.json()
    setNotes(json)

  }
 

//Add note
const Addanote = async (title, description, tag) => {
 

  if (title, description, tag == "") {
    console.log("cant add values they are empty");
  } else {

    const response = await fetch(`${host}/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ Title: title, Description: description, Tag: tag })
    });

    const note = await response.json();
    console.log(note.error);
    setNotes(notes.concat(note))
  }

}

//Delete note
const Deletenote = async (id) => {
  const response = await fetch(`${host}/notes/deletenote/${id}`, {
    method: 'DELETE',
    headers: {
      'Content-type': 'application/json',
      'auth-token': localStorage.getItem('token')
    }
  });
  const deleteres = await response.json()
  console.log(deleteres);
  const newnotes = notes.filter((note) => { return note._id !== id })
  setNotes(newnotes)

}
 

//Edit note
const Editnote = async (id, title, description, tag) => {

  //fetching api
  const response = await fetch(`${host}/notes/updatenote/${id}`, {
    method: "PUT",
    headers: {
      'Content-type': 'application/json',
      'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE3MmI1N2E1MjI1M2NjNmE2NmJlYmE3In0sImlhdCI6MTYzNDkwNzUxNH0.C5h6afui_ZyuTNOrMRfehRdJi4MIfA10RV82xTXatpY'
    },
    body: JSON.stringify({ Title: title, Description: description, Tag: tag })
  })
  const json = response.JSON;


  let newNotes=JSON.parse(JSON.stringify(notes))
  //searching the note id
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if (element._id === id) {
      newNotes[index].Title = title;
      newNotes[index].Description = description;
      newNotes[index].Tag = tag;
      break;
    }
  }
  setNotes(newNotes);
  //searching the particular note


}

return (
  <Notecontext.Provider value={{ notes, Addanote, Deletenote, Editnote, getNotes }}>
    {props.children}
  </Notecontext.Provider>
)
}
export default Notestate