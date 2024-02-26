import mongoose from 'mongoose';

const formCategorySchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
}, {
  timestamps: true
});

const FormCategory = mongoose.model("FormCategory", formCategorySchema);

export default FormCategory;