import express from 'express';
import {
  createClient,
  getAllClients,
  getClientByCedula,
  updateClient,
  deleteClient
} from '../controllers/clientController.js';

const router = express.Router();

router.post('/', createClient);
router.get('/', getAllClients);
router.get('/:cedula', getClientByCedula);
router.patch('/:cedula', updateClient);
router.delete('/:cedula', deleteClient);

export default router;