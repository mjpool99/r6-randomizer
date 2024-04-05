import React from 'react'
import { useApp } from '../contexts/AppContext'

export default function OperatorCard(props) {

    let data = props.data
    let op = props.type
    const { updateAttacker, updateDefender } = useApp();

  return (
    <div className={`card ${data.active ? 'active' : ''}`} onClick={() => {
        if (op === "Attack")
            updateAttacker(data.id);
        else
            updateDefender(data.id);
    }}>
        <img className='op-img' src={data.image} alt={data.name} />
        <img className='op-icon' src={data.icon} alt={data.name} />
        <span>{data.name}</span>
    </div>
  )
}
