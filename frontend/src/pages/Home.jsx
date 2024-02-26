/* eslint-disable no-unused-vars */
import { useState } from "react";
import FormToComplete from "./FormToComplete";
import FormHistory from "./FormHistory";
import FormResponse from "./FormResponse";
import { Link } from "react-router-dom";

function Home() {
  const [activeTab, setActiveTab] = useState("forms_to_complete");
  let activeTabList = null;

  switch(activeTab) {
    case "forms_to_complete":
      activeTabList = <FormToComplete />
      break;
    case "form_history":
      activeTabList = <FormHistory />
      break;
    case "form_edit_and_response":
      activeTabList = <FormResponse />
      break;
    default:
      break;
  }

  return (
    <div>
      <div className="px-8 pb-8 flex justify-end items-center justify-self-center">
        <Link className="create-form-btn" to={"/form/create"}>Create New Form +</Link>
      </div>
      <ul className="tabs">
        <li 
          className={`tab ${activeTab === "forms_to_complete" ? "active" : ""}`} 
          onClick={() => setActiveTab("forms_to_complete")}>
            Forms To Complete
        </li>
        <li 
          className={`tab ${activeTab === "form_history" ? "active" : ""}`} 
          onClick={() => setActiveTab("form_history")}>
          Form History
        </li>
        <li 
          className={`tab ${activeTab === "form_edit_and_response" ? "active" : ""}`} 
          onClick={() => setActiveTab("form_edit_and_response")}>
          Form Edit & Responses
        </li>
      </ul>

      {
        activeTabList
      }
    </div>
  )
}

export default Home