import React, { useState } from "react";
import {Row,Col,Form,Button} from "react-bootstrap" 
import loginImg from "../assets/loginImg.png"

import { auth } from "../Firebase";

import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export default function Login(){
    const navigate = useNavigate()
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    async function handleLogin(){
        signInWithEmailAndPassword(auth, email, password).then((userCredetials)=>{
            // console.log(userCredetials)
            // navigate("/")
        }).catch(err=>{
            console.log(err)
        })
    }
    return(
        <div style={{backgroundColor:"#f15a24",width:"99.2vw",height:"100vh"}}>
            <Row>
                <Col>
                <img src={loginImg} style={{width:"35rem",margin:"7rem"}}/>
                </Col>
                <Col>
                <div style={{marginLeft:"8rem",marginTop:"18rem"}}>
                     <Form>
                     <h1 style={{fontFamily:"cursive",color:"white"}}>CINEMA ELK</h1>

                            <div style={{display:"flex",justifyContent:"space-between",width:"75%"}}>
                                <Form.Group className="mb-4" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter Username"
                                    onChange={(e) =>setEmail(e.currentTarget.value)}
                                    style={{height:"3rem"}}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Enter Password"
                                    onChange={(e)=> setPassword(e.currentTarget.value)} 
                                     style={{height:"3rem"}}
                                     />
                                </Form.Group>
                            </div>
                            <Button
                            onClick={handleLogin}
                            style={{border:"2px solid white",width:"75%",color:"white",backgroundColor:"#f15a24",height:"3rem",marginTop:"1rem"}} variant="outline-secondary" type="button">
                                Login
                            </Button>
                            <div style={{color:"white" ,marginTop:"2rem",marginLeft:"9rem", }}>
                                Join the club,<span onClick={() => navigate("/signup")} style={{color:"white",borderBottom:"1px solid white"}}> Click here</span>
                            </div>
                        </Form>
                </div>
                </Col>
            </Row>
        </div>
    )
}