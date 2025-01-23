import React, { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { X } from "lucide-react";
import useAppStore from "@/state/zustand";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

let testCoordinates = [
  {
    project_id: 1,
    "Project URL": "https://sakani.sa/app/offplan-projects/1",
    project_name_eng: "Riyadh Skyline",
    project_latitude: 24.774265,
    project_longitude: 46.738586,
  },
  {
    project_id: 2,
    "Project URL": "https://sakani.sa/app/offplan-projects/2",
    project_name_eng: "Kingdom Tower View",
    project_latitude: 24.713552,
    project_longitude: 46.675296,
  },
  {
    project_id: 3,
    "Project URL": "https://sakani.sa/app/offplan-projects/3",
    project_name_eng: "Al Faisaliah Residences",
    project_latitude: 24.690247,
    project_longitude: 46.6854,
  },
  // {
  //   project_id: 4,
  //   "Project URL": "https://sakani.sa/app/offplan-projects/4",
  //   project_name_eng: "Riyadh Green Oasis",
  //   project_latitude: 24.726658,
  //   project_longitude: 46.767417,
  // },
//   {
//     project_id: 5,
//     "Project URL": "https://sakani.sa/app/offplan-projects/5",
//     project_name_eng: "Diplomatic Quarter Heights",
//     project_latitude: 24.709371,
//     project_longitude: 46.641861,
//   },
//   {
//     project_id: 6,
//     "Project URL": "https://sakani.sa/app/offplan-projects/6",
//     project_name_eng: "Riyadh Downtown Living",
//     project_latitude: 24.6319,
//     project_longitude: 46.715,
//   },
//   {
//     project_id: 7,
//     "Project URL": "https://sakani.sa/app/offplan-projects/7",
//     project_name_eng: "North Riyadh Residences",
//     project_latitude: 24.85,
//     project_longitude: 46.7,
//   },
//   {
//     project_id: 8,
//     "Project URL": "https://sakani.sa/app/offplan-projects/8",
//     project_name_eng: "Eastern Riyadh Villas",
//     project_latitude: 24.7104,
//     project_longitude: 46.81,
//   },
];
const CardsContainer = ({handleSend}) => {
    const {setShowRecommendationCards,latLongDetails} = useAppStore()
    const [selectedCard,setSelectedCard] = useState(null)

    const handleSelectedCard =(id,name)=>{
        setSelectedCard(id)
        let selectedPrompt = `I am interested in ${name} project its id is ${id} `
        setShowRecommendationCards(false)
        handleSend(selectedPrompt)
    }

    const handleClose = () =>{ 
        setShowRecommendationCards(false)
    }

  return (
    <motion.div  initial={{ x: '100%', opacity: 0 }}
    animate={{ x: 0, opacity: 1 }}
    exit={{ x: '100%', opacity: 0 }}
    transition={{ type: 'spring', stiffness: 100, damping: 20 }}
     className="bg-transparent  container ml-2 bottom-0 w-full  max-w-4xl relative z-20 backdrop-blur-sm">
      {/* <Button variant='icon' className='hover:bg-slate-400  hover:text-black text-cyan-400 cursor-pointer transition ease-in rounded-full'  onClick={handleClose}><X className="h-8 w-8"/></Button> */}
      <h3 className=" text-slate-100 ml-2">Select One of the following Project to continue</h3>
    <div className="relative  rounded-3xl flex flex-wrap justify-start border-slate-500 max-w-4xl gap-2  p-2">
        {/* have to map with latLongDetails for the coordinates test coordinates is just for testing */}
      {latLongDetails.map((location, index) => {
        return (
          <Card key={index} onClick={()=>handleSelectedCard(location.project_id,location.project_name_eng)} className={`w-50 ${location.project_id===selectedCard?'bg-cyan-700':"bg-slate-600/90"}  border-cyan-400 shadow-lg rounded-2xl max-w-52 hover:text-black  text-wrap content-center cursor-pointer hover:bg-cyan-600 transition-all ease-in`}>
            <CardContent className='text-wrap whitespace-pre-wrap text-sm p-4'>
              <h3 className="font-bold text-slate-200 text-sm">{location.project_name_eng}</h3>
              <a
                // href={location["Project URL"]}
                target="_blank"
                rel="noreferrer noopener"
                className="text-cyan-400 hover:underline text-xs "
              >
                {location["Project URL"]}
              </a>
            </CardContent>
          </Card>
        );
      })}
    </div>
    </motion.div>
  );
};

export default CardsContainer;
