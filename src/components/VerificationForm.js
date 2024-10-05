import { useState,useRef } from "react"
import { useNavigate } from "react-router-dom";

const VerificationForm = ({length,onChangeCode}) => {
  const [code,setCode]=useState(new Array(length).fill(""));
  const navigate=useNavigate()
  const [errorMessage,setErrorMessage]=useState("")
  const inputsRef = useRef([]);

  const handleChange=(e,index)=>{
    const value=e.target.value
    if(value.match(/[0-9]/)){
      const newCode=[...code];
      newCode[index]=value

      setCode(newCode)
      onChangeCode(newCode.join(""))
    }

    if(index<(length-1) && value){
      inputsRef.current[index+1].focus()
    }
  }

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
    
  }

  const handleBackspace=(element,index)=>{
    const newCode=[...code]
    newCode[index]=""
    setCode(newCode)
    onChangeCode(newCode.join(""))

    if(index >0){
      inputsRef.current[index-1].focus()
    }
  }

  const handlePaste=(e)=>{
    const pasteValue=e.clipboardData.getData('text');
    if(pasteValue.length === length && /^[0-9]+$/.test(pasteValue)){
      const newCode = pasteValue.split('');
      setCode(newCode)
      onChangeCode(newCode.join(""))

      newCode.forEach((digit, index) => {
        inputsRef.current[index].value = digit;
      });

      inputsRef.current[length-1].focus();
    }
    e.preventDefault();
  }
  
  return (
    <form className='verification-form' onSubmit={handleSubmit}>
      <h1>Enter 6-digit Code</h1>
      <div className='inputs-container'>
        {code.map((digit,index)=>(
          <input
            key={index}
            type="text"
            maxLength="1"
            value={digit}
            className='code-box'
            onChange={(e)=>handleChange(e,index)}
            onPaste={index===0?handlePaste:null}
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