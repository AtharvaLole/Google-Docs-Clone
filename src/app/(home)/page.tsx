import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link"
import Navbar from "./navbar";
import TemplateGallery from "./template-gallery";
export default function Home() {
  return (
    <nav className="flex flex-col min-h-screen">
        <div className="fixed top-0 right-0 left-0 z-10 p-4 h-16 bg-white">
            <Navbar/>
        </div>
        <div className="mt-16">   
          <TemplateGallery/>
        
        </div> 

    </nav>
  );
}
