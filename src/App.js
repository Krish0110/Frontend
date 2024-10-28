import { useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import VerificationForm from './components/VerificationForm';
import Success from './pages/Success';
// eslint-disable-next-line import/no-named-as-default
import Verification from './pages/Verification';

function App() {
  // eslint-disable-next-line no-unused-vars
  const [code, setCode] = useState('');
  const onChangeCode = (newCode) => {
    setCode(newCode);
    // eslint-disable-next-line no-console
    console.log(newCode);
  };
  return (
    <Router>
      <Routes>
        <Route
          exact
          path="/"
          element={<VerificationForm length={6} onChangeCode={onChangeCode} />}
        />
        <Route
          path="/success"
          element={<Success />}
        />
        <Route
          path="/verify"
          element={<Verification />}
        />

      </Routes>
    </Router>
  );
}

export default App;
