import { bench } from 'vitest'
import { cssToString } from './classes.js';

bench('small', () => {
  // 2.9 Mhz
  cssToString({
    color: 'red',
  });
});

bench('medium', () => {
  // 0.45 Mhz
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
