import { bench } from 'vitest'
import { cssToString } from './classes';

bench('small', () => {
  // 16.5 Mhz
  cssToString({
    color: 'red',
  });
});

bench('medium', () => {
  // 4.8 Mhz
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
