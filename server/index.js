require('dotenv/config');
const express = require('express');
const { getGymDetails } = require('./gyms');
const { searchAllGyms } = require('./gyms');

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

app.get('/api/view/:yelpId', (req, res, next) => {
  const { yelpId } = req.params;
  getGymDetails(yelpId)
    .then(newObj => {
      const yelpId = newObj.id;
      const photosUrl = JSON.stringify(newObj.photos || []);
      const hours = JSON.stringify(newObj.hours || [{ open: [] }]);
      const reviews = JSON.stringify(newObj.reviews || []);
      const rating = newObj.rating;

      const sql = `
      update "gyms"
      set
      "photosUrl" = $2,
      "hours" = $3,
      "reviews" = $4,
      "rating" = $5
      where "yelpId" = $1;
      `;
      const gymRow = [yelpId, photosUrl, hours, reviews, rating];

      db.query(sql, gymRow)
        .then(result => {
          const sql = `
        select *
        from "gyms"
        where "yelpId" = $1;
        `;
          const value = [yelpId];
          return db.query(sql, value)
            .then(wholeRow => {
              const row = wholeRow.rows[0];
              res.status(200).json(row);
            });
        })
        .catch(err => next(err));
    });
});

app.post('/api/search/', (req, res, next) => {
  const latitude = req.body.latitude;
  const longitude = req.body.longitude;
  const location = (req.body.location || null);
  const term = req.body.term;
  const radius = req.body.radius * 1609;

  searchAllGyms(latitude, longitude, term, location, radius)

    .then(allGyms => {
      const insertPromises = [];
      for (let i = 0; i < allGyms.length; i++) {

        const gym = allGyms[i];
        const yelpId = gym.id;
        const gymName = (gym.name || '');
        const yelpUrl = gym.url;
        const storeImageUrl = gym.image_url;
        const distance = gym.distance;
        const photosUrl = [];
        const hours = [];
        const location = gym.location;
        const categories = gym.categories;
        const coordinates = gym.coordinates;
        const reviews = [];
        const price = (gym.price || '');
        const rating = gym.rating;

        const sql = `
      insert into  "gyms" ("yelpId", "gymName", "yelpUrl", "storeImageUrl", "distance", "photosUrl", "hours", "location", "categories", "coordinates", "reviews", "price", "rating")
        values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)
      on conflict("yelpId")
      do nothing
      `;
        const val = [yelpId, gymName, yelpUrl, storeImageUrl, distance, JSON.stringify(photosUrl), JSON.stringify(hours), JSON.stringify(location),
          JSON.stringify(categories), JSON.stringify(coordinates), JSON.stringify(reviews), price, rating];

        const gymPromise = db.query(sql, val)
          .then(() => {
            return { yelpId, gymName, yelpUrl, storeImageUrl, distance, photosUrl, hours, location, categories, coordinates, reviews, price, rating };
          });
        insertPromises.push(gymPromise);
      }

      return Promise.all(insertPromises);
    })
    .then(gyms => res.status(200).json(gyms))
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
