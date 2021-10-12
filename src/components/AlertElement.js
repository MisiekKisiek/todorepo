import React from 'react';

//Mobexior
import { store } from '../Store.js';

const AlertElement = () => {
  return (<div className="alert__wrap">
    <div className="alert__curtine"></div>
    <div className="alert__alert">
      <span className="alert__alert-message">

      </span>
    </div>
  </div>);
}

export default AlertElement;