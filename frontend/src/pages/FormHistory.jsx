/* eslint-disable no-unused-vars */
import "./pages.css";
import useFetchForms from "../hooks/useFetchForms";
import { Link } from "react-router-dom";

function FormHistory() {
  let formType="form_history";
  let { forms, errors } = useFetchForms(formType);

  return (
    <div className="listing-page">
      <div className="px-8 py-10">
        <h2 className="text-3xl uppercase tracking-wide text-center">{`Forms' History`}</h2>
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
          ) : <p className="text-center">No forms have been created yet.</p>
        }
      </div>
    </div>
  )
}

export default FormHistory;