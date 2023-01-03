import Link from "next/link";
import styled from "styled-components";

const LoginButton = () => {
  return (
    <LoginBtn>
      <Link href="/api/auth/login">Login</Link>;
    </LoginBtn>
  );
};

export default LoginButton;

const LoginBtn = styled.div`
  a {
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
