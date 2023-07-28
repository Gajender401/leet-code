'use client'
import React, { useState } from 'react';
import { doc, setDoc } from "firebase/firestore";
import { db } from '@/src/lib/firebase';
import { toast } from "react-hot-toast";

interface FormData {
    id: string;
    title: string;
    category: string;
    difficulty: string;
    videoId: string;
    link: string;
    order: number;
    likes: number;
    dislikes: number;
}

const UploadData: React.FC = () => {
    const initialFormData: FormData = {
        id: '',
        title: '',
        category: '',
        difficulty: '',
        videoId: '',
        link: '',
        order: 0,
        likes: 0,
        dislikes: 0,
    };

    const [formData, setFormData] = useState<FormData>(initialFormData);


    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        await setDoc(doc(db, "problems", formData.id), {
            ...formData
        });
        setFormData(initialFormData);
        toast.success('saved to database')
    };

    return (
        <div className="w-full flex items-center h-screen flex-col justify-center bg-gray-300 rounded-sm shadow-md p-8">
            <h1 className='mb-5 text-[30px]' >Upload data</h1>

            <form onSubmit={handleSubmit} className="space-y-2">
                <div>
                    <input
                        type="text"
                        name="id"
                        placeholder="ID"
                        onChange={handleInputChange}
                        value={formData.id}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="title"
                        placeholder="Title"
                        onChange={handleInputChange}
                        value={formData.title}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="category"
                        placeholder="Category"
                        onChange={handleInputChange}
                        value={formData.category}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="difficulty"
                        placeholder="Difficulty"
                        onChange={handleInputChange}
                        value={formData.difficulty}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="videoId"
                        placeholder="Video ID"
                        onChange={handleInputChange}
                        value={formData.videoId}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <div>
                    <input
                        type="text"
                        name="link"
                        placeholder="Link"
                        onChange={handleInputChange}
                        value={formData.link}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-[14px]' >Order</label>
                    <input
                        type="number"
                        name="order"
                        placeholder="Order"
                        onChange={handleInputChange}
                        value={formData.order}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-[14px]' >Likes</label>                    
                    <input
                        type="number"
                        name="likes"
                        placeholder="Likes"
                        onChange={handleInputChange}
                        value={formData.likes}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <div className='flex flex-col'>
                    <label className='text-[14px]' >Dislikes</label>                    
                    <input
                        type="number"
                        name="dislikes"
                        placeholder="Dislikes"
                        onChange={handleInputChange}
                        value={formData.dislikes}
                        className="border border-gray-400 px-4 py-1 rounded"
                    />
                </div>
                <button type="submit" className="bg-blue-500 w-full hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Upload Data
                </button>
            </form>
        </div>
    );
};

export default UploadData;
