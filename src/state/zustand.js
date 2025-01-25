// src/store/useAppStore.js
import { create } from 'zustand';

const useAppStore = create((set) => ({


  showRecommendation:true,
  setShowRecommendation:(value)=>set({showRecommendation:value}),

  showRecommendationCards:false,
  setShowRecommendationCards:(value)=>set({showRecommendationCards:value}),

  latLongDetails:[{}],
  setLatLongDetails:(data)=>set({latLongDetails:data}),

  
  
}));

export default useAppStore;
