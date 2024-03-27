import apiClient from "../components/Utils/api-client";

export function checkoutAPI() {
    return apiClient.post("/order/checkout")
}

export function getOrderAPI() {
    return apiClient.get("/order")
}