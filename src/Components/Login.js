import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'

const Login = (props) => {

  const [credencials, setCredencials] = useState({ Email: "", Password: "" })
  let History=useHistory();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Email: credencials.Email, Password: credencials.Password })
    });
    const json = await response.json();
    console.log(json);
    localStorage.setItem('token', json.authToken)
    History.push("/")
    props.showAlert("Logged in Successfully", "success")
    }

  const onchange = (e) => {
    setCredencials({ ...credencials, [e.target.name]: e.target.value })
  }

  return (
    <div className="container">
      <h2 className="mt-3 text-center">Login In</h2>
      <form className="container mt-4" onSubmit={handlesubmit}>

        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">Email address</label>
          <input type="Email" className="form-control" value={credencials.Email} onChange={onchange} id="Email" name="Email" aria-describedby="EmailHelp" />
          <div id="EmailHelp" className="form-text">We'll never share your Email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">Password</label>
          <input type="Password" onChange={onchange} value={credencials.Password} className="form-control" id="Password" name="Password" />
          <div id="passhelp" className="form-text">Enter at least 8 characters use alphabets, numbers and symbols</div>

        </div>

        <button type="submit" className="btn btn-outline-success">Submit</button>
      </form>
    </div>
  )
}

export default Login
