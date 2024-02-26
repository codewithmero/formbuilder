/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

function AddEditDynamicForm() {
  const { action, formId } = useParams();
  const [formFields, setFormFields] = useState({});
  const [formData, setFormData] = useState({});

  const fetchFormData = async () => {
    try {
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/forms/${formId}`);
      const { success, form } = response.data;

      if(success) {
        setFormFields(form);
      }
    } catch(err) {
      console.log("Error - while fetchign form fields:::", err);
    }
  }

  const handleChange = (event) => {
    const {name, value} = event.target;

    setFormData(c => ({
      ...c,
      [name]: value
    }));
  }

  const addNewFormResponse = async () => {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/forms/response`, {
        content: JSON.stringify(formData),
        formId: formFields?._id
      });

      const { success } = response.data;

      if(success) {
        window.location.href="/";
      }
    } catch(err) {
      console.log("Error - while creating new form response:::", err);
    }
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    addNewFormResponse();
  };

  useEffect(() => {
    fetchFormData();
  }, []);

  return (
    <div>
      <div className="title">
        <h2>{action === "add" ? `Add Response` : `Edit Response`}</h2>
      </div>
      
      <form onSubmit={handleSubmit} className="form">                                      
        {
          formFields?.fields?.length > 0  ? (
            <>
              {
                formFields.fields.map((data, index) => (
                  <div className="form-section" key={index}>
                    <label htmlFor={`form-${data.type}-${index}`} className="form-label">{data.label}</label>
                    <input 
                      type={data?.type} 
                      name={`${data?.name}`} 
                      value={formData[data?.name]}
                      className="form-input"
                      onChange={handleChange}
                      placeholder={data.placeholder} />
                  </div>
                ))
              }
            </>
          ) : null
        }
        <button className="preview-btn">Submit</button>
      </form>
    </div>
  )
}

export default AddEditDynamicForm;