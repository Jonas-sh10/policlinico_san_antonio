import axios from 'axios';

const User_URL = `http://localhost:5000/api/v1/users/`;

const register = async (userData) => {
    const response = await axios.post(User_URL + 'register', userData);
    return response.data;
};

const login = async (userData) => {
    const response = await axios.post(User_URL + 'login', userData);
    if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem('user');
};

const authService = {
    register,
    login,
    logout
};

export default authService;
