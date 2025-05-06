import style from "./App.module.css";
import { motion, AnimatePresence } from "framer-motion";
import HeaderImage from "./assets/celtic-transparent-14.png";
import CantabImage from "./assets/screenshot-of-cantab-good.png";
import React, { useState, useEffect } from "react";
import { getMainApi, getSwells } from "./swellapi/swellapirequests.jsx";

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

  const [isLoading, setIsLoading] = useState([]);
  const [errorFetchedChecker, setErrorFetchedChecker] = useState(false);
  const [forumInfo, setForumInfo] = useState([]);
  const [nbSwellLoading, setNbSwellLoading] = useState(false);
  const [sumnerSwellLoading, setSumnerSwellLoading] = useState(false);
  const [taylorsSwellLoading, setTaylorsSwellLoading] = useState(false);
  const [waikukuSwellLoading, setWaikukuSwellLoading] = useState(false);
  const [amberlySwellLoading, setAmberlySwellLoading] = useState(false);
  const [magnetSwellLoading, setMagnetSwellLoading] = useState(false);
  const [ahiparaSwellLoading, setAhiparaSwellLoading] = useState(false);
  const [nbApiData, setNbApiData] = useState([]);
  const [sumnerApiData, setSumnerApiData] = useState([]);
  const [taylorsApiData, setTaylorsApiData] = useState([]);
  const [waikukuApiData, setWaikukuApiData] = useState([]);
  const [amberlyApiData, setAmberlyApiData] = useState([]);
  const [magnetApiData, setMagnetApiData] = useState([]);
  const [ahiparaApiData, setAhiparaApiData] = useState([]);

  // Main Fetch //
  const fetchMainData = async () => {
    setIsLoading(true);
    const response = await getMainApi.getMainData();
    const data = await response.json();
    console.log(data[0]);
    if (data[0] === undefined) {
      console.log("fetch error");
      console.log("loading is staying true, state will not be updated");
      setIsLoading(true);
    } else if (data[0] !== undefined) {
      setForumInfo(data);
      console.log("settings loading to false");
      setIsLoading(false);
    }
  };

  //NB Data Fetch //
  const fetchNbSwellData = async () => {
    setNbSwellLoading(true);
    const response = await getSwells[0].getNbSwell();
    const data = await response.json();

    if (data.name === "ChildProcessError") {
      console.log("Child Process Error");
      setNbSwellLoading(false);
    } else {
      setNbApiData(data);
      console.log("New Brighton Fetch");
      console.log(data);
      setNbSwellLoading(false);
      setErrorFetchedChecker(false);
    }
  };
  // Sumner Data Fetch //
  const fetchSumnerSwellData = async () => {
    setSumnerSwellLoading(true);
    const response = await getSwells[1].getSumnerSwell();
    const data = await response.json();

    if (data.name === "ChildProcessError") {
      console.log("Child Process Error");
      setSumnerSwellLoading(true);
    } else {
      setSumnerApiData(data);
      console.log("Sumner Fetch");
      console.log(data);
      setSumnerSwellLoading(false);
      setErrorFetchedChecker(false);
    }
  };
  //Taylors Data Fetch //
  const fetchTaylorsSwellData = async () => {
    setTaylorsSwellLoading(true);
    const response = await getSwells[5].getTaylorsSwell();
    const data = await response.json();
    if (data.name === "ChildProcessError") {
      console.log("Child Process Error");
      setTaylorsSwellLoading(true);
    } else {
      setTaylorsApiData(data);
      console.log("Taylors Fetch");
      console.log(data);
      setErrorFetchedChecker(false);
      setTaylorsSwellLoading(false);
    }
  };

  //Waikuku Data Fetch //
  const fetchWaikukuSwellData = async () => {
    setWaikukuSwellLoading(true);
    const response = await getSwells[3].getWaikukuSwell();
    const data = await response.json();
    if (data.name === "ChildProcessError") {
      console.log("Child Process Error");
      setWaikukuSwellLoading(true);
    } else {
      setWaikukuApiData(data);
      console.log("Waikuku Fetch");
      console.log(data);
      setWaikukuSwellLoading(false);
      setErrorFetchedChecker(false);
    }
  };
  // //Magnet Data Fetch //
  // const fetchMagnetSwellData = async () => {
  //   setMagnetSwellLoading(true);
  //   const response = await getSwells[2].getMagnetSwell();
  //   const data = await response.json();
  //   if (data.name === "ChildProcessError") {
  //     console.log("Child Process Error");
  //     setMagnetSwellLoading(true);
  //   } else {
  //     setMagnetApiData(data);
  //     console.log("Magnet Fetch");
  //     console.log(data);
  //     setMagnetSwellLoading(false);
  //   }
  // };

  //Amberly Data Fetch //
  const fetchAmberlySwellData = async () => {
    setAmberlySwellLoading(true);
    const response = await getSwells[4].getAmberlySwell();
    const data = await response.json();
    if (data.name === "ChildProcessError") {
      console.log("Child Process Error");
      setAmberlySwellLoading(true);
    } else {
      setAmberlyApiData(data);
      console.log("Amberly Fetch");
      console.log(data);
      setAmberlySwellLoading(false);
    }
  };

  // //Ahipara Data Fetch //
  // const fetchAhiparaSwellData = async () => {
  //   setAhiparaSwellLoading(true);
  //   const response = await getSwells[6].getAhiparaSwell();
  //   const data = await response.json();
  //   if (data.name === "ChildProcessError") {
  //     console.log("Child Process Error");
  //     setAhiparaSwellLoading(true);
  //   } else {
  //     setAhiparaApiData(data);
  //     console.log("Ahipara Fetch");
  //     console.log(data);
  //     setAhiparaSwellLoading(false);
  //   }
  // };

  // UseEffects //
  useEffect(() => {
    fetchMainData();
    // fetchNbSwellData();
    fetchAmberlySwellData();
    // fetchTaylorsSwellData();
    // fetchWaikukuSwellData();
    // fetchMagnetSwellData();
    // fetchSumnerSwellData();
    // fetchAhiparaSwellData();
  }, []);
  // Maps //
  // useEffect(() => {
  //   const L = require("leaflet");
  //   delete L.Icon.Default.prototype._getIconUrl;
  //   L.Icon.Default.mergeOptions({
  //     iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  //     iconUrl: require("leaflet/dist/images/marker-icon.png"),
  //     shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
  //   });
  // }, []);

  // For onClick Event handler //
  const nbHandleCall = () => {
    if (fetchNbSwellData) {
      return fetchNbSwellData();
    }
  };
  const taylorsHandleCall = () => {
    if (fetchTaylorsSwellData) {
      return fetchTaylorsSwellData();
    }
  };
  const waikukuHandleCall = () => {
    if (fetchWaikukuSwellData) {
      return fetchWaikukuSwellData();
    }
  };
  const magnetHandleCall = () => {
    if (fetchMagnetSwellData) {
      return fetchMagnetSwellData();
    }
  };
  const amberlyHandleCall = () => {
    if (fetchAmberlySwellData) {
      return fetchAmberlySwellData();
    }
  };
  const sumnerHandleCall = () => {
    if (fetchSumnerSwellData) {
      return fetchSumnerSwellData();
    }
  };

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
              <MapMarker
                bottom={4}
                left={66}
                name="Sumner Beach"
                description="Today’s forecast: Sunny with a slight breeze."
              />
              <MapMarker
                bottom={14}
                left={56}
                name="New Brighton Pier"
                description="Cloudy and humid throughout the day."
              />
              <MapMarker
                bottom={34}
                left={47}
                name="Ashworths Beach"
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
              ></MapMarker>

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
                This app provides up-to-date weather forecasts for various
                popular beaches and locations.
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
                <div prop={amberlyApiData} swellLoading={amberlySwellLoading} />
                <button onClick={amberlyHandleCall}>Get Tide Data</button>
                {amberlyApiData && (
                  <div
                    style={{
                      marginTop: "10px",
                      backgroundColor: "#fff",
                      color: "#000",
                      padding: "10px",
                      borderRadius: "8px",
                      boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.2)",
                      fontSize: "12px",
                    }}
                  >
                    {/* You can customize this content based on your API structure */}
                    <div>
                      <strong>Tide Info:</strong>
                    </div>
                    <div>High Tide: {amberlyApiData?.values?.[0]?.time}</div>
                    <div>Low Tide: {amberlyApiData.lowTide}</div>
                  </div>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
