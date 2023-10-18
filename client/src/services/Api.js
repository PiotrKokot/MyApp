/**
 * @author Piotr Kokot
 * When axios is needed
 * */
import axios from 'axios'
const serverUrl = "http://localhost:8081"

export default (method,url,credentials) => {
    if(method == 'post') {
      return axios.post(`${serverUrl}/${url}`,credentials)
    }

    if(method == 'delete') {
      return axios.delete(`${serverUrl}/${url}`)
    }

    return axios.get(`${serverUrl}/${url}`,credentials="")
}

//return Api(url,credentials)