import React, { } from 'react'
import Notes from './Notes';

export const Home = (props) => {
  const {showAlert}=props
  return (

    <div className="container px-5 my-3">
      <h3 className="my-3 text-center">Your Notes</h3>
      <Notes showAlert={showAlert}/>
    </div>
  )
}
