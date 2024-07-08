import axios from 'axios';
import  cheerio  from 'cheerio';
import {Graph} from '../models/Graph.model';
import dotenv from 'dotenv';
dotenv.config();

interface CurrencyExchange {
  Name: string,
  Rate: number
}

const currencyController = {
    displayCurrencies: async (req, res) => {
      try{
        const graph = {};
        const currencies = await Graph.find({});
        // console.log('hrer');
        currencies.forEach(currency => {
          graph[currency.baseCurrency] = currency.exchangeRates;
        });
        // console.log(graph);
        res.status(200).json({data: graph})
      }
      catch(error){
        res.status(400).json({message:"Error"});
      }
    },
  getAllCurrencies: async (req, res) => {
    const currencies = [
      'AED', 'AFN', 'ALL', 'AMD', 'ANG', 'AOA', 'ARS', 'AUD', 'AWG', 'AZN', 'BAM', 'BBD', 'BDT', 'BGN', 'BHD', 'BIF', 'BMD',
      'BND', 'BOB', 'BOV', 'BRL', 'BSD', 'BTN', 'BWP', 'BYN', 'BZD', 'CAD', 'CDF', 'CHF', 'CLF', 'CLP', 'CNY', 'COP', 'CRC',
      'CUC', 'CUP', 'CVE', 'CZK', 'DJF', 'DKK', 'DOP', 'DZD', 'EGP', 'ERN', 'ETB', 'EUR', 'FJD', 'FKP', 'GBP', 'GEL', 'GHS',
      'GIP', 'GMD', 'GNF', 'GTQ', 'GYD', 'HKD', 'HNL', 'HRK', 'HTG', 'HUF', 'IDR', 'ILS', 'INR', 'IQD', 'IRR', 'ISK', 'JMD',
      'JOD', 'JPY', 'KES', 'KGS', 'KHR', 'KMF', 'KPW', 'KRW', 'KWD', 'KYD', 'KZT', 'LAK', 'LBP', 'LKR', 'LRD', 'LSL', 'LTL',
      'LVL', 'LYD', 'MAD', 'MDL', 'MGA', 'MKD', 'MMK', 'MNT', 'MOP', 'MRO', 'MUR', 'MVR', 'MWK', 'MXN', 'MYR', 'MZN', 'NAD',
      'NGN', 'NIO', 'NOK', 'NPR', 'NZD', 'OMR', 'PAB', 'PEN', 'PGK', 'PHP', 'PKR', 'PLN', 'PYG', 'QAR', 'RON', 'RSD', 'RUB',
      'RWF', 'SAR', 'SBD', 'SCR', 'SDG', 'SEK', 'SGD', 'SHP', 'SLL', 'SOS', 'SRD', 'SSP', 'STD', 'SVC', 'SYP', 'SZL', 'THB',
      'TJS', 'TMT', 'TND', 'TOP', 'TRY', 'TTD', 'TWD', 'TZS', 'UAH', 'UGX', 'USD', 'UYU', 'UZS', 'VEF', 'VND', 'VUV', 'WST',
      'XAF', 'XCD', 'XOF', 'XPF', 'YER', 'ZAR', 'ZMW', 'ZWL'
    ]
    for (let i = 0; i < currencies.length; i++){
      const currency1 = currencies[i];
      try{
        const url = `https://api.currencybeacon.com/v1/latest?api_key=${process.env.CURRENCYBEACON_API_KEY}&base=${currency1}`;
        const response = await fetch(url);
        const data = await response.json();
        const rates = data['rates'];

        const exchangeRates = {};
        for (let currency2 in rates){
          if (currency1 !== currency2 && currencies.includes(currency2)){
            // exchangeRates[currency1] = rates[currency2] / rates[currency1];
            exchangeRates[currency2] = rates[currency2];
          }
        }
        const newCurrency = new Graph({
          baseCurrency: currency1,
          exchangeRates: exchangeRates
        })
        newCurrency.save();
      }
      catch(error){
        res.status(404).json({message: "data not received"});
      }
    }
    res.status(200).json({message: 'Currencies saved successfully!'});
    // try{
      // const url = `https://api.currencybeacon.com/v1/latest?api_key=${process.env.CURRENCYBEACON_API_KEY}&base=USD`;
      // const response = await fetch(url);
      // const data = await response.json();
      // const rates = data['rates'];
      // console.log(rates);

      // const currencyPromises: Promise<any>[] = [];
      // for (let currency1 in rates){
      //   const exchangeRates = {};
      //   for (let currency2 in rates){
      //     if (currency1 !== currency2){
      //       // exchangeRates[currency1] = rates[currency2] / rates[currency1];
      //       exchangeRates[currency2] = rates[currency2] / rates[currency1];
      //     }
      //   }
      //   console.log(exchangeRates);
      //   const newCurrency = new Graph({
      //     baseCurrency: currency1,
      //     exchangeRates: exchangeRates
      //   })
      //   currencyPromises.push(newCurrency.save());
      // }
    //   await Promise.all(currencyPromises);
    //   res.status(200).json({message: 'Currencies saved successfully!'});
    // }
    // catch(error){
    //   res.status(404).json({message: "data not received"});
    // }
  },
  // getAllCurrencies: async (req, res) => {
  //   try{
  //     const url = 'https://www.x-rates.com/table/?from=CAD';
  //     const response = await axios.get(url);
  //     const html = response.data;
  //     const $ = cheerio.load(html);
  //     const currencies: CurrencyExchange[] = [];
  //     $('#content table.tablesorter tbody tr').each((index, element) => {
  //       const Name = $(element).find('td:nth-child(1)').text().trim();
  //       const Rate = $(element).find('td:nth-child(2)').text().trim();
  //       const currencyExchange: CurrencyExchange = {
  //         Name: Name,
  //         Rate: parseFloat(Rate)
  //       };
  //       currencies.push(currencyExchange);
  //     });
  //     // currencies.push({'Name': "CAD", 'Rate': 1.0});

  //     const currencyPromises: Promise<any>[] = [];
  //     for (let i = 0; i < currencies.length; i++){
  //       const exchangeRates = {};
  //       for (let j = 0; j < currencies.length; j++){
  //         if (i !== j){
  //           exchangeRates[currencies[j].Name] = currencies[j].Rate / currencies[i].Rate;
  //         }
  //       }
  //       const newCurrency = new Graph({
  //         baseCurrency: currencies[i].Name,
  //         exchangeRates: exchangeRates
  //       })
  //       currencyPromises.push(newCurrency.save());
  //     }
  //     await Promise.all(currencyPromises);
  //     res.status(200).json({message: 'Currencies saved successfully!'});
  //   }
  //   catch(error){
  //     res.status(404).json({message: `Currencies have failed to save ${error.message}`});
  //   }
  // },
  deleteAllCurrencies: async (req, res) => {
    try{
      await Graph.deleteMany({});
      res.status(200).send({message: "old currency data deleted successfully!"})
    }
    catch(error){
      res.status(404).json({message: `old currency failed to delete ${error.message}`})
    }
  },
}

