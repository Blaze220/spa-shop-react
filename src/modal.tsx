import  { FC, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import "./css/module.css"

interface ModuleProps{
   
    children?: ReactNode,
    isModule: React.Dispatch<React.SetStateAction<boolean>>
}


const Module:FC<ModuleProps>=({children,isModule})=> {
  
    
  return (
    <div className="module" onClick={(e)=>{
        e.stopPropagation()
        isModule(false)
        }}>
          <div className="module-block" onClick={e=>e.stopPropagation()}>
              {children}
          </div>
         
      </div>
  )
 
}


export default Module