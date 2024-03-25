import axios from 'axios';


export const getlist = async () => {
    const endpoint = 'https://app.mhc.asia/test/photos.json';
    const promise = await axios.get(endpoint);

    console.log('DATA: ', promise)
}