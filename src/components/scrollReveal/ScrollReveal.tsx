import { motion } from "framer-motion";

export const ScrollReveal: React.FC<{ childComponent: React.ReactNode }> = ({ childComponent }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      style={{ padding: "40px", background: "#eaeaea", margin: "20px 0" }}
    >
      {childComponent}
    </motion.div>
  );
};