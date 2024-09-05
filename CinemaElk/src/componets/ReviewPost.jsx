import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {Row,Col,Card} from "react-bootstrap"
import axios from "axios";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField,Box } from "@mui/material";
import { db } from "../Firebase";
import {collection ,addDoc} from "firebase/firestore"
import StarIcon from '@mui/icons-material/Star';

const movieImg = "https://image.tmdb.org/t/p/w500"

export default function ReviewPost () {
  
    const [similarMovies,setSimilarMovies] = useState([])
    const [cast,setCast] =useState([])
    const [crew,setCrew] =useState([])
    const [reviews,setReviews] = useState([])
    const [open, setOpen] = useState(false);
    const [inputValue,setInputValue] = useState("") 
    const [rating,setRating] = useState(0)
    const [name,setName] = useState("")
    const location = useLocation();
    const { id, title, overview, poster_path } = location.state;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

    const Star = ({ filled }) => (
        <span style={{ color: filled ? "gold" : "gray", fontSize: "2rem" }}>
          ★
        </span>
      );
      const StarRating = ({ rating, maxRating = 5 }) => {
        const stars = Array.from({ length: maxRating }, (_, index) => (
          <Star key={index} filled={index < rating } />
        ));
      
        return <div>{stars}</div>;
      };
    useEffect(()=>{
        if(id){
            const similar = `https://api.themoviedb.org/3/movie/${id}/similar?api_key=841838d080f996eb28fba97862e07733&language=en-US&page=1`
            axios.get(similar).then((resp)=>{
            // console.log(resp.data.results)
            setSimilarMovies(resp.data.results)
        })
        }
        
    },[id])
    useEffect(()=>{
       if(id){
        const cast =  `https://api.themoviedb.org/3/movie/${id}/credits?api_key=841838d080f996eb28fba97862e07733&language=en-US%27`
        axios.get(cast).then((resp)=>{
            // console.log(resp.data.crew)
            setCast(resp.data.cast)
            setCrew(resp.data.crew)
        })
       }
    },[id])
    useEffect(()=>{
       if(id){
        const review = `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=841838d080f996eb28fba97862e07733&language=en-US&page=1`
        axios.get(review).then((resp)=>{
            // console.log(resp.data.results)
            setReviews(resp.data.results.slice(0, 7))
        })
       }
    },[id])
    const handleSubmit = async () => {
        try {
          await addDoc(collection(db, "Reviews"), {
            text: inputValue,
            name: name,
            title: title,
            rating: rating,
            movieId: id,
            poster: poster_path,
            overview: overview,
            timestamp: new Date(),
          });
          console.log("Document successfully written!");
          setOpen(true);
          setInputValue("")
          handleClose()
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      };

   
    const handleRatingChange = (e) =>{
        const value = Math.min(Math.max(e.target.value,0),5)
        setRating(value)
    }
    const renderStars = () => {
        return Array.from({ length: 5 }, (_, index) => (
          <StarIcon key={index} style={{ color: index < rating ? "gold" : "gray" }} />
        ));
      };
    return(
        <div>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Enter your reviw here</DialogTitle>
                     <DialogContent style={{width:"25rem"}}>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Your Review"
                          type="text"
                          fullWidth
                          variant="standard"
                          value={inputValue}
                          onChange={(e)=>setInputValue(e.currentTarget.value)}
                        /><br/>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Your Name"
                          type="text"
                          fullWidth
                          variant="standard"
                          value={name}
                          onChange={(e)=>setName(e.currentTarget.value)}
                        />
                         <Box mt={2}>
                            <TextField 
                             margin="dense"
                             label="Rating (0-5)"
                             type="number"
                             fullWidth
                             variant="standard"
                             value={rating}
                             onChange={handleRatingChange}
                              />
                               <Box mt={1} display="flex">
                                 {renderStars()}
                             </Box>
                         </Box>
                    </DialogContent>
                    <DialogActions>
                   <Button onClick={handleClose}>Close</Button>
                   <Button onClick={handleSubmit} color="primary">
                         Submit
                    </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Row>
                <Col>
                <div>
                    <img src={movieImg + poster_path} style={{height:"35rem",marginLeft:"1rem",marginBottom:"1rem",borderRadius:"20px"}}/>
                    <h2 style={{marginLeft:"1rem",marginBottom:"1rem"}}>{title}</h2>
                    <p style={{width:"90%",marginLeft:"1rem",marginBottom:"1.5rem"}}>{overview}</p>
                    <Button   variant="text" onClick={handleClickOpen} style={{marginLeft:"1rem",marginBottom:"1rem",backgroundColor:"#f15a24",border:"none",width:"30%",height:"3rem",color:"black"}}>Post Review</Button>
                </div>
                <div style={{marginLeft:"1rem"}}>
                    <h3 >Cast&Crew</h3>
                    <div style={{display: "flex", overflowX: "scroll",width:"40%", position:"absolute",marginBottom:"5rem"}}>
                        {cast.map((castValue,index)=>{
                            return(
                                <div key={index} style={{margin:"6px"}}>
                                    <img src={movieImg + castValue.profile_path} style={{width:"5rem",borderRadius:"50%"}}/>
                                    <p style={{width:"4rem",textAlign:"center"}}>{castValue.name}</p>
                                </div>
                            )
                        })}
                        {
                            crew.map((crew,index)=>{
                                return(
                                    <div key={index}>
                                        <img src={movieImg + crew.profile_path} style={{width:"5rem",borderRadius:"50%"}}/>
                                        <p style={{width:"4rem",textAlign:"center"}}>{crew.name}</p> 
                                    </div>
                                )
                            })
                        }
                    </div>
                </div >
                <div style={{marginTop:"12rem",marginLeft:"1rem"}}>
                    <h3 >Similar Movies</h3>
                    <div style={{display:'flex',flexWrap:"wrap"}}>  
                    {
                        similarMovies.map((simMovie,index)=>{
                            return(
                                <div key={index} style={{margin:"4px",padding:"5px"}}>
                                    <img src={movieImg + simMovie.poster_path} style={{width:"9rem",borderRadius:"16px"}}/>
                                    <h6 style={{width:"9rem"}}>{simMovie.title}</h6>
                                </div>
                            )
                        })
                    }

                    </div>
                    </div>

                </Col>
                <Col>
                <div>
                    <h3>Reviews by CINEMA ELK</h3>
                    <div>
                        {reviews.map((review,index)=>{
                            return(
                                <div  key={index} style={{margin:"1rem"}}>
                                    <Card  style={{padding:"1rem"}}>
                                    <p>{review.content}</p>
                                    <div style={{display:"flex",justifyContent:"space-between"}}>
                                        <h6>{review.author}</h6>
                                        <div> {review.author_details.rating ? (
                                              <StarRating rating={Math.round(review.author_details.rating / 2)} />
                                              ) : (
                                            <span>no rating</span>
                                         )}</div>
                                        </div>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>

                </Col>
            </Row>
        </div>
    )
}