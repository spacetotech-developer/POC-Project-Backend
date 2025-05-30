import express from 'express';
import { addInvoiceController,getInvoiceController } from '../contoller/invoice.controller.js';
import todoValidation from '../validation';
         
const invoiceRouter = express.Router();

// Router to add todo data.
invoiceRouter.post('/addInvoice',addInvoiceController);

// Router to update the todo data.
invoiceRouter.get('/getInvoice',getInvoiceController);

export default invoiceRouter;