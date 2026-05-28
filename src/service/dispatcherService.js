import { BASE_URL } from "./baseUrl.js";
import { getToken } from "./loginService.js";

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

export const getDashboardStats = async () => {
  const res = await fetch(`${BASE_URL}dispatcher/dashboard`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch dashboard stats");
  return res.json();
};

export const getRecentOrders = async () => {
  const res = await fetch(`${BASE_URL}orders/getAll_Orders_Status?skip=0&limit=10`, {
    method: "POST",
    headers: authHeaders(),
  });
  if (!res.ok) throw new Error("Failed to fetch orders");
  return res.json();
};

export const getAllRiders = async () => {
  const res = await fetch(`${BASE_URL}getAllRiders`, { headers: authHeaders() });
  if (!res.ok) throw new Error("Failed to fetch riders");
  return res.json();
};

export const assignDriverToOrder = async (orderId, driverId) => {
  const res = await fetch(`${BASE_URL}orders/assign_driver`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ order_id: orderId, driver_id: driverId }),
  });
  if (!res.ok) throw new Error("Failed to assign driver");
  return res.json();
};
