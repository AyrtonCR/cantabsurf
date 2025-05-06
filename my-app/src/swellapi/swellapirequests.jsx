// import React, { useState, useEffect } from "react";

// const API_URL = process.env.REACT_APP_API_URL;
// const SWELL_API_KEY = process.env.REACT_APP_SWELL_DATA_API_KEY;

const SWELL_API_KEY = import.meta.env.VITE_API_KEY;
const API_URL = import.meta.env.VITE_API_URL;

// Main Forum Data Local API Request //
const getMainApi = {
  getMainData: async () => await fetch(`${API_URL}/forum`),
};

const getSwells =
  // All Swells Array //
  [
    {
      getNbSwell: async () =>
        // New Brighton Pier API Request //
        await fetch("https://api.niwa.co.nz/tides/data?lat=-43.50701147743817&long=172.7322249732018", {
          method: "get",
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-apikey": `${SWELL_API_KEY}`,
          },
        }),
    },
    {
      getSumnerSwell: async () =>
        // Sumner API Request //

        await fetch("https://api.niwa.co.nz/tides/data?lat=-43.57054505131858&long=172.76693872602053", {
          method: "get",
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-apikey": `${SWELL_API_KEY}`,
          },
        }),
    },
    {
      getMagnetSwell: async () =>
        // Sumner API Request //
        await fetch("https://api.niwa.co.nz/tides/data?lat=-43.86298751831055&long=172.78054809570312", {
          method: "get",
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-apikey": `${SWELL_API_KEY}`,
          },
        }),
    },
    {
      getWaikukuSwell: async () =>
        // Waikuku API Request //
        await fetch("https://api.niwa.co.nz/tides/data?lat=-43.288298923982&long=172.72293231197054", {
          method: "get",
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-apikey": `${SWELL_API_KEY}`,
          },
        }),
    },
    {
      getAmberlySwell: async () =>
        // Amberly API Request //
        await fetch("https://api.niwa.co.nz/tides/data?lat=-43.173640546919046&long=172.78378972364857", {
          method: "get",
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-apikey": `${SWELL_API_KEY}`,
          },
        }),
    },
    {
      getTaylorsSwell: async () =>
        // Sumner API Request //
        await fetch("https://api.niwa.co.nz/tides/data?lat=-43.58266878599411&long=172.77771065001204", {
          method: "get",
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-apikey": `${SWELL_API_KEY}`,
          },
        }),
    },
    {
      getAhiparaSwell: async () =>
        // Sumner API Request //
        await fetch("https://api.niwa.co.nz/tides/data?lat=-35.16384368311959&long=173.12762414183146", {
          method: "get",
          dataType: "json",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "x-apikey": `${SWELL_API_KEY}`,
          },
        }),
    },
  ];

export { getMainApi, getSwells };