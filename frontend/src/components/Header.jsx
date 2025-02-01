import React from 'react'
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const Header = () => {
  return (
    <div className='w-[90%] mt-[2rem] mx-auto flex justify-between'>
        
        <div className="flex items-center gap-[0.9rem]">
            <div className="flex justify-start">
                <img src='./images/du_logo.png' className='w-[90%]'></img>
            </div>
            <div className=''>
                <h2 className='text-[2rem] font-instrument text-[#72265F]'>Placement Cell, DUCS</h2>
                <hr className='border-[1.5px] rounded-sm border-[#7a408f] '></hr>
                <h4 className='text-[1.5rem] text-[#72265F]'>University of Delhi </h4>
            </div>
        </div>
        <div className="flex items-center gap-[4rem] text-[#72265F]">
            <h2 className='underline font-semibold cursor-pointer'>Brochure 2025-26</h2>
            <h2>About Us</h2>
            <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="px-[1.25rem] py-[0.5rem] rounded-md bg-[#72265F] font-semibold text-white" variant="outline">Login</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-30">
        <DropdownMenuGroup>
          <DropdownMenuItem>
            Student
          </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem>
            Recruiter
          </DropdownMenuItem>
        <DropdownMenuSeparator></DropdownMenuSeparator>
          <DropdownMenuItem>
            Coordinator
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>

            {/* <button className=' px-5 py-2 rounded-md bg-[#72265F] font-semibold text-white'>Login</button> */}
        </div>

    </div>
  )
}

export default Header