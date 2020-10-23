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
        console.log("API get(url): ", decodeURI(url))
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
    logout: async function logout(url, tokens) {
        console.log("API logout(url, tokens): ", decodeURI(url), tokens)
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
    post: function postl(url, data) {
        console.log("api.post ", url, data);
    },
    patch: function patch(url, data) {
        console.log("api.patch ", url, data);
    },
    delete: function del(url, data) {
        console.log("api.delete ", url, data);
    }
}
