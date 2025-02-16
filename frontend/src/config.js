const isProduction = import.meta.env.PROD;
export const API_URL = isProduction 
  ? "https://equivalencias-univalle.vercel.app/api" 
  : "http://localhost:3001/api";
