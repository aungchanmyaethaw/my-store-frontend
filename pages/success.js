import React from "react";
import Layout from "../components/Layout";
import { useRouter } from "next/router";
import { AiFillCheckCircle } from "react-icons/ai";
import styled from "styled-components";
const stripe = require("stripe")(process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY);

const Success = ({ data }) => {
  const router = useRouter();

  return (
    <Layout>
      <SuccessContainer>
        <AiFillCheckCircle />
        <h1>Thanks you for shopping!!!</h1>
        <p>Email sent to: {data.customer_details.email}</p>
        <hr />
        <div>
          <h2>Address</h2>
          {Object.entries(data.customer_details.address).map(([key, value]) => (
            <p key={key}>
              {key}: {value}
            </p>
          ))}
        </div>
        <HomeBtn onClick={() => router.push("/")}>Back to Home</HomeBtn>
      </SuccessContainer>
    </Layout>
  );
};

export default Success;

export async function getServerSideProps(params) {
  const res = await stripe.checkout.sessions.retrieve(params.query.session_id);
  return {
    props: {
      data: res,
    },
  };
}

const SuccessContainer = styled.div`
  padding: 1em;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);
  width: 100%;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;

  h1 {
    margin: 1em 0;
    font-size: 1.5rem;
    color: var(--primary);
  }

  div {
    margin-top: 1em;
    display: flex;
    flex-direction: column;
    align-items: flex-start !important;

    p {
      margin-bottom: 1em;
      &:first-of-type {
        margin-top: 1em;
      }
    }
  }

  svg {
    font-size: 5rem;
    fill: #22c55e;
  }
`;

const HomeBtn = styled.button`
  margin-top: 2em;
  font-size: 1.25rem;
  width: 100%;
  padding: 0.5em;
  cursor: pointer;
  border: none;
  background-color: var(--primary);
  color: #fff;
  border-radius: 8px;
  transition: background-color 200ms ease-in-out;
  &:hover,
  &:active {
    background-color: #333;
  }
`;
