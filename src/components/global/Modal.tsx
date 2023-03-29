import React, { Dispatch, MouseEventHandler, SetStateAction } from 'react'
import Button, { Variant } from './Button'
import {AiOutlineInfoCircle} from 'react-icons/ai'

interface IModal{
  handleAction:()=>void,
  setModal:Dispatch<SetStateAction<boolean>>
}
const Modal = (props:IModal) => {
  return (
    <div className='fixed inset-0 bg-gray-600 bg-opacity-50 z-20 overflow-y-auto h-full w-full items-center flex justify-center'>
      <div className="flex flex-col rounded shadow-lg items-center justify-center self-center bg-white p-4  z-50 md:w-80 gap-5">
        <p className='font-bold text-7xl'><AiOutlineInfoCircle /></p>
        <p className="font-normal">Are you sure?</p>
        <Button variants={Variant.outline} onClick={props.handleAction}>Yes, I&apos;m sure</Button>
        <Button className='text-gray-700 underline' onClick={e=>props.setModal(false)}>No, cancel</Button>
      </div>
    </div>
  )
}

export default Modal