
import { Routes, Route, Navigate } from 'react-router-dom';
import { Homepage } from '../pages';

export const AppRoutes = () => {
  return (<Routes>
    <Route path='/start-page' element={<Homepage/>} />
    <Route path='*' element={<Navigate to='/start-page'/>}/>
  </Routes>
  );
};