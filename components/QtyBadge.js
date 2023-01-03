import styled from "styled-components";
import { motion } from "framer-motion";
import { useAppContext } from "../contexts";
const QtyBadge = () => {
  const { totalQty } = useAppContext();

  return (
    <Badge initial={{ scale: 0 }} animate={{ scale: 1 }}>
      {totalQty}
    </Badge>
  );
};

export default QtyBadge;

const Badge = styled(motion.div)`
  width: 1.25rem;
  height: 1.25rem;
  position: absolute;
  display: grid;
  place-items: center;
  color: #fff;
  background-color: #16a34a;
  border-radius: 8px;
  bottom: -4px;
  right: -4px;
`;
