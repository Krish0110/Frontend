import { useState } from "react";
import VerificationForm from "./components/VerificationForm";
import Success from "./components/Success";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  const[code,setCode]=useState("")
  const onChangeCode=(newCode)=>{
    setCode(newCode)
    console.log(newCode)
  }
  return (
    <Router>
    <Routes>
        <Route
            exact
            path="/"
            element={<VerificationForm length={6} onChangeCode={onChangeCode} /> }
        />
        <Route
            path="/success"
            element={<Success />}
        />

    </Routes>
  </Router>
  );
}

export default App;
