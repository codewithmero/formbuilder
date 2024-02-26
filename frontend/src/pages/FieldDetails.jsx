/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from "axios";
import FormPreview from "../components/FormPreview";
import "./pages.css";
// import { useHistory } from 'react-router-dom';

let selectOptions = [
  {
    label: 'Text',
    value: 'text'
  },
  {
    label: 'Email',
    value: 'email'
  },
  {
    label: 'Password',
    value: 'password'
  },
  {
    label: 'Date',
    value: 'date'
  },
  {
    label: 'Time',
    value: 'time'
  }
]

function FieldDetails({ setStep, formData, setFormData }) {
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [formFields, setFormFields] = useState([
    {
      label: '',
      type: 'text',
      placeholder: '',
      order: 0,
      fields: null
    },
  ]);

  const saveFormFields = async () => {
    try {
      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forms`, {
        fields: JSON.stringify(formFields),
        id: formData.id,
        step: "field_details"
      });

      const { success, details } = response.data;
      if(success) {
        setFormData(c => ({
          ...c,
          id: details._id,
          steps: !c.steps.includes("field_details") ? [...c.steps, "field_details"] : [...c.steps]
        }))
        setIsContentChanged(false);
        window.location.href="/";
      }
    } catch(err) {
      console.log("Error - while saving form fields:::", err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!formData.steps.includes("field_details") || isContentChanged) {
      saveFormFields();
    }
    
  }

  const handleChange = (field, value, index) => {
    let entry = formFields?.filter((item, i) => {
      if(index === i)
        return item;
    });

    entry = entry?.[0];
    entry[field] = value;

    let tempFormFields = formFields.map((item, i) => {
      if(i === index)
        return {
          ...entry
        }

      return item;
    });

    setFormFields(tempFormFields);
  }

  const addNewFormFieldEntry = (e) => {
    e.preventDefault();

    let entry = [...formFields, {
      label: '',
      type: 'text',
      placeholder: '',
      order: formFields.length === 0 ? 0 : formFields.length,
      fields: null
    }]

    setFormFields(entry);
  }

  console.log("Form data:::", formFields);

  return (
    <>
      <div className="flex justify-end px-[2rem]">
        <button className="preview-btn" onClick={() => setShowPreview(true)}>Preview Form +</button>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        {
          formFields?.length > 0 ? (
            <>
              {
                formFields.map((field, index) => (
                  <div className="field-section grid grid-cols-2 gap-4 shadow rounded" key={index}>
                    <input 
                      type="text" 
                      placeholder="Label" 
                      className="field-input"
                      value={field?.label} 
                      onChange={(e) => handleChange("label", e.target.value, index)} />
                    <select className="field-input" onChange={(e) => handleChange("type", e.target.value, index)}>
                      {
                        selectOptions?.length > 0 ? (
                          <>
                            {
                              selectOptions.map((option, index) => (
                                <option 
                                  value={option.value}
                                  selected={option.value === field?.type} 
                                  key={index}>
                                    {option.label}
                                </option>
                              ))
                            }
                          </>
                        ) : null
                      }
                    </select>
                    <input 
                      type="text" 
                      className="field-input"
                      placeholder="Field Placeholder" 
                      onChange={(e) => handleChange("placeholder", e.target.value, index)} />
                  </div>
                ))
              }
            </>
          ) : null
        }

        <button className="add-more-btn" onClick={addNewFormFieldEntry}>Add More +</button>

        <div>
          <button className="back-btn" onClick={() => setStep("creation_details")}>Prev</button>
          <button className="submit-btn">Next</button>
        </div>
      </form>
      {
        <FormPreview 
          showPreview={showPreview} 
          form={formData}
          fields={formFields}
          setShowPreview={setShowPreview} />
      }
    </>
  )
}

export default FieldDetails