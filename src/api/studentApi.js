import axiosClient from './axiosClient';
const studentApi = {

    create(params) {
        const url = 'api/student';
        return axiosClient.post(url, params );
    },
    checkLogin(params) {
        const url = 'api/login';
        return axiosClient.post(url, params );
    },


};
export default studentApi;