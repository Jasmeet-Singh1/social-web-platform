import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import './App.css';

const App = () => {
  return (
    // <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<div>HELLLOOO</div>} />
      </Routes>
    </Router>
    // </Provider>
  );
};

export default App;
