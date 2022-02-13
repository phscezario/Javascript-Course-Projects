import React from 'react';
import * as S from './styles';

function Card({ title, subtitle, text }) {
  return (
      <>
        <S.Box>
            <S.Title>{title}</S.Title>
            <S.SubTitle>{subtitle}</S.SubTitle>
            <S.Text>{text}</S.Text>
        </S.Box>
      </>
  );
}

export default Card;