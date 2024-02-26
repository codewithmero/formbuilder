/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Modal, Button } from "react-bootstrap"

function FormPreview({ form, fields, showPreview, setShowPreview }) {

  return (
    <Modal show={showPreview} onHide={() => setShowPreview(false)}>
      <Modal.Header closeButton>
        <Modal.Title>{form.title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <form className="form">
          {
            fields?.length > 0 ? (
              <>
                {
                  fields.map((field, index) => (
                    <div className="form-section" key={index}>
                      <label htmlFor={`form-${field.type}-${index}`} className="form-label">{field.label}</label>
                      <input 
                        type={field.type} 
                        disabled={true} 
                        className="form-input"
                        placeholder={field.placeholder} />
                    </div>
                  ))
                }
              </>
            ) : null
          }
        </form>
      </Modal.Body>

      <Modal.Footer>
        <Button className="preview-close-btn" onClick={() => setShowPreview(false)}>Close</Button>
      </Modal.Footer>
    </Modal>
  )
}

export default FormPreview;