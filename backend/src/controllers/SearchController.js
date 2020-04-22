const Dev = require('../models/Dev')

module.exports = {

    async index(request, response) {

        const { latitude, longitude, techs } = request.query;

        const techsAsArray = techs.split(',').map(tech => tech.trim());

        const devs = await Dev.find({
            $and: [
                {
                    techs: {
                        $in: techsAsArray
                    }
                },
                {
                    location: {
                        $near: {    
                            $geometry: {
                                type: "Point",
                                coordinates: [longitude, latitude]
                            },

                            $maxDistance: 20000000,
                        },
                    },
                }
            ]
        });

        return response.json(devs)
    }
}