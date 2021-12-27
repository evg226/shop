import {$host} from "./index";

// export const signup= async (email,password) =>{
//     const responce= await $host.post("api/user/signup",{email,password,role:"ADMIN"});
//     localStorage.setItem("token",responce.data.token);
//     return  jwt_decode(responce.data.token);
// };

export const signin = async (data) =>{
    const response= await $host.post("api/user/signin.php", data);
    return response.data;
};

export const signout = async () =>{
    const response= await $host.post("api/user/signout.php");
    return response.data;
};

// export const check= async () =>{
//     const responce = await $authHost.get("api/user/auth");
//     localStorage.setItem('token', responce.data.token);
//     return jwt_decode(responce.data.token);
// };

