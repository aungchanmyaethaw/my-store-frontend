import React from "react";
import styled from "styled-components";
import { BsFillCartFill } from "react-icons/bs";
import { AiFillMinusCircle, AiFillPlusCircle } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import { useAppContext } from "../contexts";
import { currencyFormatter } from "../utils";
import connectStripe from "../libs/connectStripe";

const CartSidebar = () => {
  const {
    isBackdropOpen,
    cartList,
    handleAddQty,
    handleSubtractQty,
    totalPrice,
  } = useAppContext();

  const handlePurchase = async () => {
    const stripe = await connectStripe();
    const res = await fetch("/api/stripe", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(cartList),
    });
    const data = await res.json();
    await stripe.redirectToCheckout({ sessionId: data.id });
  };

  return (
    <AnimatePresence>
      {isBackdropOpen && (
        <CartSidebarStyled
          initial={{ right: "-100%" }}
          animate={{ right: 0 }}
          exit={{ right: "-100%" }}
          transition={{ type: "tween", duration: 0.6 }}
        >
          {cartList.length < 1 ? (
            <AnimatePresence>
              <EmptyCartStyled
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div>
                  <BsFillCartFill />
                  <p>Currently Empty...</p>
                </div>
              </EmptyCartStyled>
            </AnimatePresence>
          ) : (
            <>
              <CartListStyled>
                <AnimatePresence>
                  {cartList.map((product) => (
                    <motion.li
                      key={product.title}
                      initial={{ x: "-100%", opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: "100%", opacity: 0 }}
                      layout
                      transition={{
                        delay: 0.4,
                        x: { duration: 0.6 },
                        opacity: { duration: 0.8 },
                        type: "tween",
                        layout: { duration: 0.3, delay: 0 },
                      }}
                    >
                      <img
                        src={
                          product.image.data.attributes.formats.thumbnail.url
                        }
                      />
                      <div>
                        <h3>{product.title}</h3>
                        <ProductControls>
                          <div>
                            <button onClick={() => handleSubtractQty(product)}>
                              <AiFillMinusCircle />
                            </button>
                            <span>{product.qty}</span>
                            <button onClick={() => handleAddQty(product)}>
                              <AiFillPlusCircle />
                            </button>
                          </div>
                        </ProductControls>
                      </div>
                    </motion.li>
                  ))}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.7, duration: 0.5 }}
                    layout
                  >
                    <h4>Total Price: {currencyFormatter.format(totalPrice)}</h4>
                    <PurchaseBtn onClick={handlePurchase}>Purchase</PurchaseBtn>
                  </motion.div>
                </AnimatePresence>
              </CartListStyled>
            </>
          )}
        </CartSidebarStyled>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;

const CartSidebarStyled = styled(motion.aside)`
  position: fixed;
  right: -100%;
  top: 0;
  max-width: 32rem;
  padding: 2em 1em;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  background-color: var(--secondary);
  z-index: 110;

  -ms-overflow-style: none;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const EmptyCartStyled = styled(motion.div)`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    row-gap: 1em;

    p {
      font-size: 1.25rem;
      font-weight: 700;
    }

    svg {
      font-size: 4rem;
      fill: var(--primary);
    }
  }
`;

const CartListStyled = styled(motion.ul)`
  list-style-type: none;

  li {
    padding: 1em;
    margin-bottom: 1em;
    display: flex;
    column-gap: 1em;
    background-color: #fff;
    border-radius: 8px;

    & > div {
      width: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      row-gap: 1em;

      h3 {
        font-weight: 700;
      }
    }
  }
`;

const ProductControls = styled.div`
  div {
    display: flex;
    align-items: center;
    gap: 0.5em;
    button {
      width: 1.5rem;
      height: 1.5em;
      display: grid;
      place-items: center;
      background-color: transparent;
      border: none;
      cursor: pointer;

      svg {
        width: 100%;
        height: 100%;
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

const PurchaseBtn = styled.button`
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
