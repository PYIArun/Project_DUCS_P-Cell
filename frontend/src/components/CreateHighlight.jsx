import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaRegFilePdf } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import axios from 'axios';

const CreateHighlight = () => {
  const [title, setTitle] = useState("");
  const [link, setLink] = useState("");
  const [highlights, setHighlights] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const currentDate = new Date();
  const dateOfPost = `${currentDate.getFullYear()}-${(currentDate.getMonth() + 1).toString().padStart(2, '0')}-${currentDate.getDate().toString().padStart(2, '0')}`;

  useEffect(() => {
    axios.get('http://localhost:5000/highlights')
      .then(response => setHighlights(response.data))
      .catch(error => console.error(error));
  }, [highlights]);

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowModal(true);
  };

  const deleteHighlightCall = () => {
    axios.delete(`http://localhost:5000/highlights/${deleteId}`)
      .then(() => {
        setHighlights(highlights.filter(highlight => highlight._id !== deleteId));
        setShowModal(false);
      })
      .catch(error => console.error('Error deleting highlight:', error));
  };

  const HighlightFormSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      await axios.post('http://localhost:5000/highlights', { title: title, gdrive_link: link, date_of_post: dateOfPost }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setTitle("");
      setLink("");
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      {/* <Header /> */}
      <div className="w-[90%] flex flex-col mb-[4rem] md:flex-row lg:flex-row mx-auto justify-between gap-[4rem]">
        <div className="flex flex-col mt-[2rem] w-full md:w-[40%] gap-[2rem]">
          <CardHeader>
            <CardTitle className="text-[2rem] text-[#72265F] font-instrument">Create Highlights</CardTitle>
          </CardHeader>
          <Card className="pt-[1.5rem] bg-white rounded-[0.7rem]">
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="title">Title</Label>
                    <Input  id="title" onChange={(e) => setTitle(e.target.value)} value={title} placeholder="Title for the Highlight" />
                  </div>
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="link">Link</Label>
                    <Input onChange={(e) => setLink(e.target.value)} value={link} id="link" placeholder="Google drive link" />
                  </div>
                  <div>
                    <Label htmlFor="date">Date:</Label>
                    <Input id="date" className="disabled:bg-gray-400 disabled:cursor-not-allowed" readOnly value={dateOfPost} />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button className='active:scale-105 transition-all ease-in' onClick={() => { setLink(""); setTitle(""); }}>Cancel</Button>
              <Button onClick={HighlightFormSubmit} disabled={isSubmitting} className='rounded-[0.7rem] active:scale-105 transition-all ease-in' variant="outline">Create</Button>
            </CardFooter>
          </Card>
        </div>

        <div className="mt-[2rem] w-full md:w-[60%]">
          <Card className="bg-white w-full rounded-[0.7rem] py-[1rem] mx-auto h-[40rem] overflow-y-scroll">
            <CardContent>
              {highlights.map((highlight) => (
                <Card key={highlight._id} className="my-[1rem] rounded-[0.7rem] items-center flex">
                  <div className="w-[5rem] h-[5rem] bg-[#F2DFFA] rounded-sm flex flex-col justify-center items-center relative">
                    <h1 className="font-instrument text-[#642A7C] font-semibold text-[2rem] absolute top-2">
                      {new Date(highlight.date_of_post).getDate()}
                    </h1>
                    <h2 className="font-instrument text-[#642A7C] font-semibold text-[1rem] absolute bottom-3">
                      {new Date(highlight.date_of_post).toLocaleString('default', { month: 'short' })}
                    </h2>
                  </div>
                  <div className="flex flex-row justify-between items-center w-[93%] px-[1rem]">
                    <h2 className="font-instrument text-[1.1rem]">{highlight.title}</h2>
                    <div className="flex items-center gap-[1.5rem]">
                      <a href={highlight.gdrive_link} target="_blank" rel="noopener noreferrer">
                        <FaRegFilePdf className="text-[2rem] cursor-pointer text-[#642A7C]" />
                      </a>
                      <div onClick={() => confirmDelete(highlight._id)} className="flex justify-center items-center px-[1.4rem] py-[1.4rem] rounded-full cursor-pointer">
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
            <h2 className="text-xl font-bold mb-4 text-[#72265F]">Are you sure you want to delete this highlight?</h2>
            <div className="flex justify-center font-instrument gap-4">
              <Button onClick={deleteHighlightCall} className='rounded-[0.7rem] hover:bg-red-600 hover:text-white active:scale-105 transition-all ease-in' variant="outline">Yes</Button>
              <Button onClick={() => setShowModal(false)} className=" rounded-[0.7rem]active:scale-105 transition-all ease-in">No</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateHighlight;
