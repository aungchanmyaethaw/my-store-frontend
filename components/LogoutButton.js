import React from "react";
import Link from "next/link";
import styled from "styled-components";
const LogoutButton = () => {
  return (
    <Logout>
      <Link href="/api/auth/logout">Logout</Link>
    </Logout>
  );
};

export default LogoutButton;

const Logout = styled.div`
  a {
    display: block;
    font-size: 1rem !important;
    padding: 0.5em 1em;
    text-transform: uppercase;
    color: ${(props) => props.theme.linkColor};
    font-weight: 600;
    background-color: ${(props) => props.theme.linkBackground};
    border: 2px solid ${(props) => props.theme.border};
    outline: none;
    box-shadow: none;
    border-radius: 8px;
    transition: background-color 200ms ease-in-out;
    cursor: pointer;
  }
`;
