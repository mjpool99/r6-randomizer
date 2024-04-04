import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
import { attackers, defenders } from "../operators";

const AppContext = createContext();

export function useApp() {
  return useContext(AppContext);
}

export function AppProvider({ children }) {
  const [attackerList, setAttackerList] = useState([]);
  const [defenderList, setDefenderList] = useState([]);

  const updateAttacker = (id) => {
    setAttackerList((attackerList) => {
      if (id > 0) {
        return attackerList.map((item) => {
          return item.id === id ? { ...item, active: !item.active } : item;
        });
      }
      if (id === "SetAllActive") {
        return attackerList.map((item) => {
          return { ...item, active: true };
        });
      }
      if (id === "SetAllInactive") {
        return attackerList.map((item) => {
          return { ...item, active: false };
        });
      }
    });
  };
  const updateDefender = (id) => {
    setDefenderList((defenderList) => {
      if (id > 0) {
        return defenderList.map((item) => {
          return item.id === id ? { ...item, active: !item.active } : item;
        });
      }
      if (id === "SetAllActive") {
        return defenderList.map((item) => {
          return { ...item, active: true };
        });
      }
      if (id === "SetAllInactive") {
        return defenderList.map((item) => {
          return { ...item, active: false };
        });
      }
    });
  };

  useEffect(() => {
    attackers.forEach((attk) => {
      setAttackerList((attackerList) => [...attackerList, attk]);
    });
    defenders.forEach((def) => {
      setDefenderList((defenderList) => [...defenderList, def]);
    });
  }, []);

  const value = {
    attackerList,
    defenderList,
    setAttackerList,
    setDefenderList,
    updateAttacker,
    updateDefender,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}
