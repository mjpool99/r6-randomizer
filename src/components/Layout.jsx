import React from "react";
import OperatorCard from "./OperatorCard";
import { useApp } from "../contexts/AppContext";

export default function Layout() {
  const {
    attacker,
    defender,
    attackerList,
    defenderList,
    updateAttacker,
    updateDefender,
    randomizeAttacker,
    randomizeDefender,
  } = useApp();

  const attackDrop = document.querySelector(".attack");
  const defendDrop = document.querySelector(".defend");

  return (
    <>
      <div className="dropdown attack collapse">
        <input
          type="checkbox"
          title="Activate all ops"
          onChange={(e) => {
            if (e.target.checked) {
              updateAttacker("SetAllActive");
            } else {
              updateAttacker("SetAllInactive");
            }
          }}
          defaultChecked
        />
        <div className="card-container">
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
        <button
          type="button"
          className="dropdown-btn"
          onClick={() => {
            attackDrop.classList.toggle("collapse");
            if (!defendDrop.classList.contains("collapse"))
              defendDrop.classList.toggle("collapse");
          }}
        >
          Attackers
        </button>
      </div>
      <div className="dropdown defend collapse">
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
        <div className="card-container">
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
        <button
          type="button"
          className="dropdown-btn right"
          title="Activate all ops"
          onClick={() => {
            defendDrop.classList.toggle("collapse");
            if (!attackDrop.classList.contains("collapse"))
              attackDrop.classList.toggle("collapse");
          }}
        >
          Defenders
        </button>
      </div>
      <div className="row">
        <div className="random-card-container">
          <OperatorCard data={attacker} />
          <button
            type="button"
            className="btn attk-btn"
            onClick={() => {
              randomizeAttacker(attackerList);
            }}
          >
            <span className="attk-span">Generate Attacker</span>
          </button>
        </div>
        <div className="random-card-container">
          <OperatorCard data={defender} />
          <button
            type="button"
            className="btn def-btn"
            onClick={() => {
              randomizeDefender(defenderList);
            }}
          >
            <span className="def-span">Generate Defender</span>
          </button>
        </div>
      </div>
    </>
  );
}
