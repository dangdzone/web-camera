// api.ts
import axios from 'axios';

// types
import { Province, District, Ward } from './type'

const API_URL = 'https://vapi.vnappmob.com/api';

// Danh sách tỉnh
export const fetchProvinces = async (): Promise<Province[]> => {
    const response = await axios.get(`${API_URL}/province`, {
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.data.results;
};

// Quy đổi id sang name (tỉnh)
export const getProvinceNameById = async (id: number): Promise<string | null> => {
    try {
        const provinces = await fetchProvinces();
        const province = provinces.find(p => p.province_id === id);
        return province ? province.province_name : null;
    } catch (error) {
        console.error('Failed to fetch provinces', error);
        return null;
    }
};

// Danh sách huyện
export const fetchDistricts = async (province_id: number): Promise<District[]> => {
    const response = await axios.get(`${API_URL}/province/district/${province_id}`, {
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.data.results;
};

// Quy đổi id sang name (huyện)
export const getDistrictNameById = async (province_id: number, district_id: number): Promise<string | null> => {
    try {
        const districts = await fetchDistricts(province_id);
        const district = districts.find(district => district.district_id === district_id);
        return district ? district.district_name : null;
    } catch (error) {
        console.error("Error fetching districts:", error);
        return null;
    }
};

// Danh sách xã, phường
export const fetchWards = async (district_id: number): Promise<Ward[]> => {
    const response = await axios.get(`${API_URL}/province/ward/${district_id}`, {
        headers: {
            'Accept': 'application/json',
        },
    });
    return response.data.results;
};

// Quy đổi id sang name (xã, phường)
export const getWardNameById = async (district_id: number, ward_id: number): Promise<string | null> => {
    try {
        const wards = await fetchWards(district_id);
        const ward = wards.find(ward => ward.ward_id === ward_id);
        return ward ? ward.ward_name : null;
    } catch (error) {
        console.error("Error fetching wards:", error);
        return null;
    }
};

