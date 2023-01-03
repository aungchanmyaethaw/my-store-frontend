import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Link from "next/link";
import { useAppContext } from "../contexts";
import { currencyFormatter } from "../utils";
import { motion } from "framer-motion";

const lightTheme = {
  cardBackgroundColor: "#fff",
  border: "transparent",
  linkColor: "#fff",
  linkBackground: "#222",
};

const darkTheme = {
  cardBackgroundColor: "#222",
  border: "#ddd",
  linkColor: "#fff",
  linkBackground: "#222",
};

const ProductCard = ({ product }) => {
  const { title, description, price, image, slug } = product.attributes;

  const { theme } = useAppContext();

  const boxShadow =
    "0 10px 15px -3px rgb(0 0 0 / 0.1) , 0 4px 6px -4px rgb(0 0 0 / 0.1)";
  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <ProductCardContainerStyled
        whileHover={{
          scale: 1.05,
          boxShadow,
        }}
        transition={{ duration: 0.2 }}
      >
        <ImageContainerStyled>
          <img src={image.data.attributes.formats.small.url} />
        </ImageContainerStyled>
        <ProductInfoStyled>
          <h2>{title}</h2>
          <span>{currencyFormatter.format(price)}</span>
          <Link href={`/products/${slug}`}>Details</Link>
        </ProductInfoStyled>
      </ProductCardContainerStyled>
    </ThemeProvider>
  );
};

export default ProductCard;

const ProductCardContainerStyled = styled(motion.div)`
  padding: 1em;
  border-radius: 12px;
  background-color: ${(props) => props.theme.cardBackgroundColor};
  border: 2px solid ${(props) => props.theme.border};
`;

const ImageContainerStyled = styled.div`
  width: 100%;
  margin-bottom: 1em;
  img {
    width: 100%;
    object-fit: cover;
  }
`;

const ProductInfoStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  h2 {
    font-size: 1.25rem;
    color: ${(props) => props.theme.fontColor};
    margin-bottom: 0.5em;
  }
  span {
    color: ${(props) => props.theme.fontColor};
    margin-bottom: 1em;
  }

  a {
    display: block;
    padding: 0.5em 1em;
    margin-top: 2em;
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
