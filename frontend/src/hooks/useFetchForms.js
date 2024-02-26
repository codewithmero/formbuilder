/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

function useFetchForms(formType) {
  const [forms, setForms] = useState([]);
  const [errors, setErrors] = useState(null);

  const fetchAllForms = useCallback(async () => {
    try { 
      let response = await axios.get(`${process.env.REACT_APP_BASE_URL}/forms/tabs/${formType}`);

      const { success, forms } = response.data;

      if(success) {
        setForms(forms);
      }
    } catch(err) {
      console.log("Error - while fetching forms:::", err);
      setErrors("Unable to fetch forms!");
    }
  }, [formType]);

  useEffect(() => {
    fetchAllForms();
  }, [formType, fetchAllForms]);

  return {
    errors, forms
  }
}

export default useFetchForms;