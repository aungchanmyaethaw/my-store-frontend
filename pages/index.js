import { GET_PRODUCTS } from "../libs/products";
import { useQuery } from "urql";
import { client, ssrCache } from "../urlClient";
import styled, { ThemeProvider } from "styled-components";
import Link from "next/link";

import { useAppContext } from "../contexts";
import ProductCard from "../components/ProductCard";
import Layout from "../components/Layout";

const lightTheme = {
  border: "transparent",
  linkColor: "#fff",
  linkBackground: "#222",
};

const darkTheme = {
  border: "#ddd",
  linkColor: "#fff",
  linkBackground: "#222",
};

export default function Home() {
  const { theme } = useAppContext();

  const [results] = useQuery({
    query: GET_PRODUCTS,
    variables: { pagination: { limit: 3 } },
  });

  const [latestResults] = useQuery({
    query: GET_PRODUCTS,
    variables: { sort: "createdAt:desc", pagination: { limit: 3 } },
  });

  const { fetching, error, data } = results;

  const {
    fetching: latestFetching,
    error: latestError,
    data: latestData,
  } = latestResults;
  if (fetching || latestFetching) {
    return <div>Loading...</div>;
  }

  if (error || latestError) {
    return <div>{error.message}</div>;
  }

  const products = data.products.data;
  const latestProducts = latestData.products.data;
  return (
    <Layout>
      <ProductContainer>
        <h1>Featured</h1>
        <GridContainerStyled>
          {products.map((product) => (
            <ProductCard key={product.attributes.slug} product={product} />
          ))}
        </GridContainerStyled>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <LinkContainer>
            <Link href="/products">See More...</Link>
          </LinkContainer>
        </ThemeProvider>
      </ProductContainer>
      <ProductContainer>
        <h1>Latest</h1>
        <GridContainerStyled>
          {latestProducts.map((product) => (
            <ProductCard key={product.attributes.slug} product={product} />
          ))}
        </GridContainerStyled>
        <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
          <LinkContainer>
            <Link href="/products">See More...</Link>
          </LinkContainer>
        </ThemeProvider>
      </ProductContainer>
    </Layout>
  );
}

const GridContainerStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(15rem, 1fr));
  justify-items: center;
  grid-gap: 1em;
`;

const ProductContainer = styled.section`
  margin-bottom: 5em;

  h1 {
    font-size: 1.75rem;
    margin-bottom: 1em;
    text-align: center;
    color: ${(props) => props.theme.fontColor};
  }
`;

const LinkContainer = styled.div`
  display: flex;
  justify-content: center;
  margin: 4em 0;

  a {
    display: block;
    padding: 1em 2em;
    border-radius: 8px;
    background-color: ${(props) => props.theme.linkBackground};
    color: ${(props) => props.theme.linkColor};
    border: 2px solid ${(props) => props.theme.border};
    font-weight: 600;
    text-transform: uppercase;
  }
`;

export async function getStaticProps() {
  await client.query(GET_PRODUCTS).toPromise();
  return {
    props: {
      urqlState: ssrCache.extractData(),
    },
    revalidate: 600,
  };
}
