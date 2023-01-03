import React from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import styled from "styled-components";

import LoginButton from "./LoginButton";
import { useRouter } from "next/router";
const UserMenuItem = () => {
  const { user, error, isLoading } = useUser();
  const router = useRouter();
  if (!user) {
    return (
      <div styles={{ display: "flex", alignItems: "center" }}>
        <LoginButton />
      </div>
    );
  }
  return (
    <ProfileStyled onClick={() => router.push("/profile")}>
      <img src={user.picture} alt={user.name} />
      <h3>{user.name}</h3>
    </ProfileStyled>
  );
};

export default UserMenuItem;

const ProfileStyled = styled.div`
  display: flex;
  color: ${(props) => props.theme.fontColor};
  gap: 0.5em;
  align-items: center;
  cursor: pointer;
  img {
    width: 2rem;
    height: 2rem;
    border-radius: 100%;
  }
`;
