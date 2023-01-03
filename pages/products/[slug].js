import React, { useState } from "react";
import { useRouter } from "next/router";
import { useQuery } from "urql";
import { AiFillPlusCircle } from "react-icons/ai";
import { AiFillMinusCircle } from "react-icons/ai";
import styled, { ThemeProvider } from "styled-components";
import { GET_SINGLE_PRODUCTS } from "../../libs/products";
import Layout from "../../components/Layout";
import { currencyFormatter } from "../../utils";
import { useAppContext } from "../../contexts";

const ProductDetails = () => {
  const lightTheme = {
    border: "transparent",
    buttonBackground: "#222",
    svgFill: "#222",
  };
  const darkTheme = {
    border: "#fff",
    buttonBackground: "#222",
    svgFill: "#ddd",
  };

  const { query } = useRouter();
  const [result] = useQuery({
    query: GET_SINGLE_PRODUCTS,
    variables: { slug: query.slug },
  });

  const { handleAddToCart, theme } = useAppContext();
  const { data, fetching, error } = result;
  const [qty, setQty] = useState(1);

  const handleIncreaseQty = () => {
    setQty((prev) => prev + 1);
  };

  const handleDecreaseQty = () => {
    setQty((prev) => {
      if (prev <= 1) return 1;
      return prev - 1;
    });
  };

  const handleSubmit = (product, qty) => {
    setQty(1);
    handleAddToCart(product, qty);
  };

  if (fetching) {
    return <h1>Loading...</h1>;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }

  const product = data.products.data[0].attributes;
  const { title, description, image, price } = product;
  const { url } = image.data.attributes.formats.small;

  const amountPerQty = price * qty;

  return (
    <Layout>
      <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
        <ProductDetailsContainer>
          <ProductDetailsImageWrapper>
            <img src={url} />
          </ProductDetailsImageWrapper>
          <ProductInfo>
            <h2>{title}</h2>
            <p>{description}</p>
            <span>{currencyFormatter.format(amountPerQty)}</span>
            <ProductControls>
              <div>
                <button onClick={handleDecreaseQty}>
                  <AiFillMinusCircle />
                </button>
                <span>{qty}</span>
                <button onClick={handleIncreaseQty}>
                  <AiFillPlusCircle />
                </button>
              </div>
              <AddToCartBtn onClick={() => handleSubmit(product, qty)}>
                Add to Cart
              </AddToCartBtn>
            </ProductControls>
          </ProductInfo>
        </ProductDetailsContainer>
      </ThemeProvider>
    </Layout>
  );
};

export default ProductDetails;

const ProductDetailsContainer = styled.section`
  max-width: 960px;
  margin: 0 auto;
  padding: 2em 0;
  display: flex;
  justify-content: space-between;
`;

const ProductDetailsImageWrapper = styled.div`
  flex-basis: 45%;
  display: flex;

  img {
    width: 100%;
    object-fit: cover;
  }
`;

const ProductInfo = styled.div`
  flex-basis: 49%;
  h2 {
    font-size: 2rem;
    color: ${(props) => props.theme.fontColor};
    margin: 1em 0 0.5em;
  }
  p {
    margin-bottom: 1em;
    color: ${(props) => props.theme.fontColor};
  }
  span {
    font-size: 1.75rem;
    color: ${(props) => props.theme.fontColor};
    font-weight: 600;
  }
`;

const ProductControls = styled.div`
  div {
    display: flex;
    align-items: center;
    margin-top: 0.75em;
    gap: 1em;
    button {
      width: 2rem;
      height: 2em;
      display: grid;
      place-items: center;
      background-color: transparent;
      border: none;
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
        color: ${(props) => props.theme.svgFill};
      }

      &:hover,
      &:active {
        svg {
          fill: #333;
        }
      }
    }
  }
`;

const AddToCartBtn = styled.button`
  margin-top: 2em;
  font-size: 1.25rem;
  width: 100%;
  padding: 0.5em;
  cursor: pointer;
  border: 2px solid ${(props) => props.theme.border};
  background-color: ${(props) => props.theme.buttonBackground};
  color: #fff;
  border-radius: 8px;
  transition: background-color 200ms ease-in-out;
  &:hover,
  &:active {
    background-color: #333;
  }
`;
