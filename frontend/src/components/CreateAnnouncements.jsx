import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";  
import { Label } from "@/components/ui/label";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const CreateAnnouncement = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); 
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDate = new Date();
  const dateOfPost = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;
  const timeOfPost = currentDate.toLocaleTimeString();

  useEffect(() => {
    axios.get('http://localhost:5000/announcements')
      .then(response => setAnnouncements(response.data))
      .catch(error => console.error(error));
  }, [announcements]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const deleteAnnouncementCall = () => {
    axios.delete(`http://localhost:5000/announcements/${deleteId}`)
      .then(() => {
        setAnnouncements(announcements.filter(announcement => announcement._id !== deleteId));
        setShowModal(false);
      })
      .catch(error => console.error('Error deleting announcement:', error));
  };

  const AnnouncementFormSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    const res = {title: title,
      content_of_announcements: content,  // Including content here
      date_of_announcements: dateOfPost,
      time_of_announcements: timeOfPost
    };
    console.log(res);
    try {
      await axios.post('http://localhost:5000/announcements', {
        title: title,
        content_of_announcements: content,  // Including content here
        date_of_announcements: dateOfPost,
        time_of_announcements: timeOfPost
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setTitle("");
      setContent("");  // Reset content after submitting
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <div className="w-[90%] flex flex-col my-[4rem] md:flex-row lg:flex-row mx-auto justify-between gap-[4rem]">
        <div className="flex flex-col mt-[2rem] w-full md:w-[40%] gap-[2rem]">
          <CardHeader>
            <CardTitle className="text-[2rem] text-[#72265F] font-instrument">Create Announcement</CardTitle>
          </CardHeader>
          <Card className="pt-[1.5rem] bg-white rounded-[0.7rem]">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input id="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title for the Announcement" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="content">Content</Label>
                    <Textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      placeholder="Content of the announcement"
                      rows={5} // You can adjust the number of rows as needed
                    />
                  </div>
                  <div>
                    <Label htmlFor="date">Date:</Label>
                    <Input id="date" className="disabled:bg-gray-400 disabled:cursor-not-allowed" readOnly value={dateOfPost} />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className='select-none font-instrument px-[1.25rem] py-[0.5rem] hover:text-[#72265F] hover:border-[1px] hover:border-[#72265F] text-[#72265F] active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold rounded-[0.5rem]' onClick={() => { setContent(""); setTitle(""); }}>Cancel</Button>
              <Button onClick={AnnouncementFormSubmit} disabled={isSubmitting} className='select-none font-instrument px-[1.25rem] py-[0.5rem] bg-[#72265F] hover:text-[#72265F] hover:border-[1px] hover:border-[#72265F] active:scale-95 transition-all ease-in hover:ease-in hover:transition-all active:ease-in active:transition-all font-semibold text-white rounded-[0.5rem]'>Create</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-[2rem] w-full md:w-[60%]">
          <Card className="bg-white w-full rounded-[0.7rem] py-[1rem] mx-auto h-[40rem] overflow-y-scroll">
            <CardContent>
              {announcements.map((announcement) => (
                <Card key={announcement._id} className="my-[1rem] rounded-[0.7rem] items-center flex">
                  <div className="w-[5rem] h-[5rem] bg-[#F2DFFA] rounded-sm flex flex-col justify-center items-center relative">
                    <h1 className="font-instrument text-[#642A7C] font-semibold text-[2rem] absolute top-2">
                      {new Date(announcement.date_of_announcements).getDate()}
                    </h1>
                    <h2 className="font-instrument text-[#642A7C] font-semibold text-[1rem] absolute bottom-3">
                      {new Date(announcement.date_of_announcements).toLocaleString('default', { month: 'short' })}
                    </h2>
                  </div>
                  <div className="flex flex-row justify-between items-center w-[93%] px-[1rem]">
                    <h2 className="font-instrument text-[1.1rem]">{announcement.title}</h2>
                    <div className="flex items-center gap-[1.5rem]">
                      <div onClick={() => confirmDelete(announcement._id)} className="flex justify-center items-center px-[1.4rem] py-[1.4rem] rounded-full cursor-pointer">
                        <MdDelete className="text-red-500 text-[2rem]" />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold mb-4 text-[#72265F]">Are you sure you want to delete this announcement?</h2>
            <div className="flex justify-center font-instrument gap-4">
              <Button onClick={deleteAnnouncementCall} className='rounded-[0.7rem] hover:bg-red-600 hover:text-white active:scale-105 transition-all ease-in' variant="outline">Yes</Button>
              <Button onClick={() => setShowModal(false)} className=" rounded-[0.7rem]active:scale-105 transition-all ease-in">No</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateAnnouncement;
