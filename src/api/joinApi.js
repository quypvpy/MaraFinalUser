import axiosClient from './axiosClient';
const joinApi = {

    create(params) {
        const url = 'api/join';
        return axiosClient.post(url, params );
    },
    signupTrial(params) {
        const url = 'api/signupTrial';
        return axiosClient.post(url, params );
    },


};
export default joinApi;