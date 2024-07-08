// import { Graph } from '../models/Graph.model';
import { graphService } from '../services/graphServices';
import {ArbitrageOpportunity} from '../models/ArbitrageOpportunity.model';

interface RequestBody {
  currency_choices: string[];
}

const arbitrageController = {
  displayArbitrageOpportunity: async (req, res) => {
    try {
      const arbitrage = await ArbitrageOpportunity.find({ profit: { $gt: 1 } });
      
      // Extracting cycles and profit
      const cycles = arbitrage.map(entry => ({
        cycle: entry.cycle,
        profit: entry.profit,
        time: entry.timestamp
      }));
      console.log(cycles)
  
      res.status(200).json({ data: cycles });
    } catch (error) {
      console.error("Error fetching arbitrage opportunities:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  getArbitrageOpportunity: async (req, res) => {
    let opportunities;

    try{
      opportunities = await graphService.bellmanFord();
    }
    catch(error){
      res.status(404).json({message: `Error occurred while trying to find arbitrage opportunities ${error.message}`});
    }

    try{
      for (const opportunity of opportunities ){
        const {profit, cycle, profitRates} = opportunity;
        // console.log(`crap ${profitRates}`);
        const newOpportunity = new ArbitrageOpportunity({
          cycle: cycle,
          profit: profit,
          profitRates: profitRates
        })
        newOpportunity.save();
      }
      res.status(200).json({message: 'Arbitrqge opportunities saved successfully!'});
    }
    catch(error){
      res.status(404).json({message: `Arbitrage opportunities have not saved: ${error.message}`});
    }
  },
  deleteArbitrageOpportunity: async (req, res) => {
    try{
      await ArbitrageOpportunity.deleteMany({});
      res.status(200).send({message: "old arbitrage data deleted successfully!"})
    }
    catch(error){
      res.status(404).json({message: `old arbitrage failed to delete ${error.message}`})
    }
  }
}

export {arbitrageController};