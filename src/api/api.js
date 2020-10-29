import axios from 'axios';
import * as endpoint from './endpoints'

export const getCsrfToken = async () => {
    const csrf_token = await axios(endpoint.CSRF_TOKEN)
        .then(response => response.data)
        .catch((error) => {
            // console.log("API getCsrfToken() error: ", error)
            if (error.message === undefined) {
                error.message = "Connection Timeout"
            }
            throw new Error(error)
        });
    // console.log("getCsrfToken() token: ", csrf_token)
    return csrf_token
}

export const api = {
    get: async function get(url) {
        console.log("api.js > get > url: ", decodeURI(url))
        return axios.get(url, {
            headers: {
                "Content-Type": "application/hal+json",
                "X-CSRF-Token": await getCsrfToken(),
            },
            withCredentials: true,
            timeout: 5000,
        })
            .then(response => response)
            .catch(error => {
                throw new Error(
                    `${error.response.statusText} (${error.response.status})`
                );
            });
    },
    login: async function login(url, data) {

        const csrf_token = await getCsrfToken()

        if (csrf_token !== "Connection Error") {
            const options = {
                url: url,
                method: 'post',
                headers: {
                    "Content-Type": "application/hal+json",
                    "X-CSRF-Token": csrf_token,
                },
                withCredentials: true,
                timeout: 2000,
                data: JSON.stringify(data),
            }
            return axios(options)
                .then(response => response)
                .catch(error => {
                    throw new Error(`${error.response.statusText} (${error.response.status})`);
                });
        }
    },
    post: async function post(url, data) {

        const csrf_token = await getCsrfToken()

        const options = {
            url: url,
            method: 'post',
            headers: {
                "Content-Type": "application/vnd.api+json",
                "X-CSRF-Token": csrf_token,
            },
            withCredentials: true,
            timeout: 2000,
            data: JSON.stringify(data),
        }
        return axios(options)
            .then(response => response)
            .catch(error => {
                throw new Error("Conection time out");
            });
    },
    postFile: async function postFile(url, file, data) {

        const csrf_token = await getCsrfToken()

        const options = {
            url: url,
            method: 'post',
            headers: {
                "Accept": "application/vnd.api+json",
                "Content-Type": "application/octet-stream",
                "X-CSRF-Token": csrf_token,
                "Content-Disposition": "file; filename=\"" + file + "\"",
                // "Content-Encoding": "gzip"
                "Accept-Encoding": "gzip, deflate, br",
                "Accept-Language": "en-US,en;q=0.9",
                "Connection": "keep-alive",
                
            },
            withCredentials: true,
            timeout: 2000,
            data: data,
        }
        return axios(options)
            .then(response => response)
            .catch(error => {
                throw new Error("Conection time out");
            });
    },
    logout: async function logout(url, tokens) {
        console.log("api.js logout(url, tokens): ", decodeURI(url), tokens)
        const csrf_token = getCsrfToken()

        if (csrf_token !== "Connection Error") {
            const logout_token = tokens.logout_token
            const csrf_token = tokens.csrf_token
            const options = {
                url: url + "&token=" + logout_token + "&csrf_token=" + csrf_token,
                method: 'post',
                headers: {
                    "Content-Type": "application/hal+json",
                    "X-CSRF-Token": csrf_token,
                },
                withCredentials: true,
                timeout: 2000,
            }
            return axios(options).then(response => response)
                .catch(error => {
                    throw new Error("Conection time out");
                });

        }

    },
    patch: function patch(url, data) {
        console.log("api.patch ", url, data);
    },
    delete: function del(url, data) {
        console.log("api.delete ", url, data);
    }
}
