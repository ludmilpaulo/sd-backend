import Link from 'next/link'
import Image from 'next/image';
import { Key, ReactElement, JSXElementConstructor, ReactFragment, ReactPortal } from 'react';

interface Restaurant {
    map: any;
    id: number;
    name: string;
    phone: number;
    address: string;
    logo: string;
  }

export default function RestaurantItem({filteredDataSource}:{filteredDataSource: Restaurant}){

    return(
        <>
         {filteredDataSource.map((item: Restaurant) => (
         <div className='rounded-xl relative'
         key={item.id}
         >
         {/* Overlay */}
         <div className='absolute w-full h-full bg-black/50 rounded-xl text-white'>
           <p className='font-bold text-2xl px-2 pt-4'>{item.name}</p>
           <p className='px-2'>{item.phone}</p>

         <Link href={{
            pathname: "/details",
            query: {
                name: item.name,
                restaurantId: item.id,
                phone: item.phone,
                image_url: item.logo,
                address: item.address,
            } 
          }}
        >
           <button
           className='border-white bg-white text-black mx-2 absolute bottom-4'>
            Peça Agora
            </button>
            </Link>
       
         </div>
         <img
         className='max-h-[160px] md:max-h-[200px] w-full object-cover rounded-xl'
           src={item.logo}
           alt='/'
         />
       </div>
    )

    )}
 
        </>
    )
}