import React from 'react'
import { doctors } from '../assets/assets'
function TopDoctors() {
  return (
    <div className='mt-[80px] flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
        <h1 className='text-3xl font-medium'>Top Doctors</h1>
        <p className='sm:w-1/3 text-center text-sm'>Simply browse through our extensive list of trusted doctors.</p>
        <div className='w-full grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
            {doctors.slice(0,10).map((item, index)=>(
                <div className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-500">
                    <img src={item.image}alt="" />
                    <div>
                        <div>
                            <p></p><p>Avialable</p>
                        </div>

                        <p>{item.name}</p>
                        <p>{item.speciality}</p>

                    </div>

                </div>
            ))}
        </div>
        <button>more</button>
    </div>
  )
}

export default TopDoctors