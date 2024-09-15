import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";

function Appointment() {
  const { docId } = useParams();
  const { doctors, currencySymbol } = useContext(AppContext);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState({});
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');


  const fetchDocInfo = async () => {
    const docInfoSearch = await doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfoSearch);
    // console.log(docInfoSearch);
  };

  const getAvialableSlots = async () => {
    setDocSlots([]);
    
    // getting current date
    let today = new Date();
    for(let i=0; i<7; i++) {
      // getting date with index
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate()+i);

      // setting end time of the date with index
      let endTime = new Date();
      endTime.setDate(today.getDate()+1);
      endTime.setHours(21,0,0,0);

      // setting hours
      if(today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours():10);
        currentDate.setMinutes(currentDate.getMinutes()>30?30:0)
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];

      while(currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

        // add slot to array
        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });

        // increment current time by 30 minutes
        currentDate.setMinutes(currentDate.getMinutes()+30);
      }

      setDocSlots(prev => ([...prev, timeSlots]));
    }
  }

  useEffect(() => {
    fetchDocInfo();
  }, [docId, doctors]);

  useEffect(() => {
    getAvialableSlots();
  },[docInfo]);

  useEffect(()=>{
    console.log(docSlots);
  }, [docSlots]);

  return (
    <div>
      {/* Doctor Details */}
      <div className="flex flex-col sm:flex-row gap-4 ">
        <div>
          <img className="bg-primary w-full sm:max-w-72 rounded-lg" src={docInfo.image} alt="" />
        </div>

        <div className="flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0" >
          {/* Doc Info : name, degree, experience */}
          <p className="flex items-center gap-2 text-2xl font-medium text-gray-900">
            {docInfo.name}
            <img className="w-5" src={assets.verified_icon} alt="" />
          </p>
          <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
            <p>
              {docInfo.degree} - {docInfo.speciality}
            </p>
            <button className="py-0.5 px-2 border text-xs rounded-full">{docInfo.experience}</button>
          </div>

          {/* Doctor About */}
          <div>
            <p className="flex items-center gap-1 text-sm font-medium text-gray-900 mt-3">
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className="text-sm text-gray-500 max-w-[700ox] mt-1">{docInfo.about}</p>
          </div>
          <p className="text-gray-500 font-medium mt-4">
            Appointment fee : <span className="text-gray-600">{currencySymbol} {docInfo.fees}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Appointment;
