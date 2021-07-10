const db = require("../database/index");
const queries = require("../database/queries")

var getAllEvents = (req, res) => {

    db.all(queries.getAllEventsAscEventId, (err, data) => {
        if (err) {
            res.status(400).json({
                error: err.message
            })
        } else {
            var dataResultObject = data.map((r) => ({
                id: r.id,
                type: r.type,
                actor: {
                    id: r.actor_id,
                    login: r.login,
                    avatar_url: r.avatar_url,
                },
                repo: {
                    id: r.repo_id,
                    name: r.name,
                    url: r.url,
                },
                created_at: r.created_at,
            }));
            res.status(200).json(dataResultObject)
        }
    })
    try {} catch (error) {
        res.status(400).json({
            message: "An Error occur",
            error: error.message
        })
    }
};

var addEvent = async(req, res) => {
    const {
        repo,
        actor,
        ...event
    } = req.body;
    db.run(queries.createEventTable);
    db.run(queries.createActorTable);
    db.run(queries.createRepoTable);

    try {
        db.all(queries.countEventsData, event.id, (err, result) => {
            if (!err && result[0]['COUNT()'] < 1) {
                db.run(
                    queries.createEventQuery,
                    Object.values({
                        repo_id: repo.id,
                        actor_id: actor.id,
                        id: event,
                        ...event,
                    })
                );
                db.run(
                    queries.createActorQuery,
                    Object.values({
                        id: actor.id,
                        login: actor.login,
                        avatar_url: actor.avatar_url,
                    })
                );
                db.run(
                    queries.createRepoQuery,
                    Object.values({
                        id: repo.id,
                        name: repo.name,
                        url: repo.url,
                    })
                );

                res.status(201).json({
                    message: "Record Saved successfully"
                });
            } else {
                res.status(400).json({
                    message: "Events ID already exist"
                });
            }
        });

    } catch (error) {
        res.status(400).json({
            message: "An error occur"
        });

    }

};

var getByActor = (req, res) => {
    try {
        db.all(queries.getEventByActorId, req.params.actor_id, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: "An Error occur",
                    error: err.message
                })
            } else {
                if (data != '') {
                    const dataObject = data.map((r) => ({
                        id: r.id,
                        type: r.type,
                        actor: {
                            id: r.actor_id,
                            login: r.login,
                            avatar_url: r.avatar_url,
                        },
                        repo: {
                            id: r.repo_id,
                            name: r.name,
                            url: r.url,
                        },
                        created_at: r.created_at,
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

var eraseEvents = (req, res) => {
    try {
        db.all(queries.eraseAllEvents, (err, data) => {
            if (err) {
                res.status(400).json({
                    message: "An error Occur",
                    error: err.message
                })
            } else {
                res.status(200).json({
                    message: "Deleted",
                    data: data
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

module.exports = {
    getAllEvents: getAllEvents,
    addEvent: addEvent,
    getByActor: getByActor,
    eraseEvents: eraseEvents
};