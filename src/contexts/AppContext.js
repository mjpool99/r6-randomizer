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

  const [attacker, setAttacker] = useState({});
  const [defender, setDefender] = useState({});

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

  const randomizeAttacker = (list) => {
    let filteredList = list.filter((a) => a.active === true);
    let randomNumber = Math.ceil(Math.random() * filteredList.length) - 1;
    let randomOp = list.filter((a) => a.active === true)[randomNumber];
    
    if (filteredList.length > 1) {      
      return setAttacker(randomOp);
    } else {
      return alert("You must have at least 2 operators selected");
    }
  };
  const randomizeDefender = (list) => {
    let filteredList = list.filter((a) => a.active === true);
    let randomNumber = Math.ceil(Math.random() * filteredList.length) - 1;
    let randomOp = list.filter((a) => a.active === true)[randomNumber];

    if (filteredList.length > 1) {
      return setDefender(randomOp);
    } else {
      return alert("You must have at least 2 operators selected");
    }
  };

  useEffect(() => {
    attackers.forEach((attk) => {
      setAttackerList((attackerList) => [...attackerList, attk]);
    });
    defenders.forEach((def) => {
      setDefenderList((defenderList) => [...defenderList, def]);
    });

    randomizeAttacker(attackers);
    randomizeDefender(defenders);
  }, []);

  const value = {
    attacker,
    defender,
    attackerList,
    defenderList,
    setAttackerList,
    setDefenderList,
    updateAttacker,
    updateDefender,
    randomizeAttacker,
    randomizeDefender,
  };

  return (
    <>
      <AppContext.Provider value={value}>{children}</AppContext.Provider>
    </>
  );
}
