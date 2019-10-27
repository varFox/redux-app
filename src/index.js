import {createStore, bindActionCreators} from 'redux';
import reducer from './reduser';
import {inc, dec, rl, rnd} from './action';

const store = createStore(reducer);
const {dispatch, subscribe} = store;

const incDispatch = bindActionCreators(inc, dispatch);
const decDispatch = bindActionCreators(dec, dispatch);
const rlDispatch = bindActionCreators(rl, dispatch);
const rndDispatch = bindActionCreators(rnd, dispatch);

const url = 'http://localhost:3000/numbers';

let number = [];
let body = require('./db.json');
body.numbers.map(num => {
  if (num.const) number.push(num.const);
});

const postData = (elem) => {
  return fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(elem)
  })
    .catch(error => console.log('aaa', error));
}

document.querySelector('.plus-block').addEventListener('click', incDispatch);
document.querySelector('.minus-block').addEventListener('click', decDispatch);
document.querySelector('.reset-block').addEventListener('click', rlDispatch);

document.querySelector('.download').addEventListener('click', () => {
  let value = +number[Math.floor(Math.random() * number.length)];
  rndDispatch(value);
});

document.querySelector('.upload').addEventListener('click', () => {
  let elem = {};
  elem['saved'] = document.querySelector('.counter').textContent;
  postData(elem);
});

const update = () => {
  document.querySelector('.counter').textContent = store.getState();
}

subscribe(update);