export {currencyController}

/*
// Connecting to MongoDB
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/mydatabase', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});


// Defining a mongoose schema
const { Schema } = mongoose;

const userSchema = new Schema({
  username: String,
  email: String,
  age: Number,
});
const User = mongoose.model('User', userSchema);

// Inserting documents
const newUser = new User({
  username: 'john_doe',
  email: 'john@example.com',
  age: 30,
});

newUser.save()
  .then(() => console.log('User created'))
  .catch(err => console.error('Error creating user:', err));


// Finding Documents
User.find()
  .then(users => console.log(users))
  .catch(err => console.error('Error finding users:', err));

// Find users matching a query
User.find({ age: { $gte: 25 } })
  .then(users => console.log(users))
  .catch(err => console.error('Error finding users:', err));

// Updating documents
User.updateOne({ username: 'john_doe' }, { age: 31 })
  .then(() => console.log('User updated'))
  .catch(err => console.error('Error updating user:', err));

// updating multiple documents
User.updateMany({ age: { $gte: 30 } }, { $set: { status: 'active' } })
  .then(() => console.log('Users updated'))
  .catch(err => console.error('Error updating users:', err));


// deleting a single document
User.deleteOne({ username: 'john_doe' })
  .then(() => console.log('User deleted'))
  .catch(err => console.error('Error deleting user:', err));

// deleting multiple documents
User.deleteMany({ age: { $gte: 60 } })
  .then(() => console.log('Users deleted'))
  .catch(err => console.error('Error deleting users:', err));

// Aggregation
User.aggregate([
  { $group: { _id: '$age', count: { $sum: 1 } } }
])
.then(results => console.log(results))
.catch(err => console.error('Error aggregating users:', err));

// Transactions
// Start a session
const session = await mongoose.startSession();
session.startTransaction();

try {
  await User.create([{ username: 'user1' }, { username: 'user2' }], { session });

  // Additional operations

  // Commit transaction
  await session.commitTransaction();
} catch (error) {
  // Rollback transaction on error
  await session.abortTransaction();
  console.error('Transaction aborted:', error);
} finally {
  session.endSession();
}


/*
What is the difference between Object Document Mapping and Object Relational Mapping:

  An Object Document mapping is used in document-oriented databases like MongoDB
  and it maps object to documents in NoSQl Databases

  An Object Relational Mapping is used in relational databases like MySQL and PostgreSQL.
  It maps classes and objects to relational databases

  Example ODMs: Mongoose
  Example ORMS: SQLAlchemy
*/
