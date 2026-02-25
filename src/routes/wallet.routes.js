import express from 'express';
import { createWallet, deleteWalletByID, deposit, getAllWalles, getWalletByUserID, updateWallet, withdraw } from '../controllers/wallet.controller.js';
import { validateUpdateWallet, validateWallet } from '../middleware/validateWallet.js';
import { validateParams } from '../middleware/validateParams.js';
import { validateAmount } from '../middleware/validateAmount.js';


const router = express.Router();

router.post('/:id',validateWallet, createWallet);
router.get('/', getAllWalles);
router.get('/:id', validateParams,getWalletByUserID);
router.post('/:id/deposit', validateParams, validateAmount, deposit)
router.post('/:id/withdraw', validateParams, validateAmount, withdraw)
router.delete('/:id', validateParams, deleteWalletByID)
router.put('/:id',validateParams, validateUpdateWallet, updateWallet)

export default router;