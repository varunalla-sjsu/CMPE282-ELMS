import axiosClient from "./axios"
import useAuth from './../helpers/useAuth'
export function getAllEmployees(page,pageSize){
    return new Promise((resolve, reject) => {
        let user= useAuth();
        console.log('user ',user);
        axiosClient.get(`/api/employee?page=${page}&pageSize=${pageSize}`,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}

export function getAllDepartments(page){
    return new Promise((resolve, reject) => {
        let user= useAuth();
        console.log('user ',user);
        axiosClient.get(`/api/departments?page=${page}&pageSize=20`,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}

export function getAllLoans(page){
    return new Promise((resolve, reject) => {
        let user= useAuth();
        console.log('user ',user);
        axiosClient.get(`/api/loans/orgloans?page=${page}&pageSize=20`,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}
export function preCloseLoan(id){
    return new Promise((resolve, reject) => {
        let user= useAuth();
        console.log('user ',user);
        axiosClient.put(` /api/loans/preclose/`+id,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res);
        }).catch((err) => reject(err))
    })
}