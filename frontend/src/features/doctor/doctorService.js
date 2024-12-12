import axios from 'axios';

const Doctor_URL = `http://localhost:5000/api/v1/doctors/`;

const createDoctor = async (doctorData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.post(Doctor_URL, doctorData, config);
    console.log(response.data);
    
    return response.data;
}

const getDoctor = async (token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(Doctor_URL, config);
    return response.data;
};

const getDoctorByDni = async (dni, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${Doctor_URL}dni/${dni}`, config);
    console.log(response.data);
    
    return response.data;
};

const getDoctorBySpecialty = async (specialty, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.get(`${Doctor_URL}specialty/${specialty}`, config);
    console.log(response.data);
    return response.data;
};

const updateDoctor = async (dni, doctorData, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.put(`${Doctor_URL}${dni}`, doctorData, config);
    console.log(response.data);
    return response.data;
};

const deleteDoctor = async (id, token) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    };
    const response = await axios.delete(`${Doctor_URL}${id}`, config);
    return response.data;
};


const doctorService = {
    createDoctor,
    getDoctor,
    getDoctorByDni,
    getDoctorBySpecialty,
    updateDoctor,
    deleteDoctor
};

export default doctorService;
