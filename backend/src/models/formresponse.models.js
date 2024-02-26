import mongoose from 'mongoose';

const formResponseSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
  },
  formId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Form",
    required: true
  }
}, {
  timestamps: true
});

const FormResponse = mongoose.model("FormResponse", formResponseSchema);

export default FormResponse;