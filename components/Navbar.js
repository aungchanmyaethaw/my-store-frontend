import React from "react";
import Link from "next/link";
import { AiFillShopping } from "react-icons/ai";
import styled from "styled-components";
import { motion } from "framer-motion";
import QtyBadge from "./QtyBadge";
import { useAppContext } from "../contexts";
import UserMenuItem from "./UserMenuItem";
const Navbar = () => {
  const { handleCartOpen, totalQty, handleToggleTheme, theme } =
    useAppContext();

  return (
    <NavbarStyled>
      <Link href="/">My Store</Link>
      <div>
        <ToggleBtn onClick={handleToggleTheme} data-isOn={theme == "dark"}>
          <motion.span layout transition={{ type: "spring", duration: 0.5 }} />
        </ToggleBtn>
        <UserMenuItem />
      </div>
      <ul>
        <li onClick={handleCartOpen}>
          <AiFillShopping />
          {totalQty > 0 ? <QtyBadge /> : null}
        </li>
      </ul>
    </NavbarStyled>
  );
};

export default Navbar;

const NavbarStyled = styled.nav`
  min-height: 15vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2em;

  a {
    color: ${(props) => props.theme.fontColor};

    &:first-child {
      font-size: 1.75rem;
      font-weight: 700;
    }
  }

  ul {
    list-style-type: none;

    li {
      cursor: pointer;
      position: relative;
      svg {
        font-size: 2rem;
        fill: ${(props) => props.theme.fontColor};
      }
    }
  }

  & > div {
    margin-left: auto;
    margin-right: 2em;
    display: flex;
    align-items: center;
    gap: 1.5em;
  }
`;

const ToggleBtn = styled(motion.div)`
  width: 3rem;
  height: 1.5rem;
  border-radius: 2rem;
  display: flex;
  align-items: center;
  padding: 4px;
  background-color: ${(props) => props.theme.fontColor};

  cursor: pointer;

  &[data-isOn="true"] {
    justify-content: flex-end;
  }
  & > span {
    display: block;
    height: 1rem;
    width: 1rem;
    background-color: ${(props) => props.theme.body};
    border-radius: 50%;
  }
`;
