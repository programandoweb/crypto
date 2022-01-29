import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

function MyVerticallyCenteredModal(props) {

  return (
    <Modal
      aria-labelledby="contained-modal-title-vcenter"
      centered
      show={props.modalShow.show}
      size={!props.modalShow.size?"md":props.modalShow.size}
      onHide={()=>props.setModalShow({show:false,message:"",size:props.modalShow.size?props.modalShow.size:"lg"})}
    >
      {props.modalShow.header && props.modalShow.header.label?<Modal.Header closeButton>
                                <Modal.Title className="h6">
                                  {props.modalShow.header.label}
                                </Modal.Title>
                              </Modal.Header>:<></>}
      <Modal.Body>
        <div  className="text-center col text-uppercase">
        {!props.modalShow.message?"":props.modalShow.message}
        </div>
      </Modal.Body>
      {props.modalShow.footer?<Modal.Footer>
        <div className="text-uppercase">
          {props.modalShow.footer_btn?<Button onClick={()=>props.modalShow.footer_btn()}>Guardar</Button>:<></>}
          <Button onClick={()=>props.setModalShow({show:false,message:""})}>Close</Button>
        </div>
      </Modal.Footer>:<></>}

    </Modal>
  );
}

export default MyVerticallyCenteredModal
