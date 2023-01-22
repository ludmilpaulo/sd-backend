import React, { useState } from 'react'
import Image from "next/image";
import {motion} from 'framer-motion'
interface Meals{
    category: string;
    id : number; 
    image : string; 
    name : string; 
    price : number;
    quantity : number;
    short_description : string;
}


const MenuItem = ({ resId, food, resName, resImage, foods } : { resId:any, food:any, resName:any, resImage:any, foods:any }) => {


  
  
    return (
      
     
          <div className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
            <img
              src={food?.image}
           
              alt={food?.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold'>{food?.name}</p>
              <p>
                <span className='bg-orange-500 text-white p-1 rounded-full'>
                  {food?.price} Kz
                </span>
              </p>
            </div>
            <div className="flex flex-col md:flex-row gap-x-5 md:gap-y-6 mt-5 items-center ">
              <motion.button        whileTap={{ scale: 0.8 }} className=" w-fit bg-[#18181B] text-white text-2xl text-center py-8 font-bold rounded-lg hover:bg-[#282828] px-11">
                Add to cart
              </motion.button>
             
            </div>
          </div>



     
    );
  };

export default MenuItem
