/* eslint-disable no-unused-vars */
import "./pages.css";
import useFetchForms from "../hooks/useFetchForms";
import { Link } from "react-router-dom";

function FormListing() {
  let { forms, errors } = useFetchForms();

  return (
    <div className="listing-page">
      <div className="px-8 pt-10">
        <h2 className="text-3xl uppercase tracking-wide text-center">Forms Management</h2>
      </div>
      <div className="px-8 pb-8 flex justify-end items-center justify-self-center">
        <Link className="create-form-btn" to={"/form/create"}>Create New Form +</Link>
      </div>
      <div className="px-8 form-listing">
        {
          forms?.length > 0 ? (
            <>
              {
                forms.map((form, index) => (
                  <div className="form-item" key={index}>
                    <div className="form-img">
                      <img src="/public/assets/img/form_icon.png" alt="" />
                    </div>
                    <div className="form-details">
                      <Link to={`/form/add/${form._id}`}>{form?.title}</Link>
                      <p>{form?.end_date ? `Due on: ${form?.end_date}` : `Created on: ${form?.createdAt}`}</p>
                    </div>
                  </div>
                ))
              }
            </>
          ) : null
        }
      </div>
    </div>
  )
}

export default FormListing