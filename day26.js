const { MongoClient } = require('mongodb');


async function getProductStatistics() {
  const url = 'mongodb://localhost:27017';

  const dbName = 'my_database';

  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    await client.connect();

    const db = client.db(dbName);

    const pipeline = [
      {
        $group: {
          _id: null,
          totalProducts: { $sum: 1 },
          averagePrice: { $avg: '$price' },
          highestQuantity: { $max: '$quantity' }
        }
      }
    ];

    const result = await db.collection('products').aggregate(pipeline).toArray();

    return result[0];
  } finally {
    await client.close();
  }
}

getProductStatistics()
  .then((statistics) => {
    console.log('Product Statistics:', statistics);
  })
  .catch((error) => {
    console.error('Error:', error);
  });
