import axiosClient from "./axios"
import useAuth from './../helpers/useAuth'

export function getDeptEmployees(page)
{
    return new Promise((resolve, reject) => {
        let user= useAuth();
        axiosClient.get(`/api/departments/mydept/employees?page=${page}&pageSize=20`,{headers: {
            'Authorization': `Bearer ${user.token}`
        }}).then((res) => {
            resolve(res.data);
        }).catch((err) => reject(err));
    })
}
