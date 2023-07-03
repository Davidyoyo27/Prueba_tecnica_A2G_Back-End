const axios = require('axios');

const get = async (url, token) => {
    console.log(url);
    try {
        const axiosConfig = {
            baseURL: 'https://devtest.a2g.io',
            url,

            headers: {
                Authorization: `Bearer ${token}`,
            },

            method: "get",
        };

        const { data } = await axios.request(axiosConfig);
        return data;
    } catch (err) {
        return { ok: false, error: err.message };
    }
}

const post = async (url, token, body) => {
    try {
        const axiosConfig = {
            baseURL: 'https://devtest.a2g.io',
            url,
            data: body,

            headers: {
                Authorization: `Bearer ${token}`,
            },

            method: "post",
        };

        const { data } = await axios.request(axiosConfig);
        return data;
    } catch (err) {
        return { ok: false, error: err.message };
    }
}

module.exports = { get, post }