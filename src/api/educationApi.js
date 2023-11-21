import axiosClient from './axiosClient';
const educationApi = {

    getAll(params) {
        const url = 'api/education';
        return axiosClient.post(url, { params });
    },
   
};
export default educationApi;