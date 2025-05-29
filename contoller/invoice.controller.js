import Invoice from "../model/invoiceModel";
import constant from "../constant";
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
    const data = await Invoice.find()
       
    return res.json({
        status:constant.msgType.successStatus,
        code:constant.msgCode.successCode,
        message: constant.msg.datafetch,
        data: {
            docs:data,
        }
    })
   } catch (error) {
    return res.json({
        status:constant.msgType.failedStatus,
        code: constant.msgCode.internalServerError,
        message: constant.msg.internalServerError,
    })
   }
}