import axiosClient from "./axios";


export function login(payload){

    return new Promise((resolve, reject) => {
        axiosClient.post('/api/auth/login', payload).then((res) => {
            const data = {
                token: res.data.idToken.jwtToken,
                cognitousername: res.data.idToken.payload["cognito:username"],
                email: res.data.idToken.payload["email"],
                name: res.data.idToken.payload["name"],
                status: true
            };

            resolve(data);
        }).catch((err) => reject(err))
    })
}