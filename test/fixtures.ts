import { ObjectId } from 'mongodb';

export const logisticProviders = [
  {
    _id: '62ef936100b468b1a4cace94' as any as ObjectId,
    name: 'Retransport',
    supportedStreams: [3],
    supportedContainers: [4, 5, 6, 7],
    area: [1500, 2000],
    pickUpSlots: [
      {
        day: 'monday',
        hours: ['10:00', '12:00'],
      },
      {
        day: 'tuesday',
        hours: ['18:00', '20:00'],
      },
    ],
    _created: '2022-04-05T14:51:53.104Z',
    _modified: '2022-04-05T14:51:53.104Z',
  },
  {
    _id: '62ef936100b468b1a4cace95' as any as ObjectId,
    name: 'GreenCollect',
    supportedStreams: [4, 5],
    supportedContainers: [1, 2, 3],
    area: [1000, 1099],
    pickUpSlots: [
      {
        day: 'monday',
        hours: ['10:00', '12:00'],
      },
      {
        day: 'tuesday',
        hours: ['18:00', '20:00'],
      },
      {
        day: 'friday-2nd',
        hours: ['10:00', '12:00'],
      },
    ],
    _created: '2022-04-05T14:51:53.104Z',
    _modified: '2022-04-05T14:51:53.104Z',
  },
];

export const customers = [
  {
    _id: '62ef91f8dbc82f069efef0e6' as any as ObjectId,
    name: 'John Doe',
    email: 'john.doe@example.com',
    locality: 'Amsterdam',
    postalCode: '1012',
    _created: '2022-04-05T14:51:53.104Z',
    _modified: '2022-04-05T14:51:53.104Z',
  },
  {
    _id: '62ef91f8dbc82f069efef0e7' as any as ObjectId,
    name: 'Alice Rossi',
    email: 'alice.rossi@example.com',
    locality: 'Zaandam',
    postalCode: '1500',
    _created: '2022-04-05T14:51:53.104Z',
    _modified: '2022-04-05T14:51:53.104Z',
  },
];

