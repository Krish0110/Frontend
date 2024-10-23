import { useState,useRef } from "react"
import { useNavigate } from "react-router-dom";

const VerificationForm = ({length,onChangeCode}) => {
  const [code,setCode]=useState(new Array(length).fill(""));
  const navigate=useNavigate()
  const [errorMessage,setErrorMessage]=useState("")
  const inputsRef = useRef([]);


  //A helper function that will update the code to avoid repetition of same code on handle functions
  const updateCode=(newcode,index)=>{
    setCode(newCode)
    onChangeCode(newCode.join(""))

    if(index<(length-1) && newcode[index]){
      inputsRef.current[index+1].focus()
    }else if(index >0 && newCode[index] === ""){
      inputsRef.current[index-1].focus()
    }

  }
  //function to handle the change that occurs in the each code box
  const handleChange=(e,index)=>{
    const value=e.target.value
    if(value.match(/[0-9]/)){
      const newCode=[...code];
      newCode[index]=value

      updateCode(newCode,index)
    }
  }

  //function that will delete the value when we click backspace
  const handleBackspace=(e,index)=>{
    const newCode=[...code]
    newCode[index]=""

    updateCode(newcode,index)
  }

  //function that will handle the copy paste function
  const handlePaste = (e, index) => {
    e.preventDefault();  // Prevent the default paste behavior
    const pasteValue = e.clipboardData.getData('text');
    
    if (/^[0-9]+$/.test(pasteValue)) {
      const newCode = [...code];  
      const pastedDigits = pasteValue.split('');

      for (let i = 0; i < pastedDigits.length && index + i < length; i++) {
        newCode[index + i] = pastedDigits[i]; 
        inputsRef.current[index + i].value = pastedDigits[i]; 
      }

      updateCode(newCode,index)
      // inputsRef.current[Math.min(index + pastedDigits.length, length - 1)].focus();
    }
  };
  

  //function to handle the code submmission
  const handleSubmit=async (e)=>{
    e.preventDefault()
    if (code.some(val=>val==="")){
      setErrorMessage("All Fields are Requires")
      return
    }

    try{
      const response=await fetch(`${process.env.REACT_APP_API_URL}api/verify-code`,{
        method:'POST',
        headers:{
          'Content-Type':"application/json",
        },
        body:JSON.stringify({code:code.join("")}),
      })

      if(!response.ok){
        throw new Error('Verification Error')
      }
      else{
        navigate('/success')
      }
    }catch(error){
      setErrorMessage("Verification Error")
    }

    // Reset the code to empty after an error
    setCode(new Array(length).fill(""));

    // Optionally, reset the input fields' values in the DOM
    inputsRef.current.forEach((input) => (input.value = ""));
    
  }
  
  //returning the page
  return (
    <form className='verification-form' onSubmit={handleSubmit}>
      <h1>Verification Code</h1>
      <div className='inputs-container'>
        {code.map((digit,index)=>(
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            className='code-box'
            onChange={(e)=>handleChange(e,index)}
            onPaste={(e)=>handlePaste(e,index)}
            ref={(element)=>(inputsRef.current[index]=element)}
            onKeyDown={e=>{
              if(e.key==='Backspace'){
                handleBackspace(e,index)
              }
            }}
          />
        ))}
      </div>
      {errorMessage && <p className='error'>{errorMessage}</p>}
      <input type='submit' value='SUBMIT' className='btn'/>
    </form>
  )
}

export default VerificationForm