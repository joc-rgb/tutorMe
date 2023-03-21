import React from 'react'
interface SuggestionItemProps{
    text:string;
    handleClick:(target:string)=>void
}
const SuggestionItem = (props:SuggestionItemProps) => {
  return (
    <li onClick={()=>props.handleClick(props.text)} >{props.text}</li>
  )
}

export default SuggestionItem