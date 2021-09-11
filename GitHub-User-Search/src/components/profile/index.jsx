import React from "react";
import { StatusCount, UserInfos } from "../../components";
import useGithub from "../../hooks/github-hooks";
import * as S from "./styled";

const Profile = () => {
  const { githubState } = useGithub();

  return (
    <S.Wrapper>
      <S.WrapperImage src={githubState.user.avatar} alt="Avatar of user" />
      <S.WrapperInfoUser>
        <div>
          <h1>{githubState.user.name}</h1>
          <UserInfos props={ githubState } />
        </div>
        <StatusCount props={ githubState }/>
      </S.WrapperInfoUser>
    </S.Wrapper>
  );
};

export default Profile;
