import React from 'react';
import ReactDom from 'react-dom';

const App = () => {
  return(
    <div>Hello Woooorld!</div> 
  )
}

ReactDom.render(
  <App />,
  document.getElementById('root')
);

