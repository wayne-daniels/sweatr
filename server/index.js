require('dotenv/config');
const express = require('express');

const db = require('./database');
const ClientError = require('./client-error');
const staticMiddleware = require('./static-middleware');
const sessionMiddleware = require('./session-middleware');

const app = express();

app.use(staticMiddleware);
app.use(sessionMiddleware);

app.use(express.json());

app.get('/api/login/:userId', (req, res, next) => {
  const { userId } = req.params;
  if (!userId) return res.status(400).json({ error: 'missing userId' });

  const text = `
    select *
    from   "users"
    where  "userId" = $1;
  `;
  const values = [userId];

  db.query(text, values)
    .then(data => {
      if (!data.rows.length) return res.status(404).json({ error: `userId ${userId} does not exist` });
      req.session.userInfo = data.rows[0];
      res.json(data.rows[0]);
    })
    .catch(err => next(err));
});

app.post('/api/users', (req, res, next) => {
  const guestUser = `
    insert into "users" ("distanceRadius")
    values ($1)
    returning *
  `;
  const guestUsersValue = [10];

  db.query(guestUser, guestUsersValue)
    .then(result => {
      const [guestUserInfo] = result.rows;
      req.session.userInfo = guestUserInfo;
      return res.status(201).json(guestUserInfo);
    })
    .catch(err => next(err));
});

app.get('/api/users', (req, res, next) => {
  const sql = `
  select *
  from "users"
  where not "userName" = 'Guest';
  `;
  db.query(sql)
    .then(result => {
      const users = result.rows;
      if (!result) {
        return res.status(404).json({ error: 'Cannot be found' });
      }
      res.status(200).json(users);
    })
    .catch(err => next(err));
});

app.patch('/api/guest/', (req, res, next) => {
  const sqlUpdate = `
    update "users"
    set "distanceRadius" = 15
    where "userName" = 'Guest'
    returning *;
  `;
  db.query(sqlUpdate)
    .then(data => {
      if (!data.rows.length) return res.status(404).json({ error: "userName 'Guest' does not exist" });
    })
    .catch(err => next(err));

  const sqlGet = `
    select *
    from "users"
    where "userName" = 'Guest';
  `;
  db.query(sqlGet)
    .then(data => {
      if (!data.rows.length) return res.status(404).json({ error: "userName 'Guest' does not exist" });
      req.session.userInfo = data.rows[0];

    })
    .catch(err => next(err));
});

app.get('/api/health-check', (req, res, next) => {
  db.query('select \'successfully connected\' as "message"')
    .then(result => res.json(result.rows[0]))
    .catch(err => next(err));
});

app.use('/api', (req, res, next) => {
  next(new ClientError(`cannot ${req.method} ${req.originalUrl}`, 404));
});

app.use((err, req, res, next) => {
  if (err instanceof ClientError) {
    res.status(err.status).json({ error: err.message });
  } else {
    console.error(err);
    res.status(500).json({
      error: 'an unexpected error occurred'
    });
  }
});

app.listen(process.env.PORT, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on port', process.env.PORT);
});
