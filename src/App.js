import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import DashHeaders from './Components/DashHeaders';
import RoomM from './Components/Rooms/RoomM';
import FoodDetailsPage from './Components/Foods/Foods';
import Students from './Components/Students/Students';
import Locations from './Components/Locations/Locations';
import MapApp from './Components/Map/Map';
import Complain from './Components/Complains/Complain';
import GuestREquest from './Components/GuestRequests/GuestREquest';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <DashHeaders/>
      <div className='p-0 sm:ml-64 border-2 border-gray-200 border-dashed rounded-lg mx-1 mt-16 pb-2 '>
        <Routes>
          <Route path='/room' element={<RoomM/>}/>
          <Route path='/food' element={<FoodDetailsPage/>}/>
          <Route path='/students' element={<Students/>}/>
          <Route path='/locations' element={<Locations/>}/>
          <Route path='/maps/:index' element={<MapApp/>}/>
          <Route path='/guest' element={<GuestREquest/>}/>
          <Route path='/complains' element={<Complain/>}/>

        </Routes>
      </div>
        </BrowserRouter>
    </div>
  );
}

export default App;
