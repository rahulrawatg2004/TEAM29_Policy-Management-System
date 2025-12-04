require('dotenv').config();
const connectDB = require('../src/config/db');
const User = require('../src/models/User.model');
const Product = require('../src/models/Product.model');

async function seed() {
  await connectDB();
  try {
    await User.deleteMany({});
    await Product.deleteMany({});

    const u1 = await User.create({ name: 'Alice', email: 'alice@example.com', password: 'password', role: 'customer' });
    const u2 = await User.create({ name: 'Bob', email: 'bob@example.com', password: 'password', role: 'admin' });
    const u3 = await User.create({ name: 'Sam', email: 'sam@example.com', password: 'password', role: 'adjuster' });

    await Product.create({ name: 'Standard Car Plan', category: 'Vehicle', basePremium: 2000, terms: 'Standard vehicle terms' });
    await Product.create({ name: 'Basic Health Plan', category: 'Health', basePremium: 1500, terms: 'Basic health terms' });

    console.log('Seed completed');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
