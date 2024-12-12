import axios from 'axios';

const Visit_URL = `http://localhost:5000/api/v1/visit/`;

const getVisits = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(Visit_URL, config);
    return response.data;
};

const getVisitById = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${Visit_URL}${id}`, config);
    return response.data;
};

const createVisit = async (visitData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.post(Visit_URL, visitData, config);
    return response.data;
};

const updateVisit = async (id, visitData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${Visit_URL}${id}`, visitData, config);
    return response.data;
};

const deleteVisit = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${Visit_URL}${id}`, config);
    return response.data;
};

const visitService = {
    getVisits,
    getVisitById,
    createVisit,
    updateVisit,
    deleteVisit
};

export default visitService;
