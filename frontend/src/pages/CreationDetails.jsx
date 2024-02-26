/* eslint-disable no-undef */
/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';

function CreationDetails({  setStep, formData, setFormData }) {
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
        id: formData.id,
        step: "creation_details"
      });

      const { success } = response.data;

      if(success) {
        setSuccessMessage("Form has been saved successfully.");
        setFormData(c => ({
          ...c,
          steps: !c.steps.includes("creation_details") ? [...c.steps, "creation_details"] : [...c.steps]
        }))
        setIsContentChanged(false);
        setTimeout(() => {
          setStep("field_details");
        }, 3000); 
      }
    } catch(err) {
      console.log("Error while saving form:::", err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if(!formData.steps.includes("creation_details") || isContentChanged) {
      saveBasicFormDetails();
    }

    setStep("field_details");
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
          <label htmlFor="form- start-date" className="form-label">Start Date:</label>
          <input 
            type="date" 
            name="start_date" 
            className="form-input"
            value={formData.start_date}
            onChange={handleChange}
            placeholder="" />
        </div>

        <div className="form-section">
          <label htmlFor="form-start-time" className="form-label">Start Time:</label>
          <input 
            type="time" 
            name="start_time" 
            value={formData.start_time}
            className="form-input"
            onChange={handleChange}
            placeholder="" />
        </div>

        <div className="form-section">
          <label htmlFor="form-end-date" className="form-label">End Date:</label>
          <input 
            type="date" 
            name="end_date" 
            value={formData.end_date}
            className="form-input"
            onChange={handleChange}
            placeholder="" />
        </div>

        <div className="form-section">
          <label htmlFor="form-end-time" className="form-label">End Time:</label>
          <input 
            type="time" 
            name="end_time" 
            value={formData.end_time}
            className="form-input"
            onChange={handleChange}
            placeholder="" />
        </div>

        <div>
          <button className="back-btn" onClick={() => setStep("basic_details")}>Prev</button>
          <button className="submit-btn">Next</button>
        </div>
      </form>
    </>
  )
}

export default CreationDetails