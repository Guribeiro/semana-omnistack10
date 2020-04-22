const axios = require('axios');

module.exports = {
    async githubApi(username) {
        return await axios.get(`https://api.github.com/users/${username}`)
    },

    async githubRepositories(repos_url) {
        return await axios.get(repos_url);

    },

    async viacepApi(cep) {
        return await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    },
    async mapquestApi(localidade, uf) {
        return await axios.get(`http://open.mapquestapi.com/geocoding/v1/address?key=YLTwGitVXLrTp5YMpMRmhP9da4HA8sEU&location=${localidade},${uf}`)
    }
}