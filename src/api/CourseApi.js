import axiosClient from './axiosClient';
const courseApi = {

    getAll(params) {
        const url = 'api/course';
        return axiosClient.post(url, params );
    },
    getAllSale(params) {
        const url = 'api/courseSale';
        return axiosClient.post(url, params );
    },
    add(data) {
        const url = 'api/createCourse';
        return axiosClient.post(url, data);
    },
    get(id) {
        const url = `api/courseId/${id}`;
        return axiosClient.get(url);
    },
    getIdCate(id) {
        const url = `api/courseIdCate/${id}`;
        return axiosClient.get(url);
    },
    
    
};
export default courseApi;