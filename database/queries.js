const createEventTable = `
  CREATE TABLE IF NOT EXISTS events (
    id INTEGER PRIMARY KEY,
    type TEXT NOT NULL,
    repo_id INTEGER NOT NULL,
    actor_id INTEGER NOT NULL,
    created_at TEXT NOT NULL,
    FOREIGN KEY (repo_id) REFERENCES repos (repo_id),
    FOREIGN KEY (actor_id) REFERENCES actors (actor_id)
  )
`;

const createActorTable = `
  CREATE TABLE IF NOT EXISTS actors (
    id INTEGER KEY,
    login TEXT NOT NULL,
    avatar_url TEXT NOT NULL
  )
`;

const createRepoTable = `
  CREATE TABLE IF NOT EXISTS repos (
    id INTEGER KEY,
    name TEXT NOT NULL,
    url TEXT NOT NULL
  )
`;

const eraseAllActors = `DELETE FROM actors`;
const eraseAllRepo = `DELETE FROM repos`;
const eraseAllEvents = `DELETE FROM events`;

const getAllEventsAscEventId = `SELECT * FROM events INNER JOIN actors ON events.actor_id = actors.id INNER JOIN repos ON events.repo_id=repos.id ORDER BY id ASC`;

const getAllActors = `SELECT * FROM actors ORDER BY created_at ASC`;

const getEventByActorId = `SELECT * FROM events INNER JOIN actors ON events.actor_id=actors.id INNER JOIN repos ON events.repo_id=repos.id WHERE actor_id=? ORDER BY id ASC`;

const getStreakActors = `SELECT MAX(events.created_at) as date, actors.login, actors.id, actors.avatar_url FROM events INNER JOIN actors ON events.actor_id = actors.id GROUP BY actors.login ORDER BY date DESC
`;

const updateActorLoginField = `UPDATE actors SET avatar_url=COALESCE(?,avatar_url) WHERE id=?`;

const checkActId = `SELECT * FROM actors WHERE id = ?`;

const createRepoQuery = `
  INSERT INTO "repos"(id, name, url) 
  VALUES(?, ?, ?)
`;

const createActorQuery = `
  INSERT INTO "actors"(id, login, avatar_url) 
  VALUES(?, ?, ?)
`;

const createEventQuery = `
  INSERT INTO "events"(repo_id, actor_id, id, type, created_at) 
  VALUES(?, ?, ?, ?, ?);
`;

const countEventsData = `SELECT COUNT() FROM "events" WHERE id = ?`;

const countRepoData = `SELECT COUNT() FROM repos WHERE id = ?`;

const countActorData = `SELECT COUNT() FROM actors WHERE id = ?`;

const getAlCctorsByTotalEventsQuery = `
  SELECT *, (SELECT COUNT() FROM events WHERE actors.id = events.actor_id) as total_events FROM actors
  ORDER BY total_events DESC, actors.login
`;

module.exports = {
    createEventTable,
    eraseAllActors,
    eraseAllRepo,
    checkActId,
    getAllActors,
    countRepoData,
    createActorTable,
    countActorData,
    createRepoTable,
    countEventsData,
    eraseAllEvents,
    getAllEventsAscEventId,
    updateActorLoginField,
    getEventByActorId,
    getStreakActors,
    createRepoQuery,
    createActorQuery,
    createEventQuery,
    getAlCctorsByTotalEventsQuery,
};