import {$host, getFormData} from "./index";

export const fetchImagQuery=  async (productId) =>{
    const response = await $host.get("api/image/",{params:{productId}});
    return response.data;
};

export const deleteImageQuery= async(images)=>{
    const response=await $host.post("api/image/delete.php",getFormData(images));
    return response.data;
}

export const createImageQuery= async(image)=>{
    const response=await $host.post("api/image/create.php",getFormData(image));
    return response.data;
}
