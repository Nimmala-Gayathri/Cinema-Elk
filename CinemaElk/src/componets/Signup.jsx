import React,{useEffect,useState} from "react";

// import {Input,Button} from "antd"
import {Row,Col,Button,Form} from "react-bootstrap"
import { auth } from "../Firebase"
import SignupImg from "../assets/loginImg.png"

import { createUserWithEmailAndPassword } from "firebase/auth"
import { useNavigate } from "react-router-dom";

const Register = () => {
    const navigate = useNavigate()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name,setName] = useState("")

    async function handleRegister() {
       createUserWithEmailAndPassword(auth, email, password,name).then((userCreds) =>{
            console.log(userCreds.user)
            // navigate("/")
        }).catch(err=>{
            console.log(err)
        })
    }

    return(
        <div style={{backgroundColor:"#f15a24",height:"100vh",width:"99.1vw",marginLeft:"0.1rem"}}>
          <Row>
            <Col> 
            <img src={SignupImg}  style={{width:"35rem",margin:"7rem"}}/>
            </Col>
            <Col>
            
            <div style={{marginLeft:"8rem",marginTop:"15rem "}}>
                     <Form>
                           <h1 style={{fontFamily:"cursive",color:"white"}}>CINEMA ELK</h1>

                            <div style={{display:"flex",justifyContent:"space-between",width:"75%",marginTop:"1rem",}}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Control type="email" placeholder="Enter Username" 
                                    // onChange={(e) => setEmail(e.currentTarget.value)}
                                    onChange={(e) => setEmail(e.currentTarget.value)}
                                    style={{height:"3rem"}}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Control type="password" placeholder="Enter Password" 
                                    onChange={(e) => setPassword(e.currentTarget.value)}
                                    style={{height:"3rem"}}/>
                                </Form.Group>
                               
                            </div>
                                <Form.Group className="mb-3" controlId="formBasicName">
                                    <Form.Control type="name" placeholder="Enter Name" 
                                    onChange={(e)=>setName(e.currentTarget.value)}
                                    style={{width:"75%",height:"3rem"}} />
                                </Form.Group>
                            <Button 
                            onClick={handleRegister}
                            style={{background:"#216ad9",border:"2px solid white",width:"75%",color:"white",backgroundColor:"#f15a24",height:"3rem"}} variant="outline-secondary" type="button">
                                Login
                            </Button>
                            <div style={{color:"white" ,marginTop:"2rem",marginLeft:"9rem",}}>
                                Already a member, <span onClick={() => navigate("/login")} style={{color:"white",borderBottom:"1px solid white"}}>Click here</span>
                            </div>
                        </Form>
                </div>
            {/* <div >
             <Input style={{margin:"1rem"}} placeholder="Enter Name"/>
             <Input onChange={(e) => setEmail(e.currentTarget.value)} style={{margin:"1rem"}} placeholder="Enter Email"/>
              <Input onChange={(e) => setPassword(e.currentTarget.value)} style={{margin:"1rem"}} placeholder="Enter Password" type="password"/>
             <Button onClick={() => {
                handleRegister
                // setEmail('')
                // setPassword('')
            }} 
                style={{margin:"1rem",backgroundColor:"blue"}}>Login</Button>
          </div> */}
            </Col>
          </Row>
        </div>
    )
}

export default Register