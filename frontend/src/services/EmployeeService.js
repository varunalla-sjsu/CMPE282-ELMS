import axiosClient from "./axios"
import useAuth from './../helpers/useAuth'
export function getLoansByEmpId(page){
    return new Promise((resolve, reject) => {
        axiosClient.get(`/api/loans/by/empId?page=${page}&pageSize=20`).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}

export function getEmployeeProfile(){
    return new Promise((resolve, reject) => {
       let user= useAuth();
       console.log('user ',user);
        axiosClient.get(`api/employee/profile`,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
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