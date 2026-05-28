import { BASE_URL } from "../service/baseUrl.js";



export const trackOrder = async (trackingId) => {
  const response = await fetch(`${BASE_URL}orders/track/${trackingId}`);
  if (!response.ok) throw new Error('Order not found');
  return response.json();
};
