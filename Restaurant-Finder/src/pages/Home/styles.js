import styled from 'styled-components';
import Slider from 'react-slick';

export const Wrapper = styled.div`
    display: flex;
`;

export const Aside = styled.aside`
  background-color: ${(props) => props.theme.colors.background};
  width: 360px;
  height: 100vh;
  overflow-x: hidden;
  overflow-y: auto;
`;

export const Main = styled.main`
    height: 100vh;
    position: relative;
    overflow: hidden;
    flex: 1;
`;

export const Search = styled.section`
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #ffffff;
    padding: 16px;
    margin-bottom: 15px;
    & h3, div.mdc-text-field {
        margin-bottom: 15px;
    }
`;

export const Logo = styled.div`
    text-align: center;
    margin-bottom: 15px;
    & img {
        width: 180px;
    }
`;

export const Carousel = styled(Slider)`
    .slick-slide {
        margin-right: 16px;
    }
    .slick-slide .slick-list {
        height: 90px;
    }
`;

export const CarouselTitle = styled.h3`
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.text};
    font-size: 24px;
    font-weight: bold;
    line-height: 29px;
`;

export const ModalTitle = styled.p`
    margin-bottom: 10px;
    letter-spacing: .11px;
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.text};
    font-weight: bold;
    line-height: 29px;
`;

export const ModalContent = styled.p`
    margin-bottom: 10px;
    letter-spacing: .15px;
    font-family: ${(props) => props.theme.fonts.regular};
    color: ${(props) => props.theme.colors.text};
    line-height: 19px;
`;