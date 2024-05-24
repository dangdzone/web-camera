// api.ts
import axios from 'axios';

// types
import { Province, District, Ward } from './type'

const API_URL = 'https://vapi.vnappmob.com/api';

export const fetchProvinces = async (): Promise<Province[]> => {
    const response = await axios.get(`${API_URL}/province`, {
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.data.results;
};

export const fetchDistricts = async (province_id: number): Promise<District[]> => {
    const response = await axios.get(`${API_URL}/province/district/${province_id}`, {
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.data.results;
};

export const fetchWards = async (district_id: number): Promise<Ward[]> => {
    const response = await axios.get(`${API_URL}/province/ward/${district_id}`, {
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.data.results;
};
