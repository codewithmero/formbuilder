// import { useState } from "react";
import { useState } from "react";
import BasicDetails from "./BasicDetails";
import CreationDetails from "./CreationDetails";
import FieldDetails from "./FieldDetails";
import "./pages.css";

const FormBuilder = () => {
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    type: "",
    category: "",
    description: "",
    start_date: "",
    start_time: "",
    end_date: "",
    end_time: "",
    steps: []
  });
  const [step, setStep] = useState("basic_details");

  let activePage = null;
  switch(step) {
    case "basic_details":
      activePage = <BasicDetails setStep={setStep} formData={formData} setFormData={setFormData} />
      break;
    case "creation_details":
      activePage = <CreationDetails setStep={setStep} formData={formData} setFormData={setFormData} />
      break;
    case "field_details":
      activePage = <FieldDetails setStep={setStep} formData={formData} setFormData={setFormData} />
      break;
    default: 
      break;
  }

  return (
    <>
      <h2 className="text-center text-4xl text-[teal] pt-8 pb-2 font-medium">Formikk</h2>
      {activePage}
    </>
  )
}

export default FormBuilder;