import axios from 'axios';

export default class RequestService {

    getRequests() : any {
        return axios.get('json/payload-rmp.json')
            .then((res) => res.data);
    }

    getBrands() : any {
        return axios.get('json/brands.json')
            .then((res) => res.data);
    }

    getMedias() : any {
        return axios.get('json/medias.json')
            .then((res) => res.data);
    }

}