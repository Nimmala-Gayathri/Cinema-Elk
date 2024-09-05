import { collection, deleteDoc, getDocs, query,where ,doc, updateDoc} from "firebase/firestore";
import {db} from "../Firebase"
import React, { useEffect, useState } from "react";
import { Card, CardContent, Typography, Box, Button ,CardMedia,Dialog,DialogActions,DialogContent,DialogTitle,TextField, preReleaseNumber,} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from "@mui/icons-material/StarBorder";
import deleteImg from "../assets/delete.png"
import editIng from '../assets/edit.png'

const movieImg = "https://image.tmdb.org/t/p/w500"


const Profile = () =>{
    const [reviews,setReviews] = useState([])
    const [expanded, setExpanded] = useState({}); 
    const [editOpen,setEditOpen] = useState(false);
    const [currentReview,setCurrentReview] = useState({id:"", text:"", rating:""})

    useEffect(()=>{
        const fetchAlldata = async ()=>{
            const collectionReference = collection(db, 'Reviews')
            const queryData = query(collectionReference,where("name","==","Gayathri"))
            const documets = (await getDocs(queryData)).docs.map(doc=>({
                id: doc.id,
                ...doc.data()
            }))
            // console.log(documets)
            setReviews(documets)
        }
        fetchAlldata()
    },[])
    const toggleExpand = (id) => { 
        setExpanded(prevState => ({
            ...prevState,
            [id]: !prevState[id] 
        }));
    };
    const renderStars = (rating) =>{
        const star = []
        for(let i=1; i<=5 ; i++){
            star.push(i<= rating ? <StarIcon key = {i} style={{ color: 'gold' ,marginBottom:"0.5rem" }} /> : <StarBorderIcon key={i} style={{ color: 'gray',marginBottom:"0.5rem" }} /> )
        }
        return star
    }
    const handleDelete = (reviewId) =>{
        const deletButton = deleteDoc(doc(db,"Reviews",reviewId))
        deletButton.then(()=>{
            setReviews(prevReviews => prevReviews.filter(review => review.id !== reviewId))
        })
    }
    const handleEdit = (review) =>{
        setCurrentReview({
            id: review.id,
            text: review.text,
            rating : review.rating
            })
        setEditOpen(true)
    }
    const handleEditSubmit = () =>{
        const collectionReview = doc(db,"Reviews",currentReview.id)
        updateDoc(collectionReview,{
            text:currentReview.text,
            rating:currentReview.rating
        }).then(()=>{
            setReviews(prevReviews =>
                prevReviews.map(review =>
                    review.id === currentReview.id ? { ...review, text:currentReview.text, rating:currentReview.rating} : review
                )
            )
            setEditOpen(false)
        })
    }
    
    const handleRatingChange = (newRating) => {
        setCurrentReview(prevReview => ({
            ...prevReview,
            rating: newRating
        }));
    };
    return(
        <div>
            <div >
            <Dialog  
              PaperProps={{
                style: {
                    width:"30rem",
                    height: '300px',  // Adjust height as needed
                    maxHeight: '90vh',  // You can set max-height to prevent overflow
                },}}
            maxWidth="md" open={editOpen} onClose={() => setEditOpen(false)}>
                 <DialogTitle>Edit Your Review</DialogTitle>
                <DialogContent>
                 <TextField
                    autoFocus
                    margin="dense"
                    label="Your Review"
                    type="text"
                    multiline
                    fullWidth
                    variant="standard"
                    value={currentReview.text}
                   onChange={(e) => setCurrentReview({ ...currentReview, text: e.target.value })}
                 />
                  <Box mt={2}>
                            <TextField 
                             margin="dense"
                             label="Rating (0-5)"
                             type="number"
                             fullWidth
                             variant="standard"
                             value={currentReview.rating}
                             onChange={(e) =>handleRatingChange(e.target.value)}
                              />
                               <Box mt={1} display="flex">
                                  {renderStars(currentReview.rating)}
                       </Box>
                </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)}>Cancel</Button>
                    <Button onClick={handleEditSubmit} color="primary">Save</Button>
                </DialogActions>
            </Dialog>

            </div>
             <div style={{
              
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)', 
              gap: '20px', 
              margin: '20px',
              marginLeft:"10rem"
          }}>
              {reviews.map((review, index) => (
                  <div key={index} style={{ margin: "1rem" }}>
                      <Card style={{padding: '20px',border: '1px solid #ccc',borderRadius: '8px',width:"40rem",display: 'flex',alignItems:"flex-start",}}>
                              <Box sx={{ display: 'flex', flexDirection: 'column', width:"60%"}}>
                              <CardContent sx={{ flex: '1 0 auto' }}>
                                  <Typography component="div" variant="h5"
                                  style={{borderBottom:"2px solid gray",width:"15rem",marginBottom:"1rem"}}>
                                   <h5>{review.name}</h5>
                                  </Typography>
                                      <Box> {renderStars(review.rating)}</Box>
                                  <Typography
                                      variant="subtitle1"
                                      component="div"
                                      style={{
                                          maxHeight: expanded[review.id] ? 'none' : '7rem',
                                          overflow: expanded[review.id] ? 'visible' : 'hidden',
                                          textOverflow: 'ellipsis',
                                          // whiteSpace: expanded[review.id] ? 'normal' : 'nowrap',
                                          paddingRight:"1rem"
                                      }}>
                                      {review.text}
                                  </Typography>
                                  <Button
                                      onClick={() => toggleExpand(review.id)}
                                      style={{
                                          backgroundColor: '#5271ff',
                                          // border: 'none',
                                          color: 'white',
                                          cursor: 'pointer',
                                          padding: "0.5rem",
                                          fontSize: '1rem',
                                          marginTop: '5px',
                                          marginTop:"1rem"
                                      }}
                                  >
                                      {expanded[review.id] ? "Read Less" : "Read More"}
                                  </Button>
                                  <Button 
                                  onClick={()=>handleEdit(review)}
                                  style={{backgroundColor:"#fec164",borderRadius:"60%", marginLeft:"1rem",marginTop:"1rem",width:"1rem"}}>
                                    <img src={editIng}
                                    style={{width:"2.2rem",padding:"1px"}} />
                                  </Button>
                                  <Button 
                                   onClick={()=>handleDelete(review.id)}
                                  style={{backgroundColor:"#fe6262",borderRadius:"60%", marginLeft:"1rem",marginTop:"1rem",width:"1rem"}}>
                                    <img src={deleteImg} alt=""  style={{width:"2.2rem",padding:"1px"}}/>
                                  </Button>
                              </CardContent>
                              <CardMedia
                                //   onClick={()=>handleNaviagte(review)}
                                   component="img"
                                  sx={{ width: 151}}
                                   image={movieImg + review.poster}
                                   alt="Live from space album cover"
                                   style={{ marginLeft: '25rem', flexShrink: 0,position:"absolute",width:"12rem" }} 
                              />
                  
                          </Box>
              
                  
                      </Card>   
    
                  </div>
              ))}
          </div> 

        </div>
    )
}
export default Profile;