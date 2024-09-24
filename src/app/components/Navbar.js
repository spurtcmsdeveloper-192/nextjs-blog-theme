'use client'
import React, { useEffect } from 'react'
import { useState, useRef } from "react";
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';

function Navbar({categories,catNo,setCatNo,setPostes,setOffset,scrollX,setscrollX,catgoId}) {


  console.log(categories,'categories');
    const router=useRouter()
    const searchParams = useSearchParams()
    let scrl = useRef(null);
    const [scrolEnd, setscrolEnd] = useState(true);
    let scroll=searchParams.get("scroll")




const slide = (shift) => {
  scrl.current.scrollLeft += shift;

  setscrollX(scrollX + shift);

  if (
    Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
    scrl.current.offsetWidth
  ) {
    setscrolEnd(true);
  } else {
    setscrolEnd(false);
  }
};
const scrollCheck = () => {
  setscrollX(scrl.current.scrollLeft);
  if (
    Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
    scrl.current.offsetWidth
  ) {
    setscrolEnd(true);
  } else {
    setscrolEnd(false);
  }
};
useEffect(()=>{
 if(scroll !=null){
  if(scrl.current){
    scrl.current.scrollLeft = scroll;
  }
 }
},[scroll,scrl])
useEffect(()=>{
    if(scrl.current){
        if (
            Math.floor(scrl.current.scrollWidth - scrl.current.scrollLeft) <=
            scrl.current.offsetWidth
          ) {
            setscrolEnd(true);
          } else {
          
            setscrolEnd(false);
          }
    }
},[scrl])


    const handleCatList=(id)=>{
      setCatNo(id)
      setPostes([])
      setOffset(0)
      catgoId=id?.toString()
      if(id==null){
      router.push(`/`)
    }else{
      router.push(`/?catgoId=${id}&scroll=${scrollX}`)
    }
    }
    

  return (
    <div className="flex flex-nowrap flex-row gap-x-2 pb-4 my-10 justify-start  relative">


{scrollX !== 0 && (
        <button
          onClick={() => slide(-50)}
          class="w-2 h-2 absolute top-[0.625rem] left-[-1.438rem]"
        >
          <Image src="/img/arrow-left-colour.svg" alt="arrow-left" width={15}
                  height={15}
                  priority />
        </button>
     )} 

   
        {categories?.categoriesList?.categories&&<>
        <ul ref={scrl} onScroll={scrollCheck} className='flex flex-nowrap flex-row gap-x-2 justify-start items-center overflow-scroll scrollbar-style'>
            <li onClick={()=>handleCatList(null)} style={{pointerEvents:catNo==null?"none":""}} className={`whitespace-nowrap px-6 py-2 rounded-3xl border font-base  leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${catgoId==null?'border-cyan-500 text-primary':'border-gray-200 text-gray-600'}`}> All</li>
          {categories?.categoriesList?.categories?.map((data,index)=>(
                <li key={index} onClick={()=>handleCatList(data.id)} style={{pointerEvents:data.id==catNo?"none":""}} className={`whitespace-nowrap px-6 py-2 rounded-3xl border font-base  leading-4 hover:text-white hover:bg-gray-500 hover:border-gray-500 cursor-pointer ${catgoId==data.id?'border-cyan-500 text-primary':'border-gray-200 text-gray-600'}`}> {data.categoryName} </li>
          
   ))}
  </ul>
  </>

 }
  
  {!scrolEnd && (<>
 
        <button
          onClick={() => slide(+50)}
          class="w-2 h-2 absolute top-[0.625rem] right-[-1.438rem]"
        >
         <Image src="/img/arrow-right-colour.svg" alt="arrow-right" width={15}
                  height={15}
                  priority />
        </button>
        </> )}
        </div>
  )
}

export default Navbar