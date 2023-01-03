import React, { useState } from "react";
import styled from "styled-components";
import { useQuery } from "urql";
import { motion } from "framer-motion";
import Layout from "../../components/Layout";
import ProductCard from "../../components/ProductCard";
import { GET_PRODUCTS, GET_CATEGORIES } from "../../libs/products";
const Products = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [results, reexecuteQuery] = useQuery({
    query: GET_PRODUCTS,
    variables: selectedCategory
      ? {
          filters: { category: { slug: { eq: selectedCategory } } },
        }
      : null,
  });

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    reexecuteQuery({ requestPolicy: "network-only" });
  };

  const [categoryResults] = useQuery({ query: GET_CATEGORIES });

  const { fetching, error, data } = results;

  const {
    fetching: categoryFetching,
    error: categoryError,
    data: categoryData,
  } = categoryResults;

  if (fetching || categoryFetching) {
    return <div>Loading...</div>;
  }

  if (error || categoryError) {
    return <div>{error.message}</div>;
  }

  const products = data.products.data;
  const categories = categoryData.categories.data;

  const textMotion = {
    initial: { x: 0, background: "#ddd" },
    hover: { x: "10%", background: "#fff" },
    transition: { type: "tween" },
  };

  const sidebarListMotion = {
    initial: { background: "#ddd" },
    hover: {
      background: "#fff",
    },
    transition: { type: "tween" },
  };

  return (
    <Layout>
      <FlexContainer>
        <AsideContainer>
          <ul>
            {categories.map((category) => (
              <motion.li
                variants={sidebarListMotion}
                initial="initial"
                whileHover="hover"
                animate="initial"
                transition="transition"
                key={category.attributes.slug}
                onClick={() => handleCategorySelect(category.attributes.slug)}
              >
                <motion.span variants={textMotion} transition="transition">
                  {category.attributes.name}
                </motion.span>
              </motion.li>
            ))}
          </ul>
        </AsideContainer>
        <AllProducts>
          <GridContainerStyled>
            {products.map((product) => (
              <ProductCard key={product.attributes.slug} product={product} />
            ))}
          </GridContainerStyled>
        </AllProducts>
      </FlexContainer>
    </Layout>
  );
};

const FlexContainer = styled.div`
  display: flex;
  column-gap: 2em;
`;

const GridContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  justify-items: center;
  grid-gap: 1em;
`;

const AsideContainer = styled.aside`
  flex-basis: 25%;
  background-color: var(--secondary);

  ul {
    overflow: hidden;

    li {
      padding: 1em;
      list-style: none;
      font-size: 1.25rem;
      font-weight: 600;
      cursor: pointer;

      span {
        width: 100%;
        display: block;
      }

      & + li {
        margin-top: 1em;
      }
    }
  }
`;

const AllProducts = styled.div`
  flex-grow: 1;
`;

export default Products;
