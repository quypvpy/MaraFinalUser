import axiosClient from './axiosClient';
const courseCate = {

    // getAll(params) {
    //     const url = 'api/categories';
    //     return axiosClient.post(url, params );
    // },
    get(id) {
        const url = `api/courseCateId/${id}`;
        return axiosClient.get(url);
    },
};
export default courseCate;