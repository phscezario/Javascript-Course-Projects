import React from 'react';
import * as S from './styles';

const UserInfos = ({ props }) => {
    return (
        <>
            <S.UserInfos>
                <h3>Username:</h3>
                <a
                  href={props.user.html_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  {props.user.login}
                </a>
              </S.UserInfos>
              <S.UserInfos>
                <h3>Company:</h3>
                <span>{props.user.company}</span>
              </S.UserInfos>
              <S.UserInfos>
                <h3>Location:</h3>
                <span>{props.user.location}</span>
              </S.UserInfos>
              <S.UserInfos>
                <h3>Blog:</h3>
                <a href={props.user.blog} target="_blank" rel="noreferrer">
                  {props.user.blog}
                </a>
              </S.UserInfos>
        </>
    );
};

export default UserInfos;