
import { Routes, Route, Navigate } from 'react-router-dom';
import {  ListingOfTicketsViewList, ListingOfTicketsViewTable } from '../pages';
import { useToolbarContext } from '../shared/contexts/ToolbarContext';
import { useEffect } from 'react';

export const AppRoutes = () => {
  const {setToolbarOptions} =useToolbarContext();

  useEffect( () => {
    setToolbarOptions([
      {
        icon:'grid_view',
        path:'/start-page'

      },
      {
        icon:'format_list_bulleted',
        path:'/tickets-view-list'

      },
      {
        icon:'calendar_month_outlined',
        path:'/tickets-view-table'

      },
    ]);

  },[]);
  
  return (<Routes>
    <Route path='/start-page' element={<ListingOfTicketsViewList/>} />
    <Route path='/tickets-view-list' element={<ListingOfTicketsViewTable/>} />


    <Route path='*' element={<Navigate to='/start-page'/>}/>
  </Routes>
  );
};