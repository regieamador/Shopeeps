import apiClient from "../components/Utils/api-client";

export function getSuggestionsApi(search) {
    return apiClient.get(`/products/suggestions?search=${search}`)
}