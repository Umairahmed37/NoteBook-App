import "./CSS FILES/signup.css";
import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Signup = (props) => {

  const [signup, setSignup] = useState({Name:"", Email:"",Password:"", cPassword:""})
  
  let History = useHistory();

  const handlesubmit = async (e) => {
    e.preventDefault();
    const { Name, Email, Password } =  signup;
     const response = await fetch("http://localhost:5000/auth/createuser", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Name, Email, Password })
    });

    const json = await response.json();
    console.log(json);
     History.push("/")
     props.showAlert("Excellent, Account created","success" )
  }

  const onchange =(e)=>{
    setSignup({ ...signup, [e.target.name]:e.target.value})
   }

  



  return (
    <>
      <div className="signup-form container">
        <form className="form-horizontal" onSubmit={handlesubmit}>
          <div className="row">
            <div className="col-md-8 offset-4">
              <h2>Sign Up</h2>
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-md-4">UserName</label>
            <div className="col-8">
              <input type="text" className="form-control" id="Name" name="Name" value={ signup.Name} onChange={onchange} required="required" />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-md-4">Email Address</label>
            <div className="col-8">
              <input type="Email" className="form-control" id="Email" name="Email" value={ signup.Email} onChange={onchange} required="required" />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-md-4">Password</label>
            <div className="col-8">
              <input type="Password" className="form-control" id="Password"  name="Password" value={ signup.Password} onChange={onchange} required="required" />
            </div>
          </div>

          <div className="form-group row">
            <label className="col-form-label col-md-4">Confirm Password</label>
            <div className="col-8">
              <input type="Password" className="form-control" id="cPassword" name="cPassword" value={ signup.cPassword} onChange={onchange} required="required" />
            </div>
          </div>

          <div className="form-group row">
            <div className="col-md-8 offset-4">
              <p><label className="form-check-label">
                <input type="checkbox" required="required" /> I accept the <a  >Terms of Use</a> &amp;
                <a  >Privacy Policy</a>.</label></p>
              <button type="submit" className="btn btn-primary btn-lg">Sign Up</button>
            </div>
          </div>

        </form>
        <div className="text-center">Already have an account? <a>Login here</a></div>
      </div>
    </>
  )
}

export default Signup
