import express from 'express';
import { 
  createNewForm, 
  getAllForms,
  createNewFormType,
  getAllFormTypes,
  createNewFormCategory,
  getAllFormCategory
} from '../controllers/form.controllers.js';

const router = express.Router();

router.route("/")
  .post(createNewForm)
  .get(getAllForms);

router.route("/type")
  .post(createNewFormType)
  .get(getAllFormTypes);

router.route("/category")
  .post(createNewFormCategory)
  .get(getAllFormCategory);

export default router;