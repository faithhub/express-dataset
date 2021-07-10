const db = require("../database/index");
const queries = require("../database/queries")


var getAllActors = (req, res) => {
    try {
        db.all(queries.getAlCctorsByTotalEventsQuery, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: "An Error occur",
                    error: err.message
                })
            } else {
                const dataResultObject = data.map((r) => ({
                    id: r.id,
                    login: r.login,
                    avatar_url: r.avatar_url,
                }));

                res.status(200).json({
                    message: "Data fetched",
                    data: dataResultObject
                })
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "An Error occur",
            error: error.message
        })
    }
};

var updateActor = (req, res) => {
    try {
        const actor_id = req.body.id;
        let params = [req.body.avatar_url, actor_id];
        db.all(queries.checkActId, actor_id, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: "An Error occur",
                    error: err.message
                })
            } else {
                console.log(data)
                if (data != '') {
                    db.all(queries.updateActorLoginField, params, (err, data) => {
                        if (err) {
                            res.status(400).json({
                                message: "An Error occur",
                                error: err.message
                            })
                        } else {
                            res.status(200).json({
                                message: "Data Updated",
                                data: data
                            })
                        }
                    });
                } else {
                    res.status(404).json({
                        message: "Data not found with the ID given",
                        data: data
                    })
                }
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "An Error occur",
            error: error.message
        })
    }

};

var getStreak = (req, res) => {
    try {
        db.all(queries.getStreakActors, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: "An Error occur",
                    error: err.message
                })
            } else {
                if (data.length > 0) {
                    const dataObject = data.map((r) => ({
                        id: r.id,
                        login: r.login,
                        avatar_url: r.avatar_url,
                    }));
                    res.status(200).json({
                        message: "Data fetched",
                        data: dataObject
                    })
                } else {
                    res.status(404).json({
                        message: "Data not found",
                        data: data
                    })
                }
            }
        })
    } catch (error) {
        res.status(400).json({
            message: "An Error occur",
            error: error.message
        })
    }
};

module.exports = {
    updateActor: updateActor,
    getAllActors: getAllActors,
    getStreak: getStreak
};