import React, { useEffect } from "react";
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
} from "mdb-react-ui-kit";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import axios from "axios";
import Toast from "react-bootstrap/Toast";
import {useNavigate} from 'react-router-dom'


function Register() {
    const navigate = useNavigate()
    const [data, setData] = useState({name: null, email: null, username: null, contact: null, password: null, repeatPass: null, agree: null});
    const [show, setShow] = useState(false);
    const [error, setError] = useState(true)
    const [userInfo, setUserInfo] = useState(null)
    const [showToast, setShowToast] = useState("");
    
    const getData = ()=>{
        axios.get("http://localhost:8000/user").then((response)=>{
          setUserInfo(response.data);
        }).catch((error)=> console.log(error))
      }
      useEffect(()=>{
        getData()
      }, [])

    const handleSetData = () => {
    console.log(data);
    const { name, email, username, password, contact, repeatPass, agree } = data;

    const filteredUser = userInfo.filter((item) => {
        return item.username === username && item.password === password;
    }); 
    
    console.log(userInfo);
    console.log(filteredUser);

    if (name === null || name === ""){
        setShow(true);
        setShowToast("Please enter the name.")
        return false;
    }else if (name.length < 2){
        setShow(true);
        setShowToast("Please enter the valid name.")
        return false;
    }else if (filteredUser.length !== 0) {
        setShow(true);
        setShowToast("Username already taken");
    }else if (username === null || username === ""){
        setShow(true);
        setShowToast("Please enter the username.")
        return false;
    }else if (username.includes(" ")){
        setShow(true);
        setShowToast("Please remove space and enter the valid username.")
        return false;
    }else if (email === null || email === ""){
        setShow(true);
        setShowToast("Please enter the email.")
        return false;
    }else if (!email.includes("@") && !email.includes(".")){
        setShow(true);
        setShowToast("Please enter the valid email.")
        return false;
    }else if (contact.length != 10){
        setShow(true);
        setShowToast("Please enter the valid contact number.")
        return false;
    }else if (password.length < 8) {
        setShow(true);
        setShowToast("Please enter more than 8 characters in password.")
        return false;
    }else if(repeatPass !== password){
        setShow(true);
        setShowToast("Password doesn't match.")
        return false;
    }else if (agree===null || !agree) {
        setShow(true);
        setShowToast("Please read and tick the terms and conditions to proceed further.")
        return false;
    }else{
        axios.post("http://localhost:8000/user", data)
        .then((response) => {
            setShow(true);
            setError(false)
            navigate('/login')
        })
        .catch((error) => console.log(error));
    };
    }


    return (
    <>
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
                <MDBCol md="10" lg="6" className="order-2 w-50order-lg-1 d-flex flex-column align-items-center vh-100 justify-content-center" >
                <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4 ">Sign up</p>

                <div className="d-flex flex-row align-items-center mb-4 w-75 ">
                    <MDBIcon fas icon="user me-3" size="lg" />
                    <MDBInput label="Your Name" id="form1" type="text" className="w-100" onChange={(e) => setData({ ...data, name: e.target.value })} />
                </div>

                <div className="d-flex flex-row align-items-center mb-4 w-75">
                    <MDBIcon fas icon="envelope me-3" size="lg" />
                    <MDBInput label="Your Email" id="form2" type="email" onChange={(e) => setData({ ...data, email: e.target.value })}/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4 w-75">
                    <MDBIcon fas icon="phone-alt me-3" size="lg" />
                    <MDBInput label="Contact" id="typePhone" type="tel" onChange={(e) => setData({ ...data, contact: e.target.value })}/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4 w-75 ">
                    <MDBIcon fas icon="user-circle me-3" size="lg" />
                    <MDBInput label="username" id="form1" type="text" className="w-100" onChange={(e) => setData({ ...data, username: e.target.value})}/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4 w-75">
                    <MDBIcon fas icon="lock me-3" size="lg" />
                    <MDBInput label="Password" id="form3" type="password" onChange={(e) => setData({ ...data, password: e.target.value})}/>
                </div>

                <div className="d-flex flex-row align-items-center mb-4 w-75">
                    <MDBIcon fas icon="key me-3" size="lg" />
                    <MDBInput label="Repeat your password" id="form4" type="password" onChange={(e) => setData({ ...data, repeatPass: e.target.value })}/>
                </div>

                <div className="form-check d-flex justify-content-center mb-5">
                    <input className="form-check-input me-2" type="checkbox" value="" id="isAggree" onChange={(e) => setData({ ...data, agree: e.target.checked })}/>
                    <label className="form-check-label"> I agree all statements in <a href="#!">Terms of service</a></label>
                </div>

                    <MDBBtn className="mb-4 bg-success" size="lg" onClick={handleSetData}>
                        Register
                    </MDBBtn>
                </MDBCol>

                <MDBCol md="10" lg="6" className="order-1 order-lg-2 d-flex align-items-center">
                    <MDBCardImage src="https://img.freepik.com/free-vector/gradient-ssl-illustration_23-2149247155.jpg?t=st=1714557701~exp=1714561301~hmac=9cdf4a245dc623c4f71421bc74453e89352a2c9faadcaad7c5565d1c86bec0db&w=740" fluid/>
                </MDBCol>
            </MDBRow>
            </MDBCardBody>
        </MDBCard>
        </MDBContainer>
    </>
    );
}

export default Register;
