import axios from 'axios';

//axios instance creation for rest calls
const instance = axios.create({baseURL:`https://api.thecatapi.com/v1`,
    headers: {
    "x-api-key": "c1c2b4f3-e167-43f9-bf59-2c1ddf38130e",
  },});


export default instance;