'use client'
import Image from "next/image";
import { useEffect, useState } from "react";
import moment from "moment";
import { fetchGraphQLDa, fetchGraphQl } from "@/app/api/graphicql";
import { GET_POSTS_QUERY_SINGLE } from "@/app/api/query";
import DetailPageSkeleton from "@/app/utilities/skeleton/DetailPageSkeleton";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { imgaeUrl } from "../utilities/ImagePath";
import Header from "./header";

function PostSingleData({postSingle,params}) {

    const {slug}=params
    const searchParams = useSearchParams()
    const [postesSingle,setPostesSingle]=useState(postSingle)
    const [loader,setLoader]=useState(true)
    const [catNo,setCatNo]=useState()
    const [postes,setPostes]=useState()
    const [offset,setOffset]=useState()
    
    let cateId=searchParams.get("catgoId")
    let scrollX=searchParams.get("scroll")
    
  
    const loadmore = async () =>{
      if(postSingle){
        setLoader(false)
      }
      
    }
    
    const reload = async ()=>{
      let varSingle={ "slug":slug }
      let postSingle = await fetchGraphQLDa(GET_POSTS_QUERY_SINGLE,varSingle)
      setPostesSingle(postSingle)
      setLoader(false)
    }
  
    useEffect(()=>{
      loadmore()
      reload()
    },[])
  
  
    const imageLoader = ({src}) => {
      return src
    }
  return (<>
  <Header catNo={catNo} setCatNo={setCatNo} setPostes={setPostes} setOffset={setOffset}/>
    {loader==true?<>
    
        <DetailPageSkeleton/>
        </>:
    <div className="container min-h-screen mx-auto max-w-screen-xl md:lg-0 px-4">

        <div className="my-10">
          

          <div className="flex justify-start flex-wrap items-center gap-x-4">
          <Link href={cateId==null?"/":`/?catgoId=${cateId}&scroll=${scrollX}`} ><img src="/img/back.svg" className="text-white"/></Link>
            <p className="text-base text-tag-color">{moment(postesSingle?.channelEntryDetail?.createdOn).format("MMMM DD, YYYY")}</p>
            <p className="text-base text-tag-color">{postesSingle?.channelEntryDetail?.readingTime} min read</p>
            <p className="text-base text-tag-color">views {postesSingle?.channelEntryDetail?.viewCount}</p>
            <a className="text-base text-primary">{postesSingle?.channelEntryDetail?.authorDetails?.FirstName}{" "}{postesSingle?.channelEntryDetail?.authorDetails?.LastName}</a>
           { postesSingle?.channelEntryDetail?.categories.length!=0&&postesSingle?.channelEntryDetail?.categories.map((data,ind)=>(
            <div className="px-2 py-1 text-base text-secondary bg-secondary rounded-md">{postesSingle?.channelEntryDetail?.categories[ind].at(-1).categoryName}</div>))}
          </div>
          <div className="pl-8">
          <h1 className="sm:text-4xl text-3xl text-dark font-medium my-5">{postesSingle?.channelEntryDetail?.title}</h1>              
          
          <div className="block my-5">
              <Image
                loader={imageLoader}
                src={`${imgaeUrl}${postesSingle?.channelEntryDetail?.coverImage}`}
                alt="spurtCMS card image"
                width={10000}
                height={10000}
                priority
                className="he-image"
              />
          </div>  
          <p className="text-base font-normal text-grey desc" dangerouslySetInnerHTML={{
            __html:postesSingle?.channelEntryDetail?.description.replaceAll("<br>"," ")
          }}></p>
        
        </div>



        </div>

        

      </div>}
      </>
  )
}

export default PostSingleData