# Waste Streams APIs
[![Build](https://github.com/gabrieledarrigo/waste-streams/actions/workflows/build.yml/badge.svg)](https://github.com/gabrieledarrigo/waste-streams/actions/workflows/build.yml)

## Running the application

Waste Streams APIs use a dockerized instance of MongoDB for its persistence layer.
To run Waste Streams APIs first, install all application dependencies:  

```bash
$ npm install
```

Then, run the Docker container for MongoDB:

```bash
$ docker compose up
```

Finally, run one of the following commands to lunch the application:  

```bash
# dDevelopment
$ npm run start

# Watch mode
$ npm run start:dev

# Production mode
$ npm run start:prod
```

## Test

To run the application's unit tests, run the following command:

```bash
$ npm run test
```

To run the application's e2e tests, run the following command:

```bash
$ npm run test:e2e
```

## Resources

Waste Streams APIs exposes three types of resources: `Stream`, `StreamWithPickUps`, `LogisticProvider`, and `Customer`.

### GET /stream

Returns all the available waste `Streams`.

```json
GET / streams

[
  {
    "_id": "62efbcd0e5b3d7ed906afda3",
    "type": "pmd",
    "streamProductId": 1,
    "image": "https://d39t4x71zbx2q8.cloudfront.net/streams/v2/PMD.png",
    "detailsURL": "https://seenons.com/pmd/",
    "_active": true,
    "_created": "2020-07-30T09:28:31.364Z",
    "_modified": "2022-07-22T13:56:38.803Z",
    "textColor": "#ffffff",
    "backgroundColor": "#FD5A03",
    "name": {
      "en-gb": "PMD",
      "nl-nl": "PMD",
      "de-de": "Verpackungen",
      "fr-fr": "PMD"
    },
    "description": {
      "en-gb": "Plastic, metal, drink cartons",
      "nl-nl": "Plastic verpakkingen, blik en drinkpakken",
      "de-de": "Verpackungen",
      "fr-fr": "PMD"
    },
    "sizes": [{
      "id": 1,
      "size": 60,
      "image": "https://d39t4x71zbx2q8.cloudfront.net/containers/Seenons-PMD-Zak.png",
      "sizeDisplay": "10 x 60L",
      "containerProductId": 12,
      "discountPercentage": 0,
      "unitPricePickup": 3.75,
      "unitPriceRent": null,
      "unitPricePlacement": 2.5
    }
    }]
  },
  ...
]
```

### GET /strems/pickups

It returns a list of all the waste streams available for pickups (`StreamWithPickUps`).  
Every `Stream` reports an array of pickup slots, each one reporting:

- The LogisticProvider responsible for the pickup
- The area eligible for the pickup
- The day of the pickup
- The time range for the pickup

```json
GET /streams/pickups

[
  {
    "_id": "62efbcd0e5b3d7ed906afda4",
    "type": "restafval",
    "streamProductId": 3,
    "image": "https://d39t4x71zbx2q8.cloudfront.net/streams/v2/RESTAFVAL.png",
    "detailsURL": "https://seenons.com/restafval/",
    "textColor": "#ffffff",
    "backgroundColor": "#625F63",
    "name": {
      "en-gb": "Residual Waste",
      "nl-nl": "Restafval",
      "de-de": "Restmüll",
      "fr-fr": "Déchets résiduels"
    },
    "description": {
      "en-gb": "Residual Waste",
      "nl-nl": "Restafval - alle afval die je niet kunt scheiden",
      "de-de": "Restmüll",
      "fr-fr": "Déchets résiduels"
    },
    "sizes": [{
      "id": 127,
      "size": 60,
      "image": "https://d39t4x71zbx2q8.cloudfront.net/containers/v2/RESIDUAL-WASTE-BAG.png",
      "sizeDisplay": "Vuilniszak",
      "containerProductId": 2,
      "discountPercentage": 0,
      "unitPricePickup": 0,
      "unitPriceRent": 0,
      "unitPricePlacement": 0
    }],
    "pickUpSlots": [{
      "logisticProviderId": "62efbcd0e5b3d7ed906afddf",
      "logisticProvider": "Retransport",
      "area": [1500, 2000],
      "day": "monday",
      "hours": ["10:00", "12:00"]
    }, {
      "logisticProviderId": "62efbcd0e5b3d7ed906afddf",
      "logisticProvider": "Retransport",
      "area": [1500, 2000],
      "day": "tuesday",
      "hours": ["18:00", "20:00"]
    }, {
      "logisticProviderId": "62efbcd0e5b3d7ed906afddf",
      "logisticProvider": "Retransport",
      "area": [1500, 2000],
      "day": "thursday",
      "hours": ["14:00", "16:00"]
    }, {
      "logisticProviderId": "62efbcd0e5b3d7ed906afddf",
      "logisticProvider": "Retransport",
      "area": [1500, 2000],
      "day": "friday",
      "hours": ["10:00", "12:00"]
    }],
    "_active": true,
    "_created": "2020-07-30T09:28:32.282Z",
    "_modified": "2022-07-22T13:56:39.974Z"
  },
  ...
]
```

A client can ask only waste `Streams` available for pickup only within a specific `postalcode` (only Dutch postal codes in the range 1000-9999 are allowed):  

```
GET /streams/pickups?postalcode=1000
```

Or for specific `weekdays`:

```
GET /streams/pickups?weekdays[]=monday
```

Weekdays can be expressed in the human form (monday, tuesday, wednesday, etc.) or by specifying an ordinal suffix: `-1st`, `-2nd`, `-3rd`, `-4th`.
For example: `friday-2nd` means: *every second Friday of the month*.

### GET /logistic-providers

It returns a list of all `LogisticProvider` responsible for picking up a set of waste Streams.
Each LogisticProvider reports:

- The ids of the supported waste `Streams`
- The days and hours of the pickup

```json
GET /logistic-providers

[
  {
    "_id": "62efbcd0e5b3d7ed906afddf",
    "name": "Retransport",
    "supportedStreams": [2, 3],
    "supportedContainers": [4, 5, 6, 7],
    "area": [1500, 2000],
    "pickUpSlots": [{
      "day": "monday",
      "hours": ["10:00", "12:00"]
    }, {
      "day": "tuesday",
      "hours": ["18:00", "20:00"]
    }, {
      "day": "thursday",
      "hours": ["14:00", "16:00"]
    }, {
      "day": "friday",
      "hours": ["10:00", "12:00"]
    }],
    "_created": "2022-08-07T13:23:28.713Z",
    "_modified": "2022-08-07T13:23:28.713Z"
  }
]

```

### GET /customers

It returns a list of all application's Customers.

```json
GET /customers

[
  {
    "_id": "62efbcd0e5b3d7ed906afddb",
    "name": "John Doe",
    "email": "john.doe@example.com",
    "locality": "Amsterdam",
    "postalCode": "1012",
    "_created": "2022-08-07T13:23:28.673Z",
    "_modified": "2022-08-07T13:23:28.673Z"
  },
  ...
]
```