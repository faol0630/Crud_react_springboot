
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NewUser from './components/NewUser';
import UpdateUser from './components/UpdateUser';
import UserList from './components/UserList';
import Swagger from './components/Swagger';
import AutosList from './components/AutosList';
import UpdateAuto from './components/UpdateAuto';
import NewAuto from './components/NewAuto';
//import { MyContext } from './context/MyContext'
//import { useState } from 'react';

function App() {

  // const [user, setUser] = useState({
  //   id: '',
  //   name: '',
  //   lastname: '',
  //   email: '',
  //   age: ''
  // })

  return (
    <BrowserRouter>
      {/* <MyContext.Provider value={{ user, setUser }}> */}
        <Routes>

          <Route path='/' element={<UserList />} />
          <Route path='/new_user' element={<NewUser />} />
          <Route path='/get_user/:id' element={<UpdateUser />} />
          <Route path='/swagger' element={<Swagger/>}/>
          <Route path='/autos_list' element={<AutosList/>}/>
          <Route path='/get_auto/:id' element={<UpdateAuto />} />
          <Route path='/new_auto' element={<NewAuto />} />

        </Routes>
      {/* </MyContext.Provider> */}
    </BrowserRouter>
  );
}

export default App;
