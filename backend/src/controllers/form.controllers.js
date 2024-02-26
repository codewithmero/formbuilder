import Form from "../models/form.model.js";
import FormType from "../models/formtype.model.js";
import FormCategory from "../models/formcategory.model.js";
import FormResponse from "../models/formresponse.models.js";
import { asyncHandler } from "../helpers/asyncHandler.js";
import moment from "moment";
import mongoose from "mongoose";

const createNewForm = asyncHandler(async (req, res) => {
  let obj = null;
  let currentStep = null;
  let formData = null;

  switch (req.body.step) {
    case "basic_details": 
      let {
        title,
        category,
        type,
        description,
      } = req.body;

      obj = {
        title, category, type, description
      }

      // NEW FORM CREATED IN THE FIRST STEP;
      if(!req.body.id) {
        formData = await Form.create(obj)
      } else {
        // FORM UPDATED IN THE SECOND STEP;
        await Form.findOneAndUpdate({
          _id: req.body.id
        }, obj);

        // FETCHING THE DATA AFTER UPDATION;
        formData = await Form.findById(req.body.id);
      }

      currentStep = "Basic details";
      break;

    case "creation_details":
      let {
        end_date,
        end_time,
        start_date,
        start_time,
        id: formId
      } = req.body;

      obj = {
        start_date: `${start_date}T${start_time}`,
        end_date: `${end_date}T${end_time}`
      } 

      // FORM UPDATED IN THE SECOND STEP;
      await Form.findOneAndUpdate({
        _id: formId
      }, obj);

      // FETCHING THE DATA AFTER UPDATION;
      formData = await Form.findById(formId);

      currentStep = "Creation details";
      break;

    case "field_details":
      let {
        fields,
        id
      } = req.body;

      fields = JSON.parse(fields);

      obj = {
        fields
      }

      // FORM UPDATED IN THE SECOND STEP;
      await Form.findOneAndUpdate({
        _id: id,
      }, {
        ...obj
      });

      // FETCHING THE DATA AFTER UPDATION;
      formData = await Form.findById(id);
    
      currentStep = "Field details";
      break;

    default:
      break;
  }

  if(!obj)
    throw new Error("Form data shall never be empty!");

  return res.status(200)?.json({
    success: true,
    details: formData,
    msg: `Form (${currentStep}) have been created successfully.`
  });
}); 

const getAllForms = asyncHandler(async (req, res) => {
  let forms = JSON.parse(JSON.stringify(await Form.find({
  }).select({
    _id: 1,
    title: 1,
    start_date: 1,
    end_date: 1,
    createdAt: 1
  })));

  forms = forms.map(item => ({
    ...item,
    start_date: moment(item.start_date).format("DD/MM/YYYY"),
    end_date: moment(item.end_date).format("DD/MM/YYYY"),
    createdAt: moment(item?.createdAt).format("DD/MM/YYYY")
  }))

  return res.status(200)?.json({
    success: true,
    forms,
    msg: "All forms have been fetched successfully."
  });
}); 

const getAllFormsByTab = asyncHandler(async (req, res) => {
  const { form_type } = req.params;
  let condObj = {};
  if(form_type === "forms_to_complete") {
    condObj = {
      is_filled_once: false
    }
  } else if(form_type === "form_history") {
    condObj = {
      is_filled_once: true
    }
  }

  let forms = JSON.parse(JSON.stringify(await Form.find(condObj).select({
    _id: 1,
    title: 1,
    start_date: 1,
    end_date: 1,
    createdAt: 1
  })));

  forms = forms.map(item => ({
    ...item,
    start_date: moment(item.start_date).format("DD/MM/YYYY"),
    end_date: moment(item.end_date).format("DD/MM/YYYY"),
    createdAt: moment(item?.createdAt).format("DD/MM/YYYY")
  }))

  return res.status(200)?.json({
    success: true,
    forms,
    msg: "All forms have been fetched successfully."
  });
}); 

const getFormById = asyncHandler(async (req, res) => {

  const { formId } = req.params;

  let form = JSON.parse(JSON.stringify(await Form.findById(formId).select({
    _id: 1,
    title: 1,
    fields: 1,
    end_date: 1
  })));

  form = [form].map(item => {
    let fields = item?.fields?.map(item => ({
      ...item,
      name: item?.label?.toLowerCase()?.split(" ")?.join("_")?.replaceAll("?", "")
    }));
    return {
      ...item,
      fields,
      end_date: moment(item.end_date).format("DD/MM/YYYY")
    }
  });

  return res.status(200)?.json({
    success: true,
    form: form?.[0],
    msg: "Form data has been fetched successfully."
  });
});
 
const createNewFormType = asyncHandler(async (req, res) => {


  return res.status(200)?.json({
    success: true,
    msg: "A new form type has been created successfully."
  });
}); 

const getAllFormTypes = asyncHandler(async (req, res) => {


  return res.status(200)?.json({
    success: true,
    msg: "All form types have been fetched successfully."
  });
}); 

const createNewFormCategory = asyncHandler(async (req, res) => {


  return res.status(200)?.json({
    success: true,
    msg: "A new form category has been created successfully."
  });
}); 

const getAllFormCategory = asyncHandler(async (req, res) => {


  return res.status(200)?.json({
    success: true,
    msg: "All form categories have been fetched successfully."
  });
}); 

const addNewFormResponse = asyncHandler(async (req, res) => {

  const { content, formId } = req.body;

  let obj = {
    content,
    formId
  };

  let newResponse = await FormResponse.create(obj);

  if(!newResponse)
    throw new Error("Unable to create new form response!");

  await Form.findOneAndUpdate({
    _id: new mongoose.Types.ObjectId(formId),
  }, {
    is_filled_once: true
  });

  return res.status(201)?.json({
    success: true,
    response: newResponse,
    msg: "Form response has been added successfully."
  });
});

const viewAllFormResponses = asyncHandler(async (req, res) => {

});

const getFormResponseById = asyncHandler(async (req, res) => {

});

export {
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
}