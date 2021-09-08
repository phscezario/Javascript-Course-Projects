import React, { useState } from 'react';
import { useSelector } from 'react-redux';

import logo from '../../assets/logo.svg';
import restaurantImg from '../../assets/restaurant-fake.png';

import TextField, { Input } from '@material/react-text-field';
import MaterialIcon from '@material/react-material-icon';
import { Wrapper, Aside, Main, Search, Logo, Carousel, CarouselTitle, ModalTitle, ModalContent } from './styles';
import { Card, RestaurantCard, Modal, Map, Loader, Skeleton } from '../../components';

const Home = () => {
    const [inputValue, setInputValue] = useState('');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [modalOpened, setModalOpened] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state) => state.restaurants);

    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true,
      };

    function handleKeyPress(e) {
        if (e.key === 'Enter') {
            setQuery(inputValue);
        }
    }

    function handleOpenModal(placeId) {
        setPlaceId(placeId);
        setTimeout(() => {
            setModalOpened(true);
            
        }, 10);
    }

    return (
        <Wrapper>
            <Aside>
                <Search>
                    <Logo><img src={logo} alt="Restaurant logo" /></Logo>
                    <TextField
                        label='Pesquisar'
                        outlined
                        //onTrailingIconSelect={() => this.setState({value: ''})}
                        trailingIcon={<MaterialIcon role="button" icon="search"/>}
                    >
                        <Input 
                            value={inputValue}
                            onKeyPress={handleKeyPress}
                            onChange={(e) => setInputValue(e.target.value)} />
                    </TextField>
                    {restaurants.length > 0 ? (
                        <>
                            <CarouselTitle>Na sua Área</CarouselTitle>
                            <Carousel {...settings}>
                                {restaurants.map((restaurant) => (
                                    <Card 
                                        photo={restaurant.photos ? restaurant.photos[0].getUrl() : restaurantImg}
                                        title={restaurant.name} 
                                        key={restaurant.place_id} />
                                ))}
                            </Carousel>
                        </>
                    ) : (
                        <Loader />
                    )}                    
                </Search>
                {restaurants.map((restaurant) => (
                    <RestaurantCard 
                        onClick={() => handleOpenModal(restaurant.place_id)} 
                        restaurant={restaurant} 
                        key={restaurant.place_id}/>
                ))}
            </Aside>
            <Main>
                <Map query={query} placeId={placeId} />
            </Main>
            <Modal 
                open={modalOpened} 
                onClose={() => (
                    setModalOpened(!modalOpened))} >
                    {restaurantSelected ? (
                        <>
                   
                            <ModalTitle>{restaurantSelected?.name}</ModalTitle>
                            <ModalContent>{restaurantSelected?.formatted_phone_number}</ModalContent>
                            <ModalContent>{restaurantSelected?.formatted_address}</ModalContent>
                            <ModalContent>
                                {restaurantSelected?.opening_hours?.isOpen() 
                                    ? 'Aberto agora' 
                                    : 'Fechado nesse momento'}
                            </ModalContent>
                        </>
                    ) : (
                        <>
                            <Skeleton width="10px" height="10px" />
                            <Skeleton width="10px" height="10px" />
                            <Skeleton width="10px" height="10px" />
                            <Skeleton width="10px" height="10px" />
                        </>
                    )}          
            </Modal>          
        </Wrapper>
    );    
};

export default Home;