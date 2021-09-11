import React from 'react';
import * as S from './styles';

const StatusCount = ({ props }) => {

    return (
        <S.WrapperStatusCount>
          <div>
            <h4>Followers</h4>
            <span> {props.user.followers}</span>
          </div>
          <div>
            <h4>Followings</h4>
            <span> {props.user.following}</span>
          </div>
          <div>
            <h4>Gists</h4>
            <span> {props.user.public_gists}</span>
          </div>
          <div>
            <h4>Repos</h4>
            <span> {props.user.public_repos}</span>
          </div>
        </S.WrapperStatusCount>
    );
};

export default StatusCount;