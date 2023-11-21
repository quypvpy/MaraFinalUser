import axiosClient from './axiosClient';
const categories = {

    getAll(params) {
        const url = 'api/categories';
        return axiosClient.post(url, params );
    },
    get(id) {
        const url = `api/cateId/${id}`;
        return axiosClient.get(url);
    },
};
export default categories;