import {createStore} from 'redux';

const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INC':
      return state + 1;
    case 'DEC':
      return state - 1;
    case 'RL':
      return 0;
    case 'RND':
      return action.value;
    default:
      return state;
  }
}

const inc = () => ({type: 'INC'});
const dec = () => ({type: 'DEC'});
const rl = () => ({type: 'RL'});
const rnd = (value) => ({type: 'RND', value});

const store = createStore(reducer);

const url = "./db.json";
let num = [];
let save = 1;
let body = require('./db.json');

let postData = () => {
  return fetch(url, {
  method: 'POST',
  headers: {
      'Content-Type': 'application/json'
  },
  body: JSON.stringify(body)
})
  .then(resp => resp.json())
  .then(data => {
    data.numbers.map((constN) => {
      if (constN.const) num.push(constN.const);
      if (constN.saved) save++;
    })
  })
  .catch(error => console.log('aaa', error));
} 
postData();

document.querySelector('.plus-block').addEventListener('click', () => {
  store.dispatch(inc());
});

document.querySelector('.minus-block').addEventListener('click', () => {
  store.dispatch(dec());
});

document.querySelector('.reset-block').addEventListener('click', () => {
  store.dispatch(rl());
});

document.querySelector('.download').addEventListener('click', () => {
  let value = +num[Math.floor(Math.random() * num.length)];
  store.dispatch(rnd(value));
});

document.querySelector('.upload').addEventListener('click', () => {
  let elem = {};
  elem['saved'] = document.querySelector('.counter').textContent;
  elem['id'] = save;
  body.numbers.push(elem);
  postData();
});

const update = () => {
  document.querySelector('.counter').textContent = store.getState();
}

store.subscribe(update);

