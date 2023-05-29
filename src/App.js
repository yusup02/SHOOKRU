import * as React from 'react';
import { Routes, Route } from 'react-router-dom';

import Login from './Login';
import Main from './main';
import CurseDetails from './courseDetails';
// import Create from './create';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="https://yusup02.github.io/SHOOCRU_TEST/" element={<Login />} />
        <Route path="https://yusup02.github.io/SHOOCRU_TEST/main" element={<Main />} />
        <Route path="https://yusup02.github.io/SHOOCRU_TEST/сurseDetails/:courseUID" element={<CurseDetails />} />
        {/* <Route path="/create" element={<Create />} /> */}
      </Routes>
    </div>
  );
}

export default App