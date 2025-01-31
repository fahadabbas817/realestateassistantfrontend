import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import useAppStore from "@/state/zustand";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { reportService } from "../api/chat";

const testCoordinates = [
  {
    project_id: 1,
    project_name_eng: "Riyadh Skyline",
    price: "$500,000",
    bedrooms: 3,
    bathrooms: 2,
    area: "1800 sqft",
    location: "Riyadh, Saudi Arabia",
    image: "https://source.unsplash.com/400x300/?house,building",
  },
  {
    project_id: 2,
    project_name_eng: "Kingdom Tower View",
    price: "$750,000",
    bedrooms: 4,
    bathrooms: 3,
    area: "2200 sqft",
    location: "Riyadh, Saudi Arabia",
    image: "https://source.unsplash.com/400x300/?house,building",
  },
  {
    project_id: 3,
    project_name_eng: "Luxury Villa",
    price: "$900,000",
    bedrooms: 5,
    bathrooms: 4,
    area: "3000 sqft",
    location: "Jeddah, Saudi Arabia",
    image: "https://source.unsplash.com/400x300/?house,villa",
  },
  {
    project_id: 4,
    project_name_eng: "Seaside Retreat",
    price: "$1,200,000",
    bedrooms: 6,
    bathrooms: 5,
    area: "3500 sqft",
    location: "Dammam, Saudi Arabia",
    image: "https://source.unsplash.com/400x300/?beach,house",
  },
];

const CardsContainer = ({ handleSend }) => {
  const { setShowRecommendationCards, latLongDetails, setReportResults, setShowReport} = useAppStore();
  const [selectedCard, setSelectedCard] = useState(null);

  const handleSelectedCard = async (id, name) => {
    setSelectedCard(id);
    let selectedPrompt = `I am interested in ${name} project. Its ID is ${id}.`;
    try {
      const report = await reportService(id)
      setShowReport(true)
      setReportResults(report)
      console.log(report)
    } catch (error) {
      console.log(error.message)
    }
   
   
    setShowRecommendationCards(false);
    // handleSend(selectedPrompt);
  };

  return (
    <>
    <h3 className=" text-xl mb-4 text-white font-semibold">Select a Property</h3>
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className="bg-transparent mb-2 container w-full ml-2 max-w-[54rem] relative backdrop-blur-sm"
    >
      

      {/* ShadCN Carousel */}
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="-ml-1">
          {latLongDetails.map((location,index) => (
            <CarouselItem key={index} className="pl-4 sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
              <Card
                onClick={() => handleSelectedCard(location.Apartment_code, location.project_name_eng)}
                className={`${
                  location.project_id === selectedCard ? "border-cyan-400" : "border-gray-700"
                } bg-gray-200 hover:bg-cyan-300 shadow-lg rounded-2xl overflow-hidden cursor-pointer transition-all ease-in hover:shadow-xl w-full`}
              >
                <CardContent className="p-4">
                  <h3 className="text-lg font-bold text-gray-800">{location.project_name_eng}</h3>
                  <p className="text-gray-600 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> {location.apatment_area_meter}
                  </p>
                  <div className="flex justify-between text-gray-700 mt-2">
                    <span className="text-lg font-semibold">💰 {location.sakani_beneficiary_price}</span>
                    <span>🛏️ {location.number_of_rooms} / 🚿 {location.bathroom_count}</span>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        {latLongDetails.length > 3 &&
          <>
        <CarouselPrevious className="text-black" />
        <CarouselNext className="text-black" />
        </>
      }
      </Carousel>
    </motion.div>
    </>
  );
};

export default CardsContainer;
