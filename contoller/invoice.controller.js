import Invoice from "../model/invoiceModel.js";
import constant from "../constant.js";
import mongoose from "mongoose";

export const addInvoiceController = async(req,res,next)=>{
   try {
    const body = req.body;
    console.log('body',body)
    const request_data = {
        ...body,
        _id:new mongoose.Types.ObjectId()
    }
    const data = await Invoice(request_data).save();    
    return res.json({
        status:constant.msgType.successStatus,
        code:constant.msgCode.successCode,
        message:constant.msg.createtodo,
        data: data
    })
   } catch (error) {
    console.log("error",error);
    return res.json({
        status:constant.msgType.failedStatus,
        code:constant.msgCode.internalServerError,
        message:constant.msg.internalServerError,
        data:''
    })
   }
}

export const getInvoiceController = async(req,res,next)=>{
   try {
     const data = await Invoice.find({}, { invoiceValue: 1, invoiceDate: 1, _id: 0 })
                             .sort({ invoiceDate: 1 }); 
    const filteredData = data.map(doc => ({
      invoiceValue: doc.invoiceValue,
      invoiceDate: doc.invoiceDate,
    }));
       
    return res.json({
        status:constant.msgType.successStatus,
        code:constant.msgCode.successCode,
        message: constant.msg.datafetch,
        data: filteredData
    })
   } catch (error) {
    return res.json({
        status:constant.msgType.failedStatus,
        code: constant.msgCode.internalServerError,
        message: constant.msg.internalServerError,
    })
   }
}