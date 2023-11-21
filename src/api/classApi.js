import axiosClient from './axiosClient';
const classApi = {

    getAll(params) {
        const url = 'api/class';
        return axiosClient.post(url, params );
    },
    // editSchedule(params) {
    //     const url = 'api/editSchedules';
    //     return axiosClient.post(url, params );
    // },
    // add(data) {
    //     const url = 'api/createCourse';
    //     return axiosClient.post(url, data);
    // },
    get(id) {
        const url = `api/classId/${id}`;
        return axiosClient.get(url);
    },
    getIdStudent(id) {

        const url = `api/getIdClassStudent/${id}`;
        return axiosClient.get(url);
    },
    // updateEdu(data) {
    //     const url = '/editEdu';
    //     return axiosClient.post(url, data);
    //     // return axiosClient.patch(url, data);
    // },
    
    // updateRoleStatus(data) {
    //     const url = '/editRoleStatus';
    //     return axiosClient.post(url, data);
    //     // return axiosClient.patch(url, data);
    // },
    // remove(id) {
    //     const url = '/deleteRole';
    //     return axiosClient.post(url, id)
    // }
};
export default classApi;