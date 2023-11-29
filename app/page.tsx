import { Button } from "@/components/ui/button";
import { MoveRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="">
      <div className=" flex flex-col md:flex-row">
        <div className=" p-6 flex-1 items-center">
          <h1 className="flex items-center text-5xl ">
            Welcome to Upload Gallery.
          </h1>
          <h2 className="text-2xl mt-10">
            Streamline your life and business with an all-in-one solution. From
            images to documents, we've got you covered in one place.
          </h2>
          <p className="mt-4 text-sm">
            Discover the convenience of having all your personal and business
            essentials in one centralized hub. From managing your tasks,
            projects, and appointments to storing important documents and
            contacts, our all-in-one platform provides a seamless solution. Stay
            organized, boost productivity, and simplify your life with our
            comprehensive suite of tools. Explore a smarter way to handle your
            day-to-day activities – it's all here, in one place, just for you.
          </p>
          <Link href="/dashboard">
            <Button className="mt-16 ml-16 w-56 gap-2">
             <span>Try it for free</span> 
              {<MoveRight />}
            </Button>
          </Link>
        </div>
        <div className="bg-black rounded-lg flex1 p-8">
          <Image
          className=" rounded-lg"
            src="/Demo_Img2.png"
            width={700}
            height={500}
            alt=""
          />
        </div>
      </div>
    </main>
  );
}
