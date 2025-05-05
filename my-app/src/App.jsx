import style from "./App.module.css";
import { motion, AnimatePresence } from "framer-motion";
import HeaderImage from "./assets/celtic-transparent-14.png";
import CantabImage from "./assets/screenshot-of-cantab-good.png";
import React, { useState } from "react";

// Reusable map marker component with pulse animation
const MapMarker = ({ bottom, left, name, description }) => {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div
      style={{
        position: "absolute",
        bottom: `${bottom}%`,
        left: `${left}%`,
        transform: "translateX(-50%)",
        zIndex: 10,
      }}
    >
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        onClick={() => setShowInfo((prev) => !prev)}
        style={{
          width: "30px",
          height: "30px",
          backgroundColor: "rgba(255, 0, 0, 0.6)",
          borderRadius: "50%",
          border: "2px solid white",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          position: "relative",
        }}
        animate={{
          scale: [1, 1.05, 1],
        }}
        transition={{
          scale: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 1.2,
            ease: "easeInOut",
          },
        }}
      />

      <AnimatePresence>
        {showInfo && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "absolute",
              top: "-80px",
              left: "50%",
              transform: "translateX(-50%)",
              background: "rgba(0, 0, 0, 0.85)",
              color: "white",
              padding: "10px",
              borderRadius: "6px",
              width: "160px",
              fontSize: "12px",
              textAlign: "center",
              pointerEvents: "auto",
              boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.3)",
            }}
          >
            <strong>{name}</strong>
            <div>{description}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

function App() {
  const [showFinalDiv, setShowFinalDiv] = useState(true);
  const [showLoading, setShowLoading] = useState(false);
  const [showMapDiv, setShowMapDiv] = useState(false);

  const handleClick = () => {
    setShowFinalDiv(false);
    setShowLoading(true);
    setTimeout(() => {
      setShowLoading(false);
      setShowMapDiv(true);
    }, 1500);
  };

  return (
    <>
      {/* Intro Screen */}
      <AnimatePresence>
        {showFinalDiv && (
          <motion.div
            key="final"
            className="final-div"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="intro-container">
              <div className="celtic-image-container">
                <motion.header className={style.header}>
                  <motion.div className={style.headerLink}>
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 2.5, delay: 0.5 }}
                      className={style.headerImage}
                      src={HeaderImage}
                      alt="celtic-pattern"
                    />
                  </motion.div>
                </motion.header>
              </div>
              <motion.h1
                className={style.intro_title}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 2.5, delay: 0.8 }}
              >
                Welcome
              </motion.h1>
              <motion.h3
                onClick={handleClick}
                className="intro-sub-title"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 2.5, delay: 1.2 }}
              >
                <b>
                  <u>Click to enter</u>
                </b>
              </motion.h3>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Loading Screen with jumping dots */}
      <AnimatePresence>
        {showLoading && (
          <motion.div
            key="loading"
            className="loading-screen"
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              height: "100vh",
              width: "100vw",
              backgroundColor: "rgba(0, 0, 0, 0.85)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              zIndex: 9999,
              color: "white",
              fontFamily: "Poppins, sans-serif",
              fontSize: "20px",
              gap: "6px",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {/* Jumping dots */}
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  repeatDelay: 0.1,
                  delay: i * 0.2,
                  ease: "easeInOut",
                }}
                style={{
                  width: "10px",
                  height: "10px",
                  borderRadius: "50%",
                  backgroundColor: "white",
                }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Map Screen */}
      <AnimatePresence>
        {showMapDiv && (
          <motion.div
            key="map"
            className="map-div"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            style={{
              maxWidth: "100vw",
              maxHeight: "100vh",
              border: "12px solid rgba(0, 0, 0, 0.8)",
              borderRadius: "16px",
              boxShadow: "0 0 20px rgba(0, 0, 0, 0.5)",
              position: "relative",
            }}
          >
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
            >
              <img
                src={CantabImage}
                alt="cantab-map"
                className={style.cantab_image}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                }}
              />

              {/* Marker Instances */}
              <MapMarker bottom={4} left={66} name="Sumner Beach" description="Today’s forecast: Sunny with a slight breeze." />
              <MapMarker bottom={14} left={56} name="New Brighton Pier" description="Cloudy and humid throughout the day." />
              <MapMarker bottom={34} left={47} name="Ashworths Beach" description="Expect light showers this afternoon." />
              <MapMarker bottom={54} left={47} name="Waikuku Beach" description="Windy with a chance of sun breaks." />
              <MapMarker bottom={74} left={53} name="Amberly Beach" description="Chilly and overcast, wear a jacket!" />

              {/* Title and Descriptions */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 1 }}
                style={{
                  position: "absolute",
                  top: "20px",
                  left: "20px",
                  color: "white",
                  fontSize: "24px",
                  fontWeight: "bold",
                  fontFamily: "Poppins, sans-serif",
                  background: "rgba(0, 0, 0, 0.6)",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.3)",
                }}
              >
                Weather Forecast Map
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 2 }}
                style={{
                  position: "absolute",
                  top: "8%",
                  left: "20px",
                  color: "white",
                  fontSize: "14px",
                  fontFamily: "Poppins, sans-serif",
                  background: "rgba(0, 0, 0, 0.6)",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  width: "250px",
                  fontStyle: "italic",
                  fontWeight: "300",
                }}
              >
                This app provides up-to-date weather forecasts for various popular beaches and locations.
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 3 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  right: "20px",
                  transform: "translateY(-50%)",
                  color: "white",
                  fontSize: "14px",
                  fontFamily: "Poppins, sans-serif",
                  background: "rgba(0, 0, 0, 0.6)",
                  padding: "10px 15px",
                  borderRadius: "8px",
                  width: "150px",
                  fontStyle: "italic",
                  fontWeight: "300",
                }}
              >
                Tap on any red circle on the map to see detailed forecasts.
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;