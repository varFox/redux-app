import React from 'react';
import {connect} from 'react-redux';
import * as actions from '../action';
import {bindActionCreators} from 'redux';

const Counter = ({counter, inc, dec, rl, rnd, upl}) => {
  return (
    <div>
    <div className="counter-block">
      <p className="counter">{counter}</p>
    </div>
    <div className="buttons-block">
      <div className="buttons-top">
        <button onClick={inc} className="plus-block"></button>
        <button onClick={dec} className="minus-block"></button>
        <button onClick={rl} className="reset-block"></button>
      </div>
      <div className="buttons-bottom">
        <button onClick={rnd} className="download"></button>
        <button onClick={upl} className="upload"></button>
      </div>
    </div>
  </div>
  )
}
const mapStateToProps = (state) => {
  return {
    counter: state
  }
}
 
export default connect(mapStateToProps, actions)(Counter);