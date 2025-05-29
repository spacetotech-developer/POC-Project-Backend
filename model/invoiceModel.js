import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceValue:{
        type:String,
        required:true
    },
    invoiceDate:{
        type:Date,
        required:false
    },
},
{timestamps: { currentTime: () => Date.now() }}
)

const Invoice = mongoose.model("invoice",invoiceSchema,"invoice");
export default Invoice;