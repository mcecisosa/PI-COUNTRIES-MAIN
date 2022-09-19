import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Landing from './components/Landind'
import NavBar from './components/NavBar'
import Home from './components/Home';
import ActivityCreate from './components/ActivityCreate'


function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route exact path ='/' component = {Landing}/>
        <Route path ='/countries' component = {NavBar}/>
        <Route exact path = '/countries' component = {Home}/>
        <Route path ='/activity' component = {ActivityCreate}/>
        
        
      </React.Fragment>      
    </BrowserRouter>    
  );
}

export default App;




