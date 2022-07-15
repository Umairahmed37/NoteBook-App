import React, { useContext, useState } from 'react'
import Notecontext from '../Context/notes/Notecontext'

export default function Addnote() {

  
  
  const context = useContext(Notecontext)
  const { Addanote } = context;
  
  const [myvalues, setMyvalues] = useState({title:"",description:"", tag:""})
  const [note, setNote] = useState({ title: "", description: "", tag: "" })

  const handleclick = (e) => {
    e.preventDefault();
    Addanote(note.title, note.description, note.tag)
    setNote({ title: "", description: "", tag: "" });
     setMyvalues({title:"", description:"", tag:""})
    
  }
  
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
    setMyvalues({[e.target.name]: e.target.value})
  }
  return (
    <>
      <div className="container px-5 my-3">
        <h3>Add a Personal Note</h3>
        <form  >
          <div className="mb-3">
            <label htmlFor="title" className="form-label">Enter the Title </label>
            <input type="text"  className="form-control" id="title" value={myvalues.title} name="title" aria-describedby="title" onChange={onchange} />

          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">Enter Description</label>
            <input type="text" className="form-control" value={myvalues.description} id="description" name="description" onChange={onchange} />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">Enter a related Tag</label>
            <input type="text" className="form-control" value={myvalues.tag} name="tag" id="tag" onChange={onchange} />
          </div>

          <button type="submit" className="btn btn-primary" onClick={handleclick}>Add note</button>
        </form>
      </div>
    </>
  )
}
