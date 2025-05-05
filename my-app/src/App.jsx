import style from "./App.module.css";
import { motion, AnimatePresence } from "framer-motion";
import HeaderImage from "./assets/celtic-transparent-14.png";
import CantabImage from "./assets/screenshot-of-cantab-good.png";
import React, { useState } from "react";

// Reusable map marker component
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
      {/* Marker circle */}
      <motion.div
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 1.1 }}
        onClick={() => setShowInfo(prev => !prev)}
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
      />

      {/* Info box that appears when clicked */}
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
  const [showMapDiv, setShowMapDiv] = useState(false);

  const handleClick = () => {
    setShowFinalDiv(false);
  };

  return (
    <>
      {/* Intro Screen */}
      <AnimatePresence
        onExitComplete={() => {
          setShowMapDiv(true);
        }}
      >
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
          >
            <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
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
              <MapMarker
                bottom={4}
                left={66}
                name="Taylors Mistake"
                description="Today’s forecast: Sunny with a slight breeze."
              />
              <MapMarker
                bottom={14}
                left={56}
                name="Sumner Beach"
                description="Cloudy and humid throughout the day."
              />
              <MapMarker
                bottom={34}
                left={47}
                name="New Brighton Pier"
                description="Expect light showers this afternoon."
              />
              <MapMarker
                bottom={54}
                left={47}
                name="Waikuku Beach"
                description="Windy with a chance of sun breaks."
              />
              <MapMarker
                bottom={74}
                left={53}
                name="Amberly Beach"
                description="Chilly and overcast, wear a jacket!"
              />
            </div>

            {/* Key Info */}
            <div className={style.keyContainer}>
              <h3 style={{ width: "0px", height: "auto" }} />
              Click a red circle to view the forecast
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
