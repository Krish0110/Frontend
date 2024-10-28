/* eslint-disable linebreak-style */
import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import baseUrl from '../config';
import codeAllValue from '../utilis/codeAllValue';
import useLoader from '../hooks/useLoader';
import Loader from './Loader';

function VerificationForm({ length, onChangeCode }) {
  const [code, setCode] = useState(new Array(length).fill(''));
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');
  const inputsRef = useRef([]);

  const verifyCodeApiCall = async () => {
    const response = await fetch(`${baseUrl}api/verify-code`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ code: code.join('') }),
    });

    if (!response.ok) {
      throw new Error('Verification Error');
    }
    return response.json();
  };

  // using the custom hook
  const { isLoading, executeApiCall: handleVerification } = useLoader(verifyCodeApiCall);

  // eslint-disable-next-line max-len
  // A helper function that will update the code to avoid repetition of same code on handle functions
  const updateCode = (newCode, index) => {
    setCode(newCode);
    onChangeCode(newCode.join(''));

    if (index < (length - 1) && newCode[index]) {
      inputsRef.current[index + 1].focus();
    } else if (index > 0 && newCode[index] === '') {
      inputsRef.current[index - 1].focus();
    }
  };

  // A helper function to set the error message if any
  const setError = (error) => {
    setErrorMessage(error);
    // Reset the code to empty after an error
    setCode(new Array(length).fill(''));

    // Optionally, reset the input fields' values in the DOM
    // eslint-disable-next-line no-param-reassign
    inputsRef.current.forEach((input) => { input.value = ''; });
  };

  // function to handle the change that occurs in the each code box
  const handleChange = (e, index) => {
    const { value } = e.target;
    if (value.match(/[0-9]/)) {
      const newCode = [...code];
      newCode[index] = value;

      updateCode(newCode, index);
    }
  };

  // function that will delete the value when we click backspace
  const handleBackspace = (e, index) => {
    const newCode = [...code];
    newCode[index - 1] = '';

    updateCode(newCode, index);
  };

  // function that will handle the copy paste function
  const handlePaste = (e, index) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pasteValue = e.clipboardData.getData('text');

    if (/^[0-9]+$/.test(pasteValue)) {
      const newCode = [...code];
      const pastedDigits = pasteValue.split('');

      for (let i = 0; i < pastedDigits.length && index + i < length; i += 1) {
        newCode[index + i] = pastedDigits[i];
        inputsRef.current[index + i].value = pastedDigits[i];
      }

      updateCode(newCode, index);
      inputsRef.current[Math.min(index + pastedDigits.length, length - 1)].focus();
    }
  };

  // function to handle the code submmission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = codeAllValue(code);
    if (message !== '') {
      setError(message);
      return;
    }

    try {
      await handleVerification();
      navigate('/success');
    } catch (error) {
      setError('Verification Error');
    }
  };

  // returning the page
  return (
    <form className="verification-form" onSubmit={handleSubmit}>
      <h1>Verification Code</h1>
      <div className="inputs-container">
        {code.map((digit, index) => (
          <input
            // eslint-disable-next-line react/no-array-index-key
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            className="code-box"
            onChange={(e) => handleChange(e, index)}
            onPaste={(e) => handlePaste(e, index)}
            // eslint-disable-next-line no-return-assign
            ref={(e) => (inputsRef.current[index] = e)}
            onKeyDown={(e) => {
              if (e.key === 'Backspace') {
                handleBackspace(e, index);
              }
            }}
          />
        ))}
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <input type="submit" value="SUBMIT" className="btn" />
      {isLoading && <Loader />}
    </form>
  );
}

export default VerificationForm;
