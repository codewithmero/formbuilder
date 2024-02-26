/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from "react";
import axios from 'axios';

const BasicDetails = ({ setStep, formData, setFormData }) => {
  const [isContentChanged, setIsContentChanged] = useState(false);
  const [successMessage, setSuccessMessage] = useState(null);
  
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData(c => ({
      ...c,
      [name]: value
    }));

    setIsContentChanged(true);
  }

  const saveBasicFormDetails = async () => {
    try {
      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forms`, {
        ...formData,
        step: "basic_details"
      });

      const { success, details } = response.data;
      if(success) {
        setSuccessMessage("Form has been saved successfully.");
        setFormData(c => ({
          ...c,
          id: details._id,
          steps: !c.steps.includes("basic_details") ? [...c.steps, "basic_details"] : [...c.steps]
        }))
        setIsContentChanged(false);
        setTimeout(() => {
          setStep("creation_details");
        }, 3000); 
      }
    } catch(err) {
      console.log("Error while saving form:::", err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    if(!formData.steps.includes("basic_details") || isContentChanged) {
      saveBasicFormDetails();
    }

    setStep("creation_details");
  }

  return (
    <>
      {
        successMessage && (
          <div className="message-container">
            <p className="success-msg">{successMessage}</p>
          </div>
        )
      }
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-section">
          <label htmlFor="form-title" className="form-label">Title:</label>
          <input 
            type="text" 
            name="title" 
            value={formData.title}
            className="form-input"
            onChange={handleChange}
            placeholder="" />
        </div>

        <div className="form-section">
          <label htmlFor="form-category" className="form-label">Category:</label>
          <input 
            type="text" 
            name="category"
            value={formData.category} 
            className="form-input"
            onChange={handleChange}
            placeholder="" />
        </div>

        <div className="form-section">
          <label htmlFor="form-type" className="form-label">Type:</label>
          <input 
            type="text" 
            name="type" 
            value={formData.type}
            className="form-input"
            onChange={handleChange}
            placeholder="" />
        </div>

        <div className="form-section">
          <label htmlFor="form-description" className="form-label">Description:</label>
          <textarea
            rows={10}
            name="description" 
            value={formData.description}
            className="form-input form-textarea"
            onChange={handleChange}
            placeholder="" />
        </div>

        <div>
          <button className="submit-btn">Next</button>
        </div>
      </form>
    </>
  )
}

export default BasicDetails;