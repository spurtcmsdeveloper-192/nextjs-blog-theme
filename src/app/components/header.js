import Image from "next/image";
import Link from "next/link";
import ThemeSwitch from "../utilities/ThemeSwitch";

export default function Header({catNo,setCatNo,setPostes,setOffset}) {

  const handleClick=()=>{
    if(catNo){
 setCatNo(null)
      setPostes([])
    }
      
      setOffset(0)
  }
  return (
    <header className="xl:py-6 sm:py-4 xl:px-0 px-6 py-6 border-b border-color border-solid">
    {/* <div className="container mx-auto max-w-screen-xl">
        <a href={"/"} className="inline-block">
            <img src="/img/logo.svg" className="w-48 md:w-auto" />
        </a>
    </div> */}
    {/* <nav className="flex items-center justify-between  py-6 sm:px-20 px-6 sm:px-10 max-w-screen-2xl m-auto "> */}
<div className="container mx-auto max-w-screen-xl flex justify-between">
          <Link href='/'  onClick={()=>handleClick()} className="inline-block">
            
            <Image
              src="/img/logo.svg"
              alt="spurtCMS Profile Image"
              className="w-48 md:w-auto"
              width={32}
              height={32}
              priority
            /></Link>
<ul className="list-none flex gap-4 items-center">
                        
                        <li>
                            {/* <button className="py-1.5" ><img src="/images/dark.svg"></img></button> */}
                            <ThemeSwitch />
                        </li>
                    
                    </ul>

            </div>

            
                    {/* </nav> */}
</header>
  );
}
