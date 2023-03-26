import React from 'react'
interface SuggestedTagProps{
    text:string;
    handleClick:(target:string)=>void
}
const SuggestedTag = (props:SuggestedTagProps) => {
  return (
    <li onClick={()=>props.handleClick(props.text)} >{props.text}</li>
  )
}

export default SuggestedTag