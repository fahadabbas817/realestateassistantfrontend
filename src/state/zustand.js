// src/store/useAppStore.js
import { create } from 'zustand';

const useAppStore = create((set) => ({


  showRecommendation:false,
  setShowRecommendation:(value)=>set({showRecommendation:value}),

  latLongDetails:[{}],
  setLatLongDetails:(data)=>set({latLongDetails:data})


  
}));

export default useAppStore;
