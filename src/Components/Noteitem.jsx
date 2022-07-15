import React, { useContext } from 'react'
import Notecontext from '../Context/notes/Notecontext'


const Noteitem = (props) => {

  const context = useContext(Notecontext)
  const { Deletenote } = context;

  let { note,update } = props


  return (
    <div className="d-flex mt-3">
      <>
        <div className="card" style={{ "width": '20rem' }}>
          <div className="card-body">
            <h5 className="card-title">{note.Title}</h5>
            <p className="card-text">{note.Description}</p>
            <a className="text-decoration-none"> {note.Tag}</a>
            <br />
            <div className="mt-3">

              <button onClick={()=>update(note)} className="ml-3 btn btn-sm btn-success "><i className="fas fa-edit px-2 "> </i>Edit</button>

              <button onClick={() => { Deletenote(note._id) }} className="mx-3 btn btn-danger btn-sm"><i className="fas fa-trash-alt px-2"></i> Delete Note</button>

            </div>
          </div>
        </div>
      </>
    </div>
  )
}

export default Noteitem
