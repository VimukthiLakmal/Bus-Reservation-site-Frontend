import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";

import Loading from './components/index';
import About from './components/passanger/about';
import Contact from './components/passanger/contact';
import Terms from './components/passanger/terms';

import Index from './components/Admin/index';
import Bus from './components/Admin/bus';
import Employee from './components/Admin/employee';
import BusRoute from './components/Admin/bus_routes';
import BusTicketMaster from './components/Admin/ticket_master';
import BusTimeTable from './components/Admin/time_table';
import BookedTicket from './components/Admin/booked_ticket';
import AdminTrip from './components/Admin/trip';
import ViewRatings from './components/Admin/view_rate';
import PassangerHome from './components/passanger/home';
import PassangerRegistration from './components/passanger/registration';
import PassangerLogin from './components/passanger/login';
import PassangerDashboard from './components/passanger/dashboard';
import PassangerTrip from './components/passanger/trip';
import PassangerBookTicket from './components/passanger/booking_ticket';
import PassangerPassReset from './components/passanger/password_reset';
import PassangerProfile from './components/passanger/profile';
import ViewBookings from "./components/passanger/history";
import Ratings from "./components/passanger/ratings";
import BusLocation from './components/driver/driver_data'
export default function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Loading />} exact />

        <Route path="/About" element={<About />}  />
        <Route path="/Contact" element={<Contact />}  />
        <Route path="/Terms" element={<Terms />}  />

        <Route path="/admin/dashboard" element={<Index />}  />
        <Route path="/admin/bus" element={<Bus />}  /> 
        <Route path="/admin/employee" element={<Employee />}  /> 
        <Route path="/admin/Route" element={<BusRoute />}  /> 
        <Route path="/admin/BusTicketMaster" element={<BusTicketMaster />}  /> 
        <Route path="/admin/BusTimeTable" element={<BusTimeTable />}  /> 
        <Route path="/admin/BookedTicket" element={<BookedTicket />}  /> 
        <Route path="/admin/AdminTrip" element={<AdminTrip />}  /> 
        <Route path="/admin/Rate" element={<ViewRatings />} /> 
        

        <Route path="/passanger" element={<PassangerHome />}  /> 
        <Route path="/passanger/PassangerRegistration" element={<PassangerRegistration />}  /> 
        <Route path="/passanger/PassangerLogin" element={<PassangerLogin />}  /> 
        <Route path="/passanger/PassangerDashboard" element={<PassangerDashboard />}  /> 
        <Route path="/passanger/PassangerTrip" element={<PassangerTrip />}  /> 
        <Route path="/passanger/PassangerBookTicket" element={<PassangerBookTicket />}  /> 
        <Route path="/passanger/PassangerPassReset" element={<PassangerPassReset />}  /> 
        <Route path="/passanger/PassangerProfile" element={<PassangerProfile />} /> 
        <Route path="/passanger/History" element={<ViewBookings />} /> 
        <Route path="/passanger/Rate" element={<Ratings />} />

        
        <Route path="/bus" element={<BusLocation />} /> 
      </Routes>
    </BrowserRouter>
  )
};
