const RES = require('../config/resMessage');
const notFound = (req, res) => {
    res.status(404).send({ message: RES.ROUTE_DOES_NOT_EXIST });
};

module.exports = notFound;