import styled from 'styled-components';

export const Wrapper = styled.div`
    display: flex;
    align-items: center;
    align-content: center;
    justify-content: center;
    width: 100%;
    height: 100vh;
`;

export const Container = styled.div`
    text-align: center;
`;

export const Title = styled.h1`
    margin-bottom: 5px;
`;

export const RowRight = styled.div`
    display: flex;
    align-items: center;
    justify-content: end;
`;

export const RowLeft = styled.div`
    display: flex;
    align-items: center;
    justify-content: start;
`;


export const Button = styled.button`
    padding: 10px 20px;
    font-size: 16px;
    cursor: pointer;
    margin: 10px 0;
    border-radius: 6px;
    min-width: 130px;
`;

export const Input = styled.input`
    height: 35px;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ddd;
    text-align: left;
    padding: 5px;
    margin-bottom: 10px;
`;

export const Textarea = styled.textarea`
    height: 70px;
    width: 100%;
    border-radius: 6px;
    border: 1px solid #ddd;
    text-align: left;
    padding: 5px;
    margin-bottom: 10px;
`;

export const Label = styled.label`
    font-size: 10px;
    display: block;
    text-align: left;
`;