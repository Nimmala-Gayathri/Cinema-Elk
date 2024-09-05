import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

import { Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";



const movieImg = "https://image.tmdb.org/t/p/w500"

export default function Home( { nowp,topRate,popular,upCome}){
    const navigate = useNavigate()
    const handleClick = (movie) =>{
        navigate('/reviewPost/'+ movie.id, {state:{ 
            // id:movie.id,
            id: movie.id,
            title: movie.title || movie.name,
            overview: movie.overview ,
            poster_path: movie.poster_path,
            nowp, topRate, popular, upCome
            // title: movie.title,
            // overview: movie.overview,
            // poster_path:movie.poster_path

        }})
    }
       return(
        <div >
           <div>
                <h3 style={{marginLeft:"10rem" }}>Now Playing</h3>
                <div style={{display: "flex", overflowX: "scroll", scrollbarWidth: "none", msOverflowStyle: "none", marginLeft: "8rem" }}>
                   <div style={{display: "flex"}}>
                      {nowp.map((item,index)=>{
                        return(
                        <div key={index} >
                            <Card style={{ width: '18rem',margin:"2rem",border:"none",textAlign:"center",border:"none",textAlign:"center" }}>
                              <Card.Img src={movieImg+item.poster_path} variant="top" style={{borderRadius:"28px"}} onClick={()=>handleClick(item)}/>
                              <Card.Title  style={{marginTop:"1rem"}}>{item.title}</Card.Title>
                            </Card>
                        </div>
                        )
                        })}
                    </div>
                </div>
            </div>
            <div>
                <h3 style={{marginLeft:"10rem" }}>Popular Movies</h3>
                <div style={{display: "flex", overflowX: "scroll", scrollbarWidth: "none", msOverflowStyle: "none", marginLeft: "8rem"}}>
                    <div style={{display: "flex"}}>
                        {popular.map((item,index1)=>{
                            return(
                                <div key={index1}>
                                    <Card style={{width: '18rem',margin:"2rem" ,border:"none",textAlign:"center"}}>
                                      <Card.Img variant="top" src={movieImg + item.poster_path} style={{borderRadius:"28px"}}  onClick={()=>handleClick(item)} />
                                      <Card.Title style={{marginTop:"1rem"}}>{item.name}</Card.Title>
                                    </Card>
                                </div>
                            )
                        })}
                        
                    </div>
                </div>
           </div>
            <div>
                <h3 style={{marginLeft:"10rem" }}>Top Rated</h3>
                <div style={{display: "flex", overflowX: "scroll", scrollbarWidth: "none", msOverflowStyle: "none", marginLeft: "8rem"}} >
                    <div style={{display:"flex"}}>
                        {topRate.map((item,index2)=>{
                            return(
                                <div key={index2}>
                                    <Card style={{ width: '18rem',margin:"2rem" ,border:"none",textAlign:"center"}}>
                                        <Card.Img variant="top" src={movieImg + item.poster_path} style={{borderRadius:"28px"}}  onClick={()=>handleClick(item)}/>
                                        <Card.Title style={{marginTop:"1rem"}}>{item.title}</Card.Title>
                                    </Card>
                                </div>
                            )
                        })}

                    </div>
                </div>
                
            </div>
            <div>
                <h3 style={{marginLeft:"10rem" }}>UpComing</h3>
                <div style={{display: "flex", overflowX: "scroll", scrollbarWidth: "none", msOverflowStyle: "none", marginLeft: "8rem"}}>
                    <div style={{display:"flex"}}>
                        {upCome.map((item,index3)=>{
                            return(
                                <div key={index3}>
                                     <Card style={{ width: '18rem',margin:"2rem",border:"none",textAlign:"center" }}>
                                        <Card.Img variant="top" src={movieImg + item.poster_path} style={{borderRadius:"28px"}}  onClick={()=>handleClick(item)}/>
                                        <Card.Title style={{marginTop:"1rem"}}>{item.title}</Card.Title>
                                    </Card>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}