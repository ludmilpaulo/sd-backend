import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '@/styles/Home.module.css'
import { useRouter } from 'next/router'


import React, { useState, useEffect } from "react";
import { AiOutlineMenu, AiOutlineSearch, AiOutlineClose, AiFillTag } from 'react-icons/ai';
import { BsFillCartFill,BsFillSaveFill } from 'react-icons/bs';
import {TbTruckDelivery} from 'react-icons/tb'
import {FaUserFriends, FaWallet} from 'react-icons/fa'
import {MdFavorite, MdHelp} from 'react-icons/md'
import background from "../assets/bg.png";
import RestaurantItem from '@/components/RestaurantItem'



interface Restaurant {
  id: number;
  name: string;
  phone: number;
  address: string;
  logo: string;
}


export default function Home() {
    

    const [restaurantData, setRestaurantData] = useState<Restaurant[]>([]);
    const [search, setSearch] = useState("");
    const [filteredDataSource, setFilteredDataSource] = useState<Restaurant[]>([]);
    const [masterDataSource, setMasterDataSource] = useState<Restaurant[]>([]);

    const [loading, setLoading] = useState(false);
    const [nav, setNav] = useState(false)

    const getRestaurant = async () => {
      try {
        fetch("https://www.sunshinedeliver.com/api/customer/restaurants/")
          .then((response) => response.json())
          .then((responseJson) => {
            setRestaurantData(responseJson.restaurants);
            setFilteredDataSource(responseJson.restaurants);
            setMasterDataSource(responseJson.restaurants);
          })
          .catch(function(error) {
            console.log('There has been a problem with your fetch operation: ' + error.message);
            // ADD THIS THROW error
             throw error;
          });
      } catch (e) {
        alert(e);
      }
    };
  
    useEffect(() => {
      getRestaurant();
    }, [restaurantData]);
  
    ///******************************Procurar************************* */
    const searchFilterFunction = (text: any) => {
      // Check if searched text is not blank
      if (text) {
        // Inserted text is not blank
        // Filter the masterDataSource and update FilteredDataSource
        const newData = masterDataSource.filter(function (item) {
          // Applying filter for the inserted text in search bar
          const itemData = item.name ? item.name.toUpperCase() : "".toUpperCase();
          const textData = text.toUpperCase();
          return itemData.indexOf(textData) > -1;
        });
        setFilteredDataSource(newData);
        setSearch(text);
      } else {
        // Inserted text is blank
        // Update FilteredDataSource with restaurantData
        setFilteredDataSource(masterDataSource);
        setSearch(text);
      }
    };

    return (
      <>
   
<div className='bg-cover w-full h-full bg-no-repeat bg-bg_image'>

<div className='max-w-[1640px] mx-auto flex justify-between items-center p-4'>
    {/* Left side */}
    <div className='flex items-center'>
      <div onClick={()=> setNav(!nav)} className='cursor-pointer'>
        <AiOutlineMenu size={30} />
      </div>
      <h1 className='text-2xl sm:text-3xl lg:text-4xl px-2'>
      Melhores <span className='font-bold'>Refeições</span>
      </h1>
      <div className='hidden lg:flex items-center bg-gray-200 rounded-full p-1 text-[14px]'>
        <p className='bg-black text-white rounded-full p-2'>Delivery</p>
        <p className='p-2'>Pickup</p>
      </div>
    </div>

    {/* Search Input */}
    <div className='bg-gray-200 rounded-full flex items-center px-2 w-[200px] sm:w-[400px] lg:w-[500px]'>
      <AiOutlineSearch size={25} />
      <input
        className='bg-transparent p-2 w-full focus:outline-none'
        type='text'
        placeholder='Pesquisar Restaurantes'
        value={search}
        onChange={(text) => searchFilterFunction(text)}
      />
    </div>
    {/* Cart button */}
    <button className='bg-black text-white hidden md:flex items-center py-2 rounded-full'>
      <BsFillCartFill size={20} className='mr-2' /> Cart
    </button>

    {/* Mobile Menu */}
    {/* Overlay */}
    {nav ? <div className='bg-black/80 fixed w-full h-screen z-10 top-0 left-0'></div> : ''}
    

    {/* Side drawer menu */}
    <div className={nav ? 'fixed top-0 left-0 w-[300px] h-screen bg-white z-10 duration-300' : 'fixed top-0 left-[-100%] w-[300px] h-screen bg-white z-10 duration-300' }>
      <AiOutlineClose
          onClick={()=> setNav(!nav)}
        size={30}
        className='absolute right-4 top-4 cursor-pointer'
      />
      <h2 className='text-2xl p-4'>
      Melhores <span className='font-bold'>Refeições</span>
      </h2>
      <nav>
          <ul className='flex flex-col p-4 text-gray-800'>
              <li className='text-xl py-4 flex'><TbTruckDelivery size={25} className='mr-4' /> Pedidos</li>
              <li className='text-xl py-4 flex'><MdFavorite size={25} className='mr-4' /> Favoritos</li>
              <li className='text-xl py-4 flex'><FaWallet size={25} className='mr-4' /> Carteira</li>
              <li className='text-xl py-4 flex'><MdHelp size={25} className='mr-4' /> Ajuda</li>
              <li className='text-xl py-4 flex'><AiFillTag size={25} className='mr-4' /> Promoções</li>
              <li className='text-xl py-4 flex'><BsFillSaveFill size={25} className='mr-4' /> Best Ones</li>
              <li className='text-xl py-4 flex'><FaUserFriends size={25} className='mr-4' /> Convide amigos</li>
          </ul>
      </nav>
    </div>
  </div>

  <div className='max-w-[1640px] mx-auto p-4'>
      <div className='max-h-[500px] relative'>
          {/* Overlay */}
          <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
              <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>The <span className='text-orange-500'>Best</span></h1>
              <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='text-orange-500'>Foods</span> Devlivered</h1>
          </div>
          <img className='w-full max-h-[500px] object-cover' src="https://images.pexels.com/photos/1639562/pexels-photo-1639562.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="/" />
      </div>
  </div>


  <div className='max-w-[1640px] mx-auto p-4 py-12 grid md:grid-cols-3 gap-6'>
    {/* Card */}
   
<RestaurantItem filteredDataSource={filteredDataSource}/>

  </div>


  </div>
      </>
  );
}

const divStyle = {
  backgroundPosition: "center",
  backgroundSize: "cover",
  backgroundRepeat: "noRepeat",
  // width: "100vw",
  height: "100vh",
  backgroundImage: "url(" + background + ")",
};
