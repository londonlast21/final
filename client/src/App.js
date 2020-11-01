import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

// CSS here
import 'semantic-ui-css/semantic.min.css';
import './App.css';

import { AuthProvider } from './context/auth';

// Navbar
import Navbar from './components/Navbar';

// Component Pages
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';


function App() {
  return (
    <AuthProvider>
       <Router>
        <Container>
        <Navbar />

        <Route exact path='/' component={Home}/>
        <Route exact path='/login' component={Login}/>
        <Route exact path='/signup' component={Signup}/>
        
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;