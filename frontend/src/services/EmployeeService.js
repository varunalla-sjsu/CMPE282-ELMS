import axiosClient from "./axios"

export function getLoansByEmpId(page){
    return new Promise((resolve, reject) => {
        axiosClient.get(`/api/loans/by/empId?page=${page}&pageSize=20`).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}

export function getEmployeeProfile(){
    return new Promise((resolve, reject) => {
        axiosClient.get(`api/employee/profile`).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}

export function getEmployeeActiveLoan(){
    return new Promise((resolve, reject) => {
        axiosClient.get(`api/loans/active/emp/10002?page=1&pageSize=20`).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}