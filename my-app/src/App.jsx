import style from "./App.module.css";
import { motion, AnimatePresence } from "framer-motion";
import HeaderImage from "./assets/celtic-transparent-14.png";
import CantabImage from "./assets/screenshot-of-cantab-good.png";
import React, { useState } from "react";

function App() {
  const [showFinalDiv, setShowFinalDiv] = useState(true);
  const [showMapDiv, setShowMapDiv] = useState(false);

  const handleClick = () => {
    setShowFinalDiv(false); // Triggers exit animation for final-div
  };

  return (
    <>
      {/* Final Div */}
      <AnimatePresence
        onExitComplete={() => {
          setShowMapDiv(true); // Only trigger after final-div fully fades out
        }}
      >
        {showFinalDiv && (
          <motion.div key="final" className="final-div" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
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

      {/* Map Div appears only after Final Div fades out */}
      <AnimatePresence>
        {showMapDiv && (
          <motion.div key="map" className="map-div" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 1 }}>
            <img src={CantabImage} alt="cantab-map" classname={style.cantab_image}></img>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
