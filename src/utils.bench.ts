import { bench } from 'vitest'
import { cssToString } from './utils.js';

bench('small', () => {
  // 14.2 Mhz
  cssToString({
    color: 'red',
  });
});

bench('medium', () => {
  // 3.5 Mhz
  cssToString({
    color: 'red',
    background: 'pink',
    margin: '10px 20px',
    padding: '5px 10px',
    selectors: {
      ':hover': {
        color: 'pink',
        background: 'red',
      },
      ':active': {
        color: 'orange',
        background: 'blue',
      },
    },
  });
});
