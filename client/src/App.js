import './App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import React from 'react';
import Landing from './components/Landind'
import NavBar from './components/NavBar'
import SearchBar from './components/SearchBar'
import Home from './components/Home';


function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Route exact path ='/' component = {Landing}/>
        <Route path ='/countries' component = {NavBar}/>
        <Route path ='/countries' component = {SearchBar}/>
        <Route exact path = '/countries' component = {Home}/>
        
        
      </React.Fragment>      
    </BrowserRouter>    
  );
}

export default App;




