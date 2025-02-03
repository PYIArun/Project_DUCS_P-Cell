import React, { useState } from 'react'
import { Button } from './button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Header from '../Header';
import { FaRegFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { use } from 'react';

const CreateHighlight = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");

  const HighlightFormSubmit = () => {
    console.log({title, link});
  }

  return (
    <div className=''>
      <Header />
      <div className=" w-[90%] flex  mx-auto justify-between gap-[4rem]">
      <div className = "flex flex-col mt-[2rem] w-[40%] gap-[2rem]">
      <CardHeader>
            <CardTitle className = "text-[2rem] text-[#72265F] font-instrument">Create Highlights</CardTitle>
            <CardDescription></CardDescription>
          </CardHeader>
        <Card className="pt-[1.5rem] bg-white rounded-[0.7rem] ">
          
          <CardContent>
            <form>
              <div className="grid w-full items-center gap-4">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="title">Title</Label>
                  <Input id="title" onChange={(e) => setTitle(e.target.value)} value={title}  placeholder="Title for the Highlight" />
                </div>
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="link">Link</Label>
                  
                  <Input onChange={(e) => setLink(e.target.value)} value={link}  id="link" placeholder="Google drive link" />
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button onClick = {() => {setLink(""); setTitle("");}}>Cancel</Button>
            <Button onClick={HighlightFormSubmit} className='rounded-[0.7rem] active:scale-95  active:transition-all transition-all ease-in  active:ease-in' variant="outline">Create</Button>
          </CardFooter>
        </Card>
      </div>
        <div className="mt-[2rem] w-[60%] ">
          <Card className="bg-white w-full rounded-[0.7rem] py-[1rem] mx-auto h-[40rem] overflow-y-scroll">
            <CardContent>
              {[...Array(7)].map((_, index) => (
                <Card key={index} className="my-[1rem] rounded-[0.7rem] items-center flex">
                  <div className="w-[5rem] h-[5rem] bg-[#F2DFFA] rounded-sm flex flex-col justify-center relative items-center">
                    <h1 className="font-instrument text-[#642A7C] font-semibold text-[2rem] absolute top-2">2</h1>
                    <h2 className="font-instrument text-[#642A7C] font-semibold text-[1rem] absolute bottom-3">Jan</h2>
                  </div>
                  <div className="flex flex-row justify-between items-center w-[93%] px-[1rem]">
                    <h2 className="font-instrument text-[1.1rem]">Here we gonna put the title of the highlights</h2>
                    <div className="flex items-center gap-[1.5rem]">
                    <a href="#">
                      <FaRegFilePdf className="text-[2rem] hover:scale-105 active:scale-95 cursor-pointer text-[#642A7C]   transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all" />
                    </a>
                    <div className="flex justify-center items-center px-[1.4rem] py-[1.4rem] rounded-full active:scale-95 active:bg-[#F8F7F9]  hover:transition-all ease-in transition-all hover:ease-in relative">
                    <MdDelete className=' text-red-500 rounded-md text-[2rem]   absolute cursor-pointer'/>
                    </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

    </div>
    // </div >
  )
}

export default CreateHighlight