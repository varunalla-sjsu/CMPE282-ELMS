import axiosClient from "./axios"
import useAuth from './../helpers/useAuth'

export function getLoanRequestsByDept(page){
    return new Promise((resolve, reject) => {
        let user= useAuth();
        axiosClient.get(`/api/loans/mydept/loans?page=${page}&pageSize=20`,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}

export function approveLoan(loanId){
    return new Promise((resolve, reject) => {
        let user= useAuth();
        axiosClient.put(`/api/loans/approve/${loanId}`,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}