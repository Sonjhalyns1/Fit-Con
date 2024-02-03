import axios from 'axios'
import { rapidApiKey } from "../data/apiKey"

const baseUrl = "https://exercisedb.p.rapidapi.com"

const apiCall = async(url , params) => {

    try{
        const options = {
            method: 'GET',
            url,
            params: {limit: '20'},
            headers: {
              'X-RapidAPI-Key': rapidApiKey,
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
          };
          const response = await axios.request(options);
          return response.data;

    } catch (err){
        console.log("error", err.message)
    }
}

export const fetchExercisesById = async (Identifier) => {
    let data = await apiCall(baseUrl+ `/exercises/exercise/${Identifier}`)
    return data
}