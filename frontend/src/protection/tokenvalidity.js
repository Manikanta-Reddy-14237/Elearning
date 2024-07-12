import React from "react";
import { jwtDecode } from 'jwt-decode';

const CheckTokenValidity=()=>{
    const token = localStorage.getItem('authToken');

    if(!token){
        console.log("no token");
        return false;
    }

    const {exp,role} = jwtDecode(token);
    const currentTime = Math.floor(Date.now() / 1000);
    console.log('current time:',currentTime);
    console.log("expire time:",exp);
    console.log(exp > currentTime);
    return {isValid:exp > currentTime ,role:role};
};

export default CheckTokenValidity;