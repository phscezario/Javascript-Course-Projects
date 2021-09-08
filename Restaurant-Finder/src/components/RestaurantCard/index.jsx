import React, { useState } from "react";
import ReactStars from "react-rating-stars-component";
import { Restaurant, RestaurantInfo, Title, Address, RatingStars, RestaurantPhoto } from "./styles";
import Skeleton from '../Skeleton';


import restaurantImg from '../../assets/restaurant-fake.png';

export default ({ restaurant, onClick }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    
    return (
        <Restaurant onClick={onClick}>
            <RestaurantInfo>
                <Title>{restaurant.name}</Title>
                <RatingStars>
                    <ReactStars
                        count={5}
                        edit={false}
                        activeColor="#e7711c"
                        isHalf
                        value={restaurant.rating}
                    />
                </RatingStars>
                <Address>{restaurant.vicinity || restaurant.formatted_address}</Address>
            </RestaurantInfo>
            <RestaurantPhoto 
                imageLoaded={imageLoaded}
                src={restaurant.photos ? restaurant.photos[0].getUrl() : restaurantImg} 
                onLoad={() => setImageLoaded(true)}
                alt="Foto do restaurante"
            />
            {!imageLoaded && <Skeleton width="100px" height="100px" />}
        </Restaurant>
    );
};