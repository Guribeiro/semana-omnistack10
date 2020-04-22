const Dev = require('../models/Dev');
const ApiRequests = require('./utils/ApiRequests');

module.exports = {

    async index(request, response) {
        const devs = await Dev.find();

        return response.json(devs)
    },

    async store(request, response) {

        const { nome, github_username, cep } = request.body;

        let dev = await Dev.findOne({ github_username });

        if (!dev) {

            const userData = await ApiRequests.githubApi(github_username)

            let { name, avatar_url, bio, repos_url } = userData.data

            if (!name) {
                name = nome;
            }

            if (!bio) {
                bio = ''
            }

            const reposData = await ApiRequests.githubRepositories(repos_url);
            let setReposData = new Set(reposData.data)

            var linguagens = []
            for (let index = 0; setReposData.size > index; index++) {

                let { language } = reposData.data[index];

                if (language) {
                    linguagens.push(language)
                }
            }

            const techs = [... new Set(linguagens)]

            const respAdress = await ApiRequests.viacepApi(cep);

            const { logradouro, bairro, localidade, uf } = respAdress.data;

            const respGeocoding = await ApiRequests.mapquestApi(localidade, uf);

            const { lat, lng } = respGeocoding.data['results'][0]['locations'][0]['latLng']

            const location = {
                type: 'Point',
                coordinates: [lng, lat]
            }

            dev = await Dev.create({
                name,
                github_username,
                bio,
                avatar_url,
                techs,
                cep,
                logradouro,
                bairro,
                localidade,
                uf,
                location
            })

        }
        return response.json(dev)
    }
};