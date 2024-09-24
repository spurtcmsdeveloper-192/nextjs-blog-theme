import moment from 'moment'
import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect } from 'react'
import PostSkeleton from '../utilities/skeleton/PostSkeleton'
import { fetchGraphQLDa } from '../api/graphicql'
import { GET_COUNT } from '../api/query'
import { imgaeUrl } from '../utilities/ImagePath'

function Post({postes,loader,catNo,setCatNo,setPostes,setOffset,scrollX}) {

const imageLoader = ({src}) => {
  return src
}

const countData = async (id) =>{
  let varSingle = {"entryId" :id}
  let postCount = await fetchGraphQLDa(GET_COUNT,varSingle)
}
useEffect(()=>{
  countData()
},[])

const handleHomePage=()=>{
      setCatNo(null)
      setPostes([])
      setOffset(0)
}


// for(let i=0;i<postes.length;i++){
//   for(let j=1;j<postes.length;j++){
//     if(postes[i]!=postes[j])
//     {
//       console.log(postes,'asdasdasdasd');
//     }
//   }
// }

// const postesFilter = [...new Set(postes.map(JSON.stringify))].map(JSON.parse);
// console.log(postesFilter,'postesww');
  return (
   <>
   {loader==true?<>
   <PostSkeleton/></>:
        
         <>
         {postes?.length>0?
         <>
          {postes?.map((data,index)=>(
         <>
         {data?.coverImage==""||data?.coverImage==null||data?.coverImage==undefined&&<>
        <div>
       
          <div className="flex justify-start flex-wrap items-center gap-x-4">
            <p className="text-base text-tag-color text-current">{moment(data?.createdOn).format("MMMM DD, YYYY")}</p>           
            <p className="text-base text-tag-color text-current">{data?.readingTime} min read</p>
            <p className="text-base text-tag-color text-current">views {data?.viewCount}</p>
            <a href="javascrip:void(0)" className="text-base text-primary">{data?.authorDetails?.FirstName}{" "}{data?.authorDetails?.LastName}</a>
            {data?.categories.map((catdata,ind)=>(<>
            <div className="px-2 py-1 text-base text-secondary bg-secondary rounded-md">{data?.categories[ind].at(-1).categoryName}</div> </>))}
          </div>
          <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} className="block mt-2 mb-4 hover:underline" >
            <h1 className="sm:text-5xxl text-4xl text-dark font-medium">{data?.title}</h1>              
          </Link>
          <p className="text-base font-light text-current desc" dangerouslySetInnerHTML={{
            __html: data?.description.replaceAll("<br>"," ")
          }}></p>
          
        </div>

        <div className="border-b border-color block my-8"></div></>}
        
        <div className="grid grid-cols-1 sm:grid-cols-3 sm:gap-16 gap-y-4">
          <div className="col-span-2 row-start-2 sm:row-start-1">
            <div className="flex justify-start flex-wrap items-center gap-x-4">
              <p className="text-xss text-tag-color text-current">{moment(data?.createdOn).format("MMMM DD, YYYY")}</p>
              <p className="text-xss text-tag-color text-current">{data?.readingTime} min read</p>
              <p className="text-xss text-tag-color text-current">views {data?.viewCount}</p>
              <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} className="text-xss text-primary" >{data?.authorDetails?.FirstName}{" "}{data?.authorDetails?.LastName}</Link>
              {data?.categories.map((catdata,ind)=>(<>
              <div className="px-2 py-1 text-xss text-secondary bg-secondary rounded-md">{data.categories[ind].at(-1).categoryName}</div>
              </>))}
            </div>
            <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} className="block mt-2 mb-4 hover:underline" onClick={()=>countData(data?.id)}>
              <h1 className="text-3xxl text-dark font-medium leading-8">{data?.title}</h1>              
            </Link>
            <div className="text-base text-current font-light line-clamp-5 desc" dangerouslySetInnerHTML={{
            __html: data?.description.replaceAll("<br>"," ")
          }}></div>
          </div>
          <div className="row-start-1 sm:row-start-1" key={data?.slug}>
            <Link href={catNo==null?`/posts/${data?.slug}`:`/posts/${data?.slug}?catgoId=${catNo}&scroll=${scrollX}`} >
              <Image
              loader={imageLoader}
                src={`${imgaeUrl}${data?.coverImage}`}
                alt="spurtCMS card image"
                // className="dark:invert"
                width={1000}
                height={1000}
                priority
                className='h-image'
              />
            </Link>
          </div>
        </div>

        <div className="border-b border-color block my-8"></div>
        </>))}
        </>
        :
            <>
            <div className=" px-5 lg:px-20  py-32 col-span-full grid place-items-center">
                <div className="flex flex-col items-center max-w-[408px] ">
                    {/* <img src="\img\noData.svg" alt="nodata" className="dark:hidden" /> */}
                    <img
                        src="/img/nodatafilter.svg"
                        alt="nodata"
                    />
                    <h1 className=" text-2xl leading-6 font-medium text-black  mb-3 mt-6 text-center dark:dark:text-light-1">
                        {/* {search ? "No matching search results" : "No Listing Yet !"} */}
                        No Listing Yet !
                    </h1>
                    <Link href='/' onClick={()=>handleHomePage()} className='h-[2.5rem] grid place-items-center bg-black text-base text-white px-4 mt-4 rounded-md dark:bg-white dark:text-black'>Go to Home Page</Link>
                </div>
            </div>
            </>
        }
        </>
        }
   </>
  )
}

export default Post