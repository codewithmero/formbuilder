import mongoose from 'mongoose';

const formSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  // category: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "FormCategory"
  // },
  // type: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   required: true,
  //   ref: "FormType"
  // },
  category: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true
  },
  start_date: {
    type: String,
    required: false
  },
  end_date: {
    type: String,
    required: false
  },
  is_filled_once: {
    type: Boolean,
    default: false
  },
  fields: [
    {
      
    }
  ]
}, {
  timestamps: true
});

const Form = mongoose.model("Form", formSchema);

export default Form;