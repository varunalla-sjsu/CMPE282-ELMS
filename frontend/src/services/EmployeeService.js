import axiosClient from "./axios"
import useAuth from './../helpers/useAuth'
export function getLoansByEmpId(page){
    return new Promise((resolve, reject) => {
        let user = useAuth();
        axiosClient.get(`/api/loans/by/empId?page=${page}&pageSize=20`, {headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}

export function getEmployeeProfile(){
    return new Promise((resolve, reject) => {
       let user= useAuth();
        axiosClient.get(`api/employee/profile`,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}

export function getEmployeeActiveLoan(page){
    return new Promise((resolve, reject) => {
        let user = useAuth();
        axiosClient.get(`/api/loans/all/active?page=${page}&pageSize=20`, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        }).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}

export function createEmployeeLoan(payload){

    return new Promise((resolve, reject) => {
        let user = useAuth();

        axiosClient.post(`/api/loans`, payload, {
            headers: {
                'Authorization': `Bearer ${user.token}`
            },
        }).then((res) => {
            resolve(res);
        }).catch((err) => reject(err));
    })
}