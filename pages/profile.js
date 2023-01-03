import React from "react";
import { withPageAuthRequired } from "@auth0/nextjs-auth0";
import Layout from "../components/Layout";
import LogoutButton from "../components/LogoutButton";
import styled from "styled-components";

const Profile = ({ user }) => {
  return (
    <Layout>
      <ProfileStyled>
        <img src={user.picture} referrerpolicy="no-referrer" />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <LogoutButton />
      </ProfileStyled>
    </Layout>
  );
};

export default Profile;

export const getServerSideProps = withPageAuthRequired();

const ProfileStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${(props) => props.theme.fontColor};
  gap: 2em;

  img {
    border-radius: 100%;
  }
`;