export const streams = [
  {
    _id: '62ef8929f7aab9730f93af68' as any as ObjectId,
    type: 'restafval',
    streamProductId: 3,
    image: 'https://d39t4x71zbx2q8.cloudfront.net/streams/v2/RESTAFVAL.png',
    detailsURL: 'https://seenons.com/restafval/',
    textColor: '#ffffff',
    backgroundColor: '#625F63',
    name: {
      'en-gb': 'Residual Waste',
      'nl-nl': 'Restafval',
      'de-de': 'Restmüll',
      'fr-fr': 'Déchets résiduels',
    },
    description: {
      'en-gb': 'Residual Waste',
      'nl-nl': 'Restafval - alle afval die je niet kunt scheiden',
      'de-de': 'Restmüll',
      'fr-fr': 'Déchets résiduels',
    },
    sizes: [
      {
        id: 127,
        size: 60,
        image: 'https://d39t4x71zbx2q8.cloudfront.net/containers/v2/RESIDUAL-WASTE-BAG.png',
        sizeDisplay: 'Vuilniszak',
        containerProductId: 2,
        discountPercentage: 0,
        unitPricePickup: 0,
        unitPriceRent: 0,
        unitPricePlacement: 0,
      },
      {
        id: 22,
        size: 240,
        image: 'https://d39t4x71zbx2q8.cloudfront.net/containers/Seenons-Restafval-240.png',
        sizeDisplay: '240L',
        containerProductId: 4,
        discountPercentage: 0,
        unitPricePickup: 14.75,
        unitPriceRent: 3.5,
        unitPricePlacement: 50,
      },
    ],
    _active: true,
    _created: '2022-04-05T14:51:53.104Z',
    _modified: '2022-04-05T14:51:53.104Z',
  },
  {
    _id: '62ef8929f7aab9730f93af69' as any as ObjectId,
    type: 'papier-karton',
    streamProductId: 4,
    image: 'https://d39t4x71zbx2q8.cloudfront.net/streams/v2/PAPIER-KARTON.png',
    detailsURL: 'https://seenons.com/papier-karton/',
    textColor: '#ffffff',
    backgroundColor: '#2F71D4',
    name: {
      'en-gb': 'Paper / Cardboard',
      'nl-nl': 'Papier / Karton',
      'de-de': 'Papier / Karton',
      'fr-fr': 'Papier / Carton',
    },
    description: {
      'en-gb': 'Papier / Cardboard',
      'nl-nl': 'Papier en karton (schoon)',
      'de-de': 'Papier / Karton',
      'fr-fr': 'Papier / Carton',
    },
    sizes: [
      {
        id: 8,
        size: 30,
        image: 'https://d39t4x71zbx2q8.cloudfront.net/containers/Seenons-PapierKarton-Bundle.png',
        sizeDisplay: '800 x 600 x 800 mm',
        containerProductId: null,
        discountPercentage: 0,
        unitPricePickup: 3.5,
        unitPriceRent: null,
        unitPricePlacement: null,
      },
      {
        id: 9,
        size: 240,
        image: 'https://d39t4x71zbx2q8.cloudfront.net/containers/Seenons-PapierKarton-240.png',
        sizeDisplay: '240L',
        containerProductId: 4,
        discountPercentage: 0,
        unitPricePickup: 11.5,
        unitPriceRent: 3.5,
        unitPricePlacement: 50,
      },
    ],
    _active: true,
    _created: '2022-04-05T14:51:53.104Z',
    _modified: '2022-04-05T14:51:53.104Z',
  },
  {
    _id: '62ef8d42afe2ea9404b4db72' as any as ObjectId,
    type: 'glass',
    streamProductId: 5,
    image: 'https://d39t4x71zbx2q8.cloudfront.net/streams/v2/GLAS.png',
    detailsURL: 'https://seenons.com/glas/',
    textColor: '#000000',
    backgroundColor: '#F0E303',
    name: {
      'en-gb': 'Glass',
      'nl-nl': 'Glas',
      'de-de': 'Glas',
      'fr-fr': 'Verre',
    },
    description: {
      'en-gb': 'Glass',
      'nl-nl': 'Glas - alle soorten flessen en glazen. Geen porselein.',
      'de-de': 'Glas',
      'fr-fr': 'Verre',
    },
    sizes: [
      {
        id: 125,
        size: 20,
        image: 'https://d39t4x71zbx2q8.cloudfront.net/containers/v2/GLASS-BAG.png',
        sizeDisplay: 'Glastas',
        containerProductId: 60,
        discountPercentage: 0,
        unitPricePickup: 0,
        unitPriceRent: 0,
        unitPricePlacement: 0,
      },
      {
        id: 7,
        size: 240,
        image: 'https://d39t4x71zbx2q8.cloudfront.net/containers/Seenons-Glas-240.png',
        sizeDisplay: '240L',
        containerProductId: 4,
        discountPercentage: 0,
        unitPricePickup: 16,
        unitPriceRent: 3.5,
        unitPricePlacement: 50,
      },
    ],
    _active: true,
    _created: '2022-04-05T14:51:53.104Z',
    _modified: '2022-04-05T14:51:53.104Z',
  },
];

export const streamsWithPickups = [
  {
    ...streams[0],
    pickUpSlots: [
      {
        logisticProviderId:logisticProviders[0]._id,
        logisticProvider: logisticProviders[0].name,
        area: logisticProviders[0].area,
        ...logisticProviders[0].pickUpSlots[0],
      },
      {
        logisticProviderId: logisticProviders[0]._id,
        logisticProvider: logisticProviders[0].name,
        area: logisticProviders[0].area,
        ...logisticProviders[0].pickUpSlots[1],
      },
    ],
  },
  {
    ...streams[1],
    pickUpSlots: [
      {
        logisticProviderId:logisticProviders[1]._id,
        logisticProvider: logisticProviders[1].name,
        area: logisticProviders[1].area,
        ...logisticProviders[1].pickUpSlots[0],
      },
      {
        logisticProviderId: logisticProviders[1]._id,
        logisticProvider: logisticProviders[1].name,
        area: logisticProviders[1].area,
        ...logisticProviders[1].pickUpSlots[1],
      },
      {
        logisticProviderId: logisticProviders[1]._id,
        logisticProvider: logisticProviders[1].name,
        area: logisticProviders[1].area,
        ...logisticProviders[1].pickUpSlots[2],
      },
    ],
  },
  {
    ...streams[2],
    pickUpSlots: [
      {
        logisticProviderId:logisticProviders[1]._id,
        logisticProvider: logisticProviders[1].name,
        area: logisticProviders[1].area,
        ...logisticProviders[1].pickUpSlots[0],
      },
      {
        logisticProviderId: logisticProviders[1]._id,
        logisticProvider: logisticProviders[1].name,
        area: logisticProviders[1].area,
        ...logisticProviders[1].pickUpSlots[1],
      },
      {
        logisticProviderId: logisticProviders[1]._id,
        logisticProvider: logisticProviders[1].name,
        area: logisticProviders[1].area,
        ...logisticProviders[1].pickUpSlots[2],
      },
    ],
  },
];
