const db = require("../database/index");
const queries = require("../database/queries")


var getAllActors = () => {
    db.each(queries.getAlCctorsByTotalEventsQuery, [], (err, data) => {
        if (err) {
            throw err;
        }
        console.log(data);
    });
};

var updateActor = () => {

};

var getStreak = () => {

};


module.exports = {
    updateActor: updateActor,
    getAllActors: getAllActors,
    getStreak: getStreak
};