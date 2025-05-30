import mongoose from "mongoose";

const invoiceSchema = new mongoose.Schema({
    invoiceValue:{
        type:String,
        required:true
    },
     invoiceDate: {
    type: Date,
    required: false,
    set: (val) => {
      if (typeof val === 'string' && /^\d{2}\.\d{2}\.\d{4}$/.test(val)) {
        const [day, month, year] = val.split('.');
        return new Date(`${year}-${month}-${day}`);
      }
      return val;
    }
  }
},
{timestamps: { currentTime: () => Date.now() }}
)

const Invoice = mongoose.model("invoice",invoiceSchema,"invoice");
export default Invoice;