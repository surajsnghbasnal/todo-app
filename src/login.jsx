import React, { useInsertionEffect } from 'react';
import {
  MDBBtn,
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBInput,
  MDBIcon,
}
from 'mdb-react-ui-kit';
import { useState, useEffect } from "react";
// import {useNavigate} from 'react-router-dom'
// import axios from 'axios';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";
import axios from 'axios';




function Login() {
  const [show, setShow] = useState(false);
  const [error, setError] = useState(true)
  const [showToast, setShowToast] = useState("");
  const [userInfo, setUserInfo] = useState(null)
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()


  const getData = ()=>{
    axios.get("http://localhost:8000/user").then((response)=>{
      setUserInfo(response.data);
    }).catch((error)=> console.log(error))
  }
  useEffect(()=>{
    getData()
  }, [])

    
  const handleLogin = () => {
    const filteredUser = userInfo.filter((item) => {
      return item.username === username && item.password === password;
    });
    
    console.log(filteredUser);

    if (filteredUser.length === 0) {
      setShow(true);
      setShowToast("Username or password is incorrect.");
    } else {
      setError(false);
      setShow(true);
      setShowToast("Login successful.");
    }
  };


  return (
    <MDBContainer fluid className="position-relative">
        <Row className="position-absolute bottom-10 end-10 z-2">
            <Col xs={12}>
                <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide >
                    <Toast.Header>
                        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
                        <strong className={`${error ? "text-rose-600" : "text-emerald-500"} me-auto` } >{error? "Error": "Registered"}</strong>
                    </Toast.Header>
                    <Toast.Body className={`${error ? "text-rose-600" : "text-emerald-500"}`}>{showToast}</Toast.Body>
                </Toast>
            </Col>
        </Row>
        <MDBCard className="text-black vh-100" style={{ borderRadius: "25px" }}>
            <MDBCardBody>
            <MDBRow>
              <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
                <MDBCardImage src="https://storyset.com/illustration/login/cuate" fluid/>
              </MDBCol>
                <MDBCol md="10" lg="6" className="order-2 w-50order-lg-1 d-flex flex-column align-items-center vh-100 justify-content-center" >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 ">Login</p>
                
                <div className="d-flex flex-row align-items-center mb-4 w-75 ">
                    <MDBIcon fas icon="user-circle me-3" size="lg" />
                    <MDBInput label="username" id="form1" type="text" className="w-100" onChange={(e)=> setUsername(e.target.value)}/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4 w-75">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput label="Password" id="form3" type="password" onChange={(e)=> setPassword(e.target.value)}/>
                </div>
                <MDBBtn className="mb-4 bg-success" size="lg" onClick={handleLogin}>
                    Login
                </MDBBtn>
                </MDBCol>
            </MDBRow>
            </MDBCardBody>
        </MDBCard>
        </MDBContainer>
  );
}

export default Login;