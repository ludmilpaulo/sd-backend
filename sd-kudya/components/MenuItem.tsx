import React, { useState } from 'react'
import Image from "next/image";
import {motion} from 'framer-motion'
import { useDispatch, useSelector } from "react-redux";
interface Meals{
    category: string;
    id : number; 
    image : string; 
    name : string; 
    price : number;
    quantity : number;
    short_description : string;
}


const MenuItem = ({ resId, food, resName, resImage, foods } : { resId:any, food:Meals, resName:any, resImage:any, foods:any }) => {

  const dispatch = useDispatch();


  const handleAddRemove = (id: any) => {
    console.log("quatidde==>", qty) 

  

    const indexFromFood = foods.findIndex((x:any) => x.id === id);
    const resIndex = cartItems.findIndex((item:any) => item.resName === resName);
    const foodItem = foods[indexFromFood];
    foodItem.quantity = qty;
    //setQty(foodItem.quantity);
    console.log('foods item',foodItem);

    if (resIndex >= 0) {
      const menuIndex = cartItems[resIndex].foods.findIndex(
        (item:any) => item.id === id
      );
      if (menuIndex >= 0) {
        let oldArrays = [...cartItems];
        let oldfoods = [...oldArrays[resIndex].foods];
        oldfoods.splice(menuIndex, 1);
        oldArrays.splice(resIndex, 1);
        let newArray = [
          ...oldArrays,
          { foods: oldfoods, resName, resImage, resId },
        ];
        console.log('nova array',newArray)
        dispatch(updateBusket(newArray));
      } else {
        let oldArrays = [...cartItems];
      
        let newFoodArray = [...oldArrays[resIndex].foods, foodItem ];
        oldArrays.splice(resIndex, 1);
        foodItem.quantity = qty;
        let updatedResArray = [
          ...oldArrays,
          { foods: newFoodArray, resName, resImage, resId },
        ];
        console.log('updated ', updatedResArray)
        dispatch(updateBusket(updatedResArray));
      }
    } else {
      let oldArrays = [...cartItems];
      foodItem.quantity = qty;
      let newResFoodArray = [
        ...oldArrays,
        {
          foods: [{ ...foodItem}],
          resName,
          resImage,
          resId,
        },
      ];
      dispatch(updateBusket(newResFoodArray));
    }
  };
  
  
    return (
          <div className='border shadow-lg rounded-lg hover:scale-105 duration-300'>
            <img
              src={food.image}
           
              alt={food.name}
              className='w-full h-[200px] object-cover rounded-t-lg'
            />
            <div className='flex justify-between px-2 py-4'>
              <p className='font-bold'>{food.name}</p>
              <p>
                <span className='bg-[#004AAD] text-white p-1 rounded-full'>
                  {food.price} Kz
                </span>
              </p>
            </div>
            
          </div>



     
    );
  };

export default MenuItem
