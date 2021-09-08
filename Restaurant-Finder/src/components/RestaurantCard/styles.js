import styled from "styled-components";

export const Restaurant = styled.div`
    display: flex;
    justify-content: space-between;
    cursor: pointer;
    margin-top: 5px;
    padding: 16px;
    background-color: #ffffff;
    border-left: 5px solid transparent;
    transition: .2s;
    :hover {
        border-left: 5px solid ${(props) => props.theme.colors.primary};
        background-color: #cccccc;
    }
`;

export const RestaurantInfo = styled.div`
    display: flex;
    flex-direction: column;

`;

export const Title = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.text};
    font-size: 24px;
    font-weight: bold;
    line-height: 29px;
    margin-bottom: 10px;
`;

export const Address = styled.span`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.text};
    font-size: 14px;
    line-height: 19px;
    margin-bottom: 10px;
`;

export const RatingStars = styled.div`
    margin-bottom: 5px; 
`;

export const RestaurantPhoto = styled.img`
    display: ${(props) => (props.imageLoaded ? 'block' : 'none')};
    width: 100%;
    max-width: 100px;
    height: 100px;
    border-radius: 6px;
`;