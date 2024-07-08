import mongoose from 'mongoose';

const arbitrageOpportunitySchema = new mongoose.Schema({
  cycle: {
    type: [String], 
    required: true
  },
  profit: {
    type: Number,
    required: true
  },
  profitRates: {
    type: [Number],
    required: true
  },
  timestamp: {
    type: Date, 
    default: Date.now 
 }
})

const ArbitrageOpportunity = mongoose.model("ArbitrageOpportunity", arbitrageOpportunitySchema);

export {ArbitrageOpportunity}