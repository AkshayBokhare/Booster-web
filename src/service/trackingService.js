
// const BASE_URL = "http://127.0.0.1:8000/v1/";
const BASE_URL = "https://api.booster.earth/v1/";

export const trackOrder = async (trackingId) => {
  const response = await fetch(`${BASE_URL}orders/track/${trackingId}`);
  if (!response.ok) throw new Error('Order not found');
  return response.json();
};
