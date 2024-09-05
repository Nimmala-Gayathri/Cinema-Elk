import { useEffect, useState } from 'react';
import './App.css'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Logo from "./assets/logo.png"
import {Col, Row} from "react-bootstrap"
import home from "./assets/home.png"
import review from "./assets/rating.png"
import profile from "./assets/user.png"
import { Route, Routes, useNavigate } from 'react-router-dom';
import Home from './componets/Home';
import Reviews from './componets/Reviews';
import Login from './componets/Login';
import Signup from "./componets/Signup"
import { onAuthStateChanged,signOut } from 'firebase/auth';
import { auth } from './Firebase';
import axios from "axios"
import ReviewPost from './componets/ReviewPost';
import Profile from './componets/Profile';


const NowPlaying = "https://api.themoviedb.org/3/movie/now_playing?api_key=841838d080f996eb28fba97862e07733&language=en-US&page=1"
const UpComing = "https://api.themoviedb.org/3/movie/upcoming?api_key=841838d080f996eb28fba97862e07733&language=en-US&page=1"
const TopRated = "https://api.themoviedb.org/3/movie/top_rated?api_key=841838d080f996eb28fba97862e07733&language=en-US&page=1"
const Popular = "https://api.themoviedb.org/3/tv/popular?api_key=841838d080f996eb28fba97862e07733&language=en-US&page=1"



function App() {
  const [nowp,setNowp] = useState([])
  const [upCome,setUpCome] = useState([])
  const [topRate,setTopRate] = useState([])
  const [popular,setPopular] = useState([])

  useEffect(()=>{
      axios.get(NowPlaying).then((resp)=>{
          // console.log(resp.data.results)
          setNowp(resp.data.results)
      })
  },[])
  useEffect(()=>{
      axios.get(Popular).then((resp)=>{
          // console.log(resp.data.results)
          setPopular(resp.data.results)
      })
  },[])
  useEffect(()=>{
      axios.get(TopRated).then((resp)=>{
          // console.log(resp.data.results)
          setTopRate(resp.data.results)
      })
  },[])
  useEffect(()=>{
      axios.get(UpComing).then((resp)=>{
          setUpCome(resp.data.results)
          // console.log(resp.data.results)
      })
  },[])
  

  const navigate = useNavigate()
  const [isAuthenticated, setIsAuthenticated] = useState(null)
  // const [user, setUser] = useState(null)
  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setIsAuthenticated(true)
        // setUser(null)
        navigate("/")
        console.log("User has been loggedin")
      }else{
        setIsAuthenticated(false)
        // setUser(null)
        navigate("/login")
        console.log("No user loggedin")
      }
    })
    // return() => unsubscribe(); 
  },[])
  if (isAuthenticated === null) {
    return null; 
  }
  const handleLogout = () => {
    signOut(auth).then((resp)=>{
          navigate("/login")
      })
  };
  return (
    <div>
      {isAuthenticated && (
        <>
          <div className='fixed2'>
            <Box sx={{ flexGrow: 1, backgroundColor:"white",width:"100vw"}} >
              <AppBar position="static" sx={{ backgroundColor: '#f15a24' }}>
               <Toolbar>
                  <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                      <div style={{display:"flex",alignItems:"center"}}>
                        <img src={Logo} style={{width:"3rem",margin:"0.5rem"}}/>
                        CINEMA ELK
                      </div>
                    </Typography>
                   <Button onClick={handleLogout} color="inherit">Logout</Button>
                </Toolbar>
              </AppBar>
           </Box>
          </div>
        </>
      )}
      <Row style={{width:"99vw"}}>
        {isAuthenticated && (
          <>
            <Col lg={1} >
              <div className='fixed' >
                <img onClick={() => {
                  //  console.log('gayathri')
                   navigate("/")
                   }} 
                 src={home} style={{width:"3rem",margin:"1rem",marginLeft:"2rem",marginTop:"2rem",borderRadius:"40%",backgroundColor:"#5271ff",padding:"5px"}}
                />
                <img onClick={() => {
                  navigate("/reviews",{state:{nowp,popular,upCome,topRate}})
                  }}
                  src={review} style={{width:"3rem",margin:"1rem",marginLeft:"2rem",marginTop:"2rem",borderRadius:"40%",backgroundColor:"#5271ff",padding:"5px"}}
                />
                <img 
                  onClick={() => navigate('/profile')}
                  src={profile} style={{width:"3rem",margin:"1rem",marginLeft:"2rem",marginTop:"2rem",borderRadius:"40%",backgroundColor:"#5271ff",padding:"5px"}
                  }/>
              </div>
            </Col>
            <Col style={{padding:"2rem"}}>
                <Routes>
                  <Route path='/' element={<Home nowp={nowp} upCome={upCome} popular={popular} topRate={topRate}/>}/>
                  <Route path="/reviews" element={<Reviews/>}/>
                  <Route path="/reviewPost/:id" element={<ReviewPost/>}/>
                  <Route path = "/profile" element={<Profile/>}/>
               </Routes>
            </Col>
          </>
        )}
     </Row>
     {!isAuthenticated && (
        <Routes>
          <Route path ="/login" element={<Login/>}/>
          <Route path ="/signup" element={<Signup/>}/>
        </Routes>
      )}
    </div>
  )
}
export default App