const fetch = require('node-fetch');
const apiKey = 'Bearer ' + process.env.REACT_APP_YELP_API_KEY;

function searchAllGyms(lat, long, term, location, radius) {
  return fetch((location
    ? `https://api.yelp.com/v3/businesses/search?location=${location}&term=gyms&radius=${radius}&limit=30`
    : `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${long}&radius=${radius}&term=gyms&limit=30`), {

    headers: {
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => {
      return data.businesses;
    });
}

const getGymDetails = function (yelpId) {

  return fetch(`https://api.yelp.com/v3/businesses/${yelpId}`, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(details => {
      return getReviews(yelpId)
        .then(reviews => {
          details.reviews = reviews;
          return details;
        });
    });
};

const getReviews = function (yelpId) {
  return fetch(`https://api.yelp.com/v3/businesses/${yelpId}/reviews`, {
    headers: {
      Authorization: apiKey
    }
  })
    .then(response => response.json())
    .then(data => { return data.reviews; }
    );
};

module.exports = { getGymDetails, searchAllGyms };
