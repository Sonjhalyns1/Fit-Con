import axios from 'axios'
import { rapidApiKey } from '../constants'

const baseUrl = "https://exercisedb.p.rapidapi.com"

const apiCall = async(url , params) => {

    try{
        const options = {
            method: 'GET',
            url,
            params: {limit: '20'},
            headers: {
              'X-RapidAPI-Key': "b7803a6276mshe589fac8576fc43p18fdbdjsn553835400336",
              'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
            }
          };
          const response = await axios.request(options);
          return response.data;

    } catch (err){
        console.log("error", err.message)
    }
}

export const fetchExercisesByName = async (name) => {
    let data = await apiCall(baseUrl+ `/exercises/name/${name}`)
    return data
}