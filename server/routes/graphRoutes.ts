import express from 'express';
const router = express.Router();
import { currencyController } from '../controllers/graphController';

router.get('/currencies/display', currencyController.displayCurrencies);
router.get('/currencies/get', currencyController.getAllCurrencies);
router.delete('/currencies/delete', currencyController.deleteAllCurrencies);

export {router}

