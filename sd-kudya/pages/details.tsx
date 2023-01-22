/* eslint-disable react/jsx-key */
/* eslint-disable react-hooks/rules-of-hooks */
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import MenuItem from "@/components/MenuItem";
import Geocode from "react-geocode";
import RestaurantMap from "@/components/RestaurantMap";
import Image from 'next/image'
import { isTemplateExpression } from "typescript";

interface Meals{
    category: string;
    id : number; 
    image : string; 
    name : string; 
    price : number;
    quantity : number;
    short_description : string;
}

export default function details() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [foods, setFoods] = useState<Meals[]>([]);

    const [data, setData ] = useState<Meals[]>([]);
    const router = useRouter();
    const { restaurantId, image_url, name, address, phone } = router.query;

    const [restAddress, setResAddress] = useState(address);
    const [restlongitude, setRestLongitude] = useState(0);
    const [restlatitude, setRestLatitude] = useState(0);
    const [mapActive, setMapActive] = useState(false);

    const [rangeValue, setRangeValue] = useState<number>(122);

    const coordinates = {
        latitude: restlatitude,
        longitude: restlongitude,
      };

// Initialize the module (needs to be done only once)
  Geocode.setApiKey("AIzaSyBBkDvVVuQBVSMOt8wQoc_7E-2bvDh2-nw"); // use a valid API key

Geocode.fromAddress(restAddress).then(
    (response) => {
      const { lat, lng } = response.results[0].geometry.location;
      setRestLongitude(lng);
      setRestLatitude(lat);
      console.log("tatitude",lat, lng);
    },
    (error) => {
      console.error(error);
    }
);
  

  
   

      //   Filter Type burgers/pizza/etc
      const filterType = (category: string) => {
        setFoods(
            data.filter((item) => {
            return item.category === category;
          })
        );
      };
    
      //   Filter by price
      const filterPrice = (price: number) => {
        setFoods(
            data.filter((item) => {
            return item.price === price;
          })
        );
      };

    const fetchMeals = ()=>{
        fetch(`https://www.sunshinedeliver.com/api/customer/meals/${restaurantId}/`)
            .then((response) => response.json())
            .then((responseJson) => {
              setFoods(responseJson.meals);
              setData(responseJson.meals);
            })
            .catch((error) => {
              console.error(error);
            });
      
       }
          
      
       useEffect(() => {
        fetchMeals();
        },[data]);


console.log(foods);
  return (
    <div className='bg-cover w-full h-full bg-no-repeat bg-bg_image'>

<div className='max-w-[1640px] mx-auto p-4'>
        <div className='max-h-[500px] relative'>
            {/* Overlay */}
            <div className='absolute w-full h-full text-gray-200 max-h-[500px] bg-black/40 flex flex-col justify-center'>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'>The <span className='text-orange-500'>Best</span></h1>
                <h1 className='px-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold'> <span className='text-orange-500'>Foods</span>{phone}</h1>
            </div>
            {mapActive ? (
            <RestaurantMap coordinates={coordinates} title={name} />
          ) : (

            <img className='w-full max-h-[500px] object-cover' 
            src={image_url}
            alt="/" />
            )}


        </div>
    </div>


<div className='max-w-[1640px] m-auto px-4 py-12'>
      <h1 className='text-orange-600 font-bold text-4xl text-center'>
        Principais itens do menu
      </h1>

      {/* Filter Row */}
      <div className='flex flex-col lg:flex-row justify-between'>
        {/* Fliter Type */}
        <div>
          <p className='font-bold text-gray-700'>filtrar por Categoria</p>
          <div className='flex justfiy-between flex-wrap'>
            <button
              onClick={() => setFoods(data)}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              All
            </button>


           {foods.map((item, index) => (
            // eslint-disable-next-line react/jsx-key
            <button
              onClick={() => filterType(item.category)}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              {item.category}
            </button>
            )
            )} 
            
         
          
          </div>
        </div>

        {/* Filter Price */}
        <div>
          <p className='font-bold text-gray-700'>Filtrar por Preço</p>
          <div className='flex justify-between max-w-[390px] w-full'>

          {foods.map((item, index) => (
            <button
              onClick={() => filterPrice(item.price)}
              className='m-1 border-orange-600 text-orange-600 hover:bg-orange-600 hover:text-white'
            >
              {item.price} Kz
            </button>
          ))}
      
         
          
          </div>
        </div>
      </div>

      {/* Display foods */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-6 pt-4'>
      {foods?.map((food) => {
              return (
                <MenuItem
                  key={food.id}
                  resId={restaurantId}
                  foods={foods}
                  food={food}
                  resName={name}
                  resImage={image_url}
                />
              );
            })}
        </div>
    </div>

   
      
    </div>
  )
}
