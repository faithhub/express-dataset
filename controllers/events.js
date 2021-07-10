const db = require("../database/index");
const queries = require("../database/queries")

var getAllEvents = (req, res) => {

};

var addEvent = async(req, res) => {
    const {
        repo,
        actor,
        ...event
    } = req.body;
    //     db.run(`
    //     CREATE TABLE IF NOT EXISTS events (
    //       id INTEGER PRIMARY KEY UNIQUE,
    //       type TEXT NOT NULL,
    //       repo_id INTEGER,
    //       actor_id INTEGER,
    //       created_at TEXT NOT NULL,
    //       FOREIGN KEY (repo_id) REFERENCES repos (repo_id),
    //       FOREIGN KEY (actor_id) REFERENCES actors (actor_id)
    //     )
    //   `);

    //     db.run(`
    //     CREATE TABLE IF NOT EXISTS actors (
    //       id INTEGER PRIMARY KEY,
    //       login TEXT NOT NULL,
    //       avatar_url TEXT NOT NULL
    //     )
    //   `);
    db.run(`
        CREATE TABLE IF NOT EXISTS repos (
          id INTEGER PRIMARY KEY,
          name TEXT NOT NULL,
          url TEXT NOT NULL
        )
      `);

    try {
        // db.all(`SELECT * FROM repos`, (err, data) => {
        //     if (err) {} else {
        //         console.log(data)
        //         res.status(201).json({
        //             message: data
        //         });
        //     }
        // })

        db.all(queries.countEventsData, event.id, (err, result) => {
            if (!err && result[0]['COUNT()'] < 1) {
                db.all(queries.countActorData, actor.id, (err, resultActor) => {
                    if (!err && resultActor[0]['COUNT()'] < 1) {
                        db.all(queries.countRepoData, repo.id, (err, resultRepo) => {
                            if (!err && resultRepo[0]['COUNT()'] < 1) {
                                console.log(resultRepo[0]['COUNT()'])
                                    // db.run(
                                    //     queries.createEventQuery,
                                    //     Object.values({
                                    //         repo_id: repo.id,
                                    //         actor_id: actor.id,
                                    //         id: event,
                                    //         ...event,
                                    //     })
                                    // );
                                    // db.run(
                                    //     queries.createActorQuery,
                                    //     Object.values({
                                    //         id: actor.id,
                                    //         login: actor.login,
                                    //         avatar_url: actor.avatar_url,
                                    //     })
                                    // );
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
                                    message: "Actor ID already exist"
                                });
                            }
                        });
                    } else {
                        res.status(400).json({
                            message: "Actor ID already exist"
                        });
                    }
                });
            } else {
                res.status(400).json({
                    message: "Events ID already exist"
                });
            }
        });

    } catch (error) {

    }

};


var getByActor = () => {

};


var eraseEvents = () => {

};

module.exports = {
    getAllEvents: getAllEvents,
    addEvent: addEvent,
    getByActor: getByActor,
    eraseEvents: eraseEvents
};