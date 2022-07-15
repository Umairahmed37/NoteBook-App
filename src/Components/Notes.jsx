import React, { useContext, useEffect, useRef,useState } from 'react'
import { useHistory } from 'react-router';
import Notecontext from '../Context/notes/Notecontext'
import Addnote from './Addnote';
import Noteitem from './Noteitem';

const Notes = () => {
  const History=useHistory()
  const context = useContext(Notecontext)
  const { notes, Editnote, getNotes } = context;
  const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "" })
 

  useEffect(() => {
    if(localStorage.getItem('token')){
      getNotes()
    }
    else{
      History.push("/login")
    }
    // eslint-disable-next-line
  }, [])

  const update = (currentNote) => {
    ref.current.click();
     setNote({id:currentNote._id, etitle:currentNote.Title, edescription:currentNote.Description, etag:currentNote.Tag })
  }

  const ref = useRef(null)

  const handleclick = (e) => {
    
     Editnote(note.id, note.etitle,note.edescription,  note.etag)
  }
  
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
   }

  return (
    <>
      <Addnote />

      <button type="button" hidden ref={ref} className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form  >
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Enter the Title </label>
                  <input type="text" className="form-control" id="etitle" value={note.etitle} onChange={onchange}  name="etitle" aria-describedby="title"  />

                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Enter Description</label>
                  <input type="text" className="form-control"  id="edescription" value={note.edescription} name="edescription" onChange={onchange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Enter a related Tag</label>
                  <input type="text" className="form-control"  name="etag" value={note.etag} id="etag" onChange={onchange} />
                </div>

               </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal" onClick={handleclick}>Update Note</button>
            </div>
          </div>
        </div>
      </div>


      <div className="d-flex flex-wrap justify-content-around   ">

        <div className="container text-center">
          {
            notes.length===0 && "No Notes to display"
          }

        </div>
        {
          notes.map((note) => {
            return (
              <Noteitem key={note._id} update={update} note={note} />
            )
          })
        }
      </div>
    </>
  )
}

export default Notes
