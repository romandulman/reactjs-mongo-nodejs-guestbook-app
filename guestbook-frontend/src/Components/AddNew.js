import React, { Component } from "react";
import "./Styles.css";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Webcam from "react-webcam";
import { connect } from "react-redux";

const mapStateToProps = state => {
  return {
    showAddModal: state.showAddModal,
    GuestsList: state.GuestsList
  };
};

const mapDispachToProps = dispach => {
  return {
    sendGuestsData: guestsData =>
      dispach({ type: "DATA", guestsData: guestsData }),
    ShowModal: () => dispach({ type: "SHOWMODAL" })
  };
};
let arr = {
  Name: "",
  Body: "",
  Image: ""
};

class AddNew extends Component {
  setRef = webcam => {
    this.webcam = webcam;
  };

  captureImage = () => {
    return new Promise((resolve, reject) => {
      const imageSrc = this.webcam.getScreenshot();
      if (imageSrc) {
        resolve(imageSrc);
      } else {
        reject("error while taking image");
      }
    });
  };

  saveImage = () => {
    this.captureImage().then(im => {
      console.log(im);
      arr.Image = im;
      console.log( arr.Image)
    });
  };

  handleClose = () => {
    this.props.ShowModal();
  };

  handleAdd = () => {
    fetch("/guests/postguest", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ arr })
    })
      .then(response => response.json())
      .then(res => {
        let AddnewData = [...this.props.GuestsList, res];
        this.props.sendGuestsData(AddnewData);
        this.props.ShowModal();
      });
  };

  render() {
    const videoConstraints = {
      width: 1280,
      height: 720,
      facingMode: "user"
    };

    return (
      <Modal
        dialogClassName="modal-90w"
        show={this.props.showAddModal}
        onHide={this.handleClose}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add New Guest</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={e => {
                  arr.Name = e.target.value;
                }}
                placeholder="Your Name"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Your Message</Form.Label>
              <Form.Control
                as="textarea"
                onChange={e => {
                  arr.Body = e.target.value;
                }}
                rows="3"
              />
            </Form.Group>
          </Form>
          <Form.Group>
            <h5>Smile to the Camera..</h5>
            <Webcam
              audio={false}
              height={550}
              ref={this.setRef}
              screenshotFormat="image/jpeg"
              width={550}
              videoConstraints={videoConstraints}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="secondary" onClick={this.saveImage}>
              Take a Shoot
            </Button>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.ShowModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={this.handleAdd}>
            Add Guest
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default connect(
  mapStateToProps,
  mapDispachToProps
)(AddNew);
