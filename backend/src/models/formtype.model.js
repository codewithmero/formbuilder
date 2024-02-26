import mongoose from 'mongoose';

const formTypeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const FormType = mongoose.model("FormType", formTypeSchema);

export default FormType;