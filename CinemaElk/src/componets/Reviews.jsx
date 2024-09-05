import React, { useEffect, useState } from "react"; 
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Firebase";
import { Card, CardContent, Typography, Box, Button ,CardMedia} from "@mui/material";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from "@mui/icons-material/StarBorder"
import { useNavigate } from "react-router-dom";
const movieImg = "https://image.tmdb.org/t/p/w500"


export default function Reviews() {
    const navigate = useNavigate()
    const [reviews, setReviews] = useState([]);
    const [expanded, setExpanded] = useState({}); 

    const fetchAllReviews = async () => {
        const collectionReference = await getDocs(collection(db, "Reviews"));
        const reviewsData = collectionReference.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
        // console.log(reviewsData)
        setReviews(reviewsData);
    };

    useEffect(() => {
        fetchAllReviews();
    }, []);

    const toggleExpand = (id) => { 
        setExpanded(prevState => ({
            ...prevState,
            [id]: !prevState[id] 
        }));
    };
    const handleNaviagte = (review) =>{
        // console.log(review)
        navigate("/reviewPost/" + review ,{state:{
            id: review.movieId,
            title: review.title, 
            overview: review.overview, 
            poster_path: review.poster 
        }})
    }

    const renderStars = (rating) =>{

        const star = []
        for(let i=1; i<=5 ; i++){
            star.push(i<= rating ? <StarIcon key = {i} style={{ color: 'gold' ,marginBottom:"0.5rem" }} /> : <StarBorderIcon key={i} style={{ color: 'gray',marginBottom:"0.5rem" }} /> )
        }
        return star
    }
    return (
        <div>
            <div style={{
              
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: '20px', 
                margin: '20px',
                marginLeft:"10rem"
            }}>
                {reviews.map((review, index) => (
                    <div key={index} style={{ margin: "1rem" }}>
                        <Card style={{
                            padding: '20px',
                            border: '1px solid #ccc',
                            borderRadius: '8px',
                            // backgroundColor: '#f9f9f9',
                            width:"40rem",
                            display: 'flex',
                            alignItems:"flex-start",
                            // justifyContent:"space-between"
                        }}>
                            
                                <Box sx={{ display: 'flex', flexDirection: 'column', width:"60%"}}>
                                <CardContent sx={{ flex: '1 0 auto' }}>
                                    <Typography component="div" variant="h5"
                                    style={{borderBottom:"2px solid gray",width:"15rem",marginBottom:"1rem"}}
                                    onClick={()=>navigate('/profile')}
                                    >
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
                                        }}
                                    >
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
                                </CardContent>
                                <CardMedia
                                    onClick={()=>handleNaviagte(review)}
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
    );
}
