import express from 'express';
const router = express.Router();
// import { arb } from '../controllers/graphController';
import { arbitrageController } from '../controllers/arbitrageOpportunityController';

router.get('/arbitrage/display', arbitrageController.displayArbitrageOpportunity);
router.get('/arbitrage/get', arbitrageController.getArbitrageOpportunity);
router.delete('/arbitrage/delete', arbitrageController.deleteArbitrageOpportunity);
// router.delete('/currencies', arbitrageController.deleteArbitrageOpportunity);

export {router}