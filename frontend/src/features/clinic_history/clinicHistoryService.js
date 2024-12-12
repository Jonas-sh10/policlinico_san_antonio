import axios from 'axios';

const Clinic_History_URL = `http://localhost:5000/api/v1/clinic_history/`;

const createClinicHistory = async (clinicHistoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(Clinic_History_URL, clinicHistoryData, config);
    return response.data;
}

const getClinicHistory = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(Clinic_History_URL, config);
    return response.data;
};

const getClinicHistoryByDni = async (dni, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${Clinic_History_URL}${dni}`, config);
    console.log(response.data);
    
    return response.data;
};

const getClinicHistoryByDate = async ({startDate, endDate}, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        },
        params: {
            startDate,
            endDate
        }
    };
    const response = await axios.get(`${Clinic_History_URL}`, config);
    console.log(response.data);
    return response.data;
};

const updateClinicHistory = async (id, clinicHistoryData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(`${Clinic_History_URL}${id}`, clinicHistoryData, config);
    return response.data;
};

const deleteClinicHistory = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    await axios.delete(`${Clinic_History_URL}${id}`, config);
    return id;
};

const clinicHistoryService = {
    createClinicHistory,
    getClinicHistory,
    getClinicHistoryByDni,
    getClinicHistoryByDate,
    updateClinicHistory,
    deleteClinicHistory
};

export default clinicHistoryService;
