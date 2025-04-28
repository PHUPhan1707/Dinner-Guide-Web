import { motion, AnimatePresence } from "framer-motion";

interface SplashTransitionProps {
  show: boolean;
}

export default function SplashTransition({ show }: SplashTransitionProps) {
  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
          <motion.div
            initial={{ 
              y: "100%",
              scale: 0,
              rotate: 0,
              borderRadius: "50% 50% 0 0"
            }}
            animate={{ 
              y: ["100%", "0%", "0%", "-100%"],
              scale: [0, 1.5, 1.5, 0],
              rotate: [0, 0, 0, 0],
              borderRadius: ["50% 50% 0 0", "0", "0", "0 0 50% 50%"]
            }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1]
            }}
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              background: "#000000",
              transformOrigin: "bottom center",
              filter: "blur(40px)",
              opacity: 0.9
            }}
          />
          {/* Base layer for consistent coverage */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.95, 0.95, 0]
            }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1]
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, #000000 0%, #1a1a1a 100%)"
            }}
          />
          {/* Water ripple effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.2, 0.2, 0],
              scale: [0.8, 1.2, 1.2, 1.5]
            }}
            transition={{
              duration: 1.8,
              ease: "easeInOut",
              times: [0, 0.1, 0.9, 1]
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: "radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, rgba(0,0,0,0.2) 100%)",
              mixBlendMode: "overlay"
            }}
          />
        </div>
      )}
    </AnimatePresence>
  );
} 