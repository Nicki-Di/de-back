// const helperPromise = async function () {
//     return await function () {
//         const x = "geeksforgeeks";
//         const y = "geeksforgeelks";
//         if (x === y) {
//             return("Strings are same");
//         } else {
//             return("Strings are not same");
//         }
//     }
//     ;
// };
//
// helperPromise().then(y=>{
//     console.log(y())
// })

import {apiRoutes} from "../utils/const";
import axios from "axios";

async function getById() {

    return await axios.post(apiRoutes.baseURL + apiRoutes.getById, {
        id: localStorage.getItem("id")
    }, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        withCredentials: true
    })
        .then(function (response) {
            return response.data;
        })
        .catch(function (error) {
            console.log(error);
            return false;
        })
}