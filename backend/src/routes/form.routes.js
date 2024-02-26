import express from 'express';
import { 
  createNewForm, 
  getAllForms,
  createNewFormType,
  getAllFormTypes,
  createNewFormCategory,
  getAllFormCategory,
  getFormById,
  addNewFormResponse,
  viewAllFormResponses,
  getFormResponseById,
  getAllFormsByTab
} from '../controllers/form.controllers.js';

const router = express.Router();

router.route("/")
  .post(createNewForm)
  .get(getAllForms);

router.route("/tabs/:form_type")
  .get(getAllFormsByTab)

router.route("/:formId")
  .get(getFormById);

router.route("/response")
  .post(addNewFormResponse)
  .get(viewAllFormResponses);

router.route("/response/:responseId")
  .get(getFormResponseById);

router.route("/type")
  .post(createNewFormType)
  .get(getAllFormTypes);

router.route("/category")
  .post(createNewFormCategory)
  .get(getAllFormCategory);

export default router;