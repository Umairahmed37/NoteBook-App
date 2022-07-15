import './App.css';
import { About } from './Components/About';
import { Home } from './Components/Home';
import './Components/Style.css'
import { useState } from 'react';
import { Navbar } from './Components/Navbar';
import Alert from './Components/Alert';
import Notestate from './Context/notes/Notestate';
 
import {
  BrowserRouter as Router,
  Switch,
  Route,

} from "react-router-dom";
import Login from './Components/Login';
import Signup from './Components/Signup';

function App() {

  const [alert, setAlert] = useState(null);
  const showAlert=(message, type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <>
      <Notestate>

        <Router>
          <Navbar />
           <Alert alert={alert}/>
          <Switch>
          <Route exact path="/">
          <Home showAlert={showAlert}/>
          </Route>

          <Route exact path="/About">
          <About />
          </Route>

          <Route exact path="/Login">
          <Login showAlert={showAlert}/>
          </Route>

          <Route exact path="/Signup">
          <Signup showAlert={showAlert}/>
          </Route>

          </Switch>
        </Router>

      </Notestate>
    </>
  );
}

export default App;
