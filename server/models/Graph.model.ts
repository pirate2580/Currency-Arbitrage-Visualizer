import mongoose from 'mongoose';

const graphSchema = new mongoose.Schema({
  baseCurrency: { 
    type: String, 
    required: true,
    unique: true 
  },
  exchangeRates: {
    type: Map, of: Number, 
    required: true 
  },
  timestamp: {
    type: Date, 
    default: Date.now 
 }
})

// Create a model from the schema
const Graph = mongoose.model('Currency', graphSchema);

export {Graph}