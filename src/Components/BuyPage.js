import React,{useState,useEffect} from "react";

import Axios from "axios";
import CartItem from "./CartItem"

import { faker } from '@faker-js/faker';


import {Container,Row,Col} from "reactstrap";


const apiKey="0Y8RvV83ANXUpAhMJl37U7Unt8jGu879PI2rPzp9isSb2xvaKsNLO55O"

const url="https://api.pexels.com/v1/search/?page=2&per_page=6&query=laptop"

// https://www.myjsons.com/v/754d1091

const BuyPage=({addInCart})=>{

    const [product,setProduct]=useState([]);

    const fetchPhotos=async()=>{
        const {data} = await Axios.get(url,{
            headers:{
                Authorization:apiKey
            }
        })

        console.log(data)

        const {photos}=data

        console.log(photos)

        const allProduct=photos.map(photo=>({
            smallImage:photo.src.medium,
            tinyImage:photo.src.tiny,
            productName:faker.name.firstName(),
            productPrice:faker.finance.amount(),
            id:faker.datatype.uuid()

        }));

        setProduct(allProduct)
    }


    useEffect(()=>{
        fetchPhotos();
    },[])
    return (
        <Container fluid>
            <h1 className="text-success text-center">Buy Page</h1>

            <Row>
                {product.map(product=>(
                  <Col md={4} key={product.id}>
                        <CartItem product={product} addInCart={addInCart} />
                  </Col>
                ))}
            </Row>
        </Container>
    )
}

export default BuyPage;