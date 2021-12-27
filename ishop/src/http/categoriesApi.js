import {$host} from "./index";

export const fetchCategories = async () =>{
    const response= await $host.get("api/category/readfull.php" );
    return response.data;
};
