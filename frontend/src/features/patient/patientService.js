import axios from 'axios';

const Patient_URL = `http://localhost:5000/api/v1/patient/`;

const createPatient = async (patientData) => {
    const config = {
        headers: {
            Authorization: `Bearer ${patientData.token}`
        }
    }

    const response = await axios.post(Patient_URL, patientData, config);
    return response.data;
};

const getPatient = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(Patient_URL, config);
    return response.data;
};

const getPatientByDni = async (dni, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.get(`${Patient_URL}${dni}`, config);
    return response.data;
};

const updatePatient = async (id, patientData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.put(`${Patient_URL}${id}`, patientData, config);
    return response.data;
};

const deletePatient = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }

    const response = await axios.delete(`${Patient_URL}${id}`, config);
    return response.data;
};

const patientService = {
    createPatient,
    getPatient,
    getPatientByDni,
    updatePatient,
    deletePatient
};

export default patientService;

