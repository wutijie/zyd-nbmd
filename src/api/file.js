import axios from 'axios'
import qs from 'qs'
export function buildDir(dirname){
    return axios.get("/ishave?dirname=" + dirname).then(res => res.data)
}