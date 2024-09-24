'use client'
import { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { GET_POSTS_QUERY_ALL_LIST, GET_POSTS_QUERY_CATEGORY } from "../api/query";
import Navbar from "./Navbar";
import Post from "./Post";
import NavbarSkeleton from "../utilities/skeleton/NavbarSkeleton";
import { fetchGraphQLCatgoData, fetchGraphQLDa } from "../api/graphicql";
import Header from "./header";

function HomeComp({posData}) {
    const [postes,setPostes]=useState([])
    const [categories,setCategories]=useState([])
    const [catNo,setCatNo]=useState(null)
    const [loader,setLoader]=useState(true)
    const [catLoader,setCatLoader]=useState(true)
    const [offset,setOffset]=useState(0)
    const [scrollX, setscrollX] = useState(0);
    const searchParams = useSearchParams()
    let catgoId=searchParams.get("catgoId")
    

    const postData = async ()=>{
  
      let varPos
          if(catgoId==null){
            setLoader(true)
            varPos={ "limit": 10, "offset": offset ,"requireData":{"authorDetails":true,"categories": true},"categoryId":1}
            let postData= await fetchGraphQLDa(GET_POSTS_QUERY_ALL_LIST,varPos)
            handleLoad(postData)
            setLoader(false) 
          }else{
            setLoader(true)
            setCatNo(catgoId)
            varPos={ "limit": 10, "offset": offset,"requireData":{"authorDetails":true,"categories": true},"categoryId":catgoId}
            let postData=await fetchGraphQLDa(GET_POSTS_QUERY_ALL_LIST,varPos,) 
            handleLoad(postData)
            setLoader(false)
    
          }
        
    }

    const offsetData = async ()=>{
      if(offset!=0){
      let varPos
      if(catgoId==null){
        varPos={ "limit": 10, "offset": offset,"requireData":{"authorDetails":true,"categories": true},"categoryId":1}
        let PostData = await fetchGraphQLDa(GET_POSTS_QUERY_ALL_LIST,varPos,)
        handleLoad(PostData) 
        setLoader(false)
      }else{
        varPos={ "limit": 10, "offset": offset,"requireData":{"authorDetails":true,"categories": true},"categoryId":catgoId}
        let PostData = await fetchGraphQLDa(GET_POSTS_QUERY_ALL_LIST,varPos)
        handleLoad(PostData) 
        setLoader(false)
      }
    }
    }
    
    const categoryData = async ()=>{
      let variable_category={"limit": 10, "offset":0,"categoryGroupId":1}
    
        
        let catgeory = await fetchGraphQLCatgoData(GET_POSTS_QUERY_CATEGORY,variable_category)
        setCategories(catgeory)
        setCatLoader(false)
    }

  
    useEffect(()=>{
      postData()
      categoryData()
    },[catgoId])


    useEffect(()=>{
      offsetData()
    },[offset])

    useEffect(()=>{
      categoryData()
    },[])

  const handleLoad=(data)=>{
  let postesArr=postes.concat(data?.channelEntriesList?.channelEntriesList)
  
  setPostes(postesArr)
  }



    const handleScroll = (e) => {
  
      const scrollHeight = e.target.documentElement.scrollHeight;
      const currentHeight = Math.ceil(
        e.target.documentElement.scrollTop + window.innerHeight
      );
      if (currentHeight + 1 >= scrollHeight) {  
        setOffset(offset+10) 
      }
    };
  
    useEffect(() => {
      window.addEventListener("scroll", handleScroll);
    }, [handleScroll]);
  
    return (
  
  
  <>
        <Header catNo={catNo} setCatNo={setCatNo} setPostes={setPostes} setOffset={setOffset}/>
        <main className="container min-h-screen mx-auto max-w-screen-xl md:lg-0 px-4" >

        {catLoader==true?<div className="flex flex-nowrap flex-row gap-x-2 pb-4 my-10 justify-start  relative">

        <NavbarSkeleton/>
        </div>:
        
         <Navbar categories={categories} catNo={catNo} setCatNo={setCatNo}  setPostes={setPostes} setOffset={setOffset} searchParams={searchParams}  scrollX={scrollX} setscrollX={setscrollX} catgoId={catgoId}/>}
          {/* nav */}
  
          <Post postes={postes} loader={loader} catNo={catNo} setCatNo={setCatNo} setPostes={setPostes} setOffset={setOffset} scrollX={scrollX} />
          {/* post */}
  
  
      
        </main>
      </>
  
  
  
    );
}

export default HomeComp