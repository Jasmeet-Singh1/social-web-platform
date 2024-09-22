/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable no-undef */
import spinner from './spinner.gif';

export default () => (
  <>
    <img
      src={spinner}
      style={{ width: '200px', margin: 'auto', display: 'block' }}
      alt="Loading"
    />
  </>
);
