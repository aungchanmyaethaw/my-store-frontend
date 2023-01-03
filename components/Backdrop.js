import React from "react";
import styled from "styled-components";
import { useAppContext } from "../contexts";
import { AnimatePresence, motion } from "framer-motion";
const Backdrop = () => {
  const { handleCartClose, isBackdropOpen } = useAppContext();

  return (
    <AnimatePresence>
      {isBackdropOpen && (
        <BackdropStyled
          key="backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.2 } }}
          exit={{ opacity: 0, transition: { duration: 0.4 } }}
          onClick={handleCartClose}
        />
      )}
    </AnimatePresence>
  );
};

export default Backdrop;

const BackdropStyled = styled(motion.div)`
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
  cursor: pointer;
`;
