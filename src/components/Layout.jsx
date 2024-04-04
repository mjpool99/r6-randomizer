import React from "react";
import OperatorCard from "./OperatorCard";
import { useApp } from "../contexts/AppContext";

export default function Layout() {
  const { attackerList, defenderList, updateAttacker, updateDefender } =
    useApp();

  return (
    <>
      <div className="card-container">
        <input
          type="checkbox"
          onChange={(e) => {
            if (e.target.checked) {
              updateAttacker("SetAllActive");
            } else {
              updateAttacker("SetAllInactive");
            }
          }}
          defaultChecked
        />
        {Object.keys(attackerList).map((key, index) => {
            return (
                <OperatorCard
                key={key}
                data={attackerList[index]}
                type={"Attack"}
                />
                );
            })}
      </div>
      <div className="card-container">
          <input
            type="checkbox"
            onChange={(e) => {
              if (e.target.checked) {
                updateDefender("SetAllActive");
              } else {
                updateDefender("SetAllInactive");
              }
            }}
            defaultChecked
          />
        {Object.keys(defenderList).map((key, index) => {
            return (
                <OperatorCard
                key={key}
                data={defenderList[index]}
                type={"Defend"}
                />
                );
            })}
      </div>
    </>
  );
}
