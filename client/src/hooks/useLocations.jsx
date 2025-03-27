import { useState, useEffect } from "react";
import { baseUrl } from "../config/axiosConfig";


export const useLocations = () => {
    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [neighborhoods, setNeighborhoods] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const fetchLocations = async ()=>{
            try {
                const countriesResponse = await baseUrl.get("/api/countries");
                setCountries(countriesResponse.data.detail);
                const statesResponse = await baseUrl.get("/api/states");
                setStates(statesResponse.data.detail);
                const citiesResponse = await baseUrl.get("/api/cities");
                setCities(citiesResponse.data.detail);
                const neighborhoodsResponse = await baseUrl.get("/api/neighborhoods");
                setNeighborhoods(neighborhoodsResponse.data.detail);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };
        fetchLocations();
    }, []);
    return { countries, states, cities, neighborhoods, loading, error };
}