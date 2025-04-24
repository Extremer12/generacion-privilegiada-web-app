import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';

const App = () => {
  return (
    <Router>
      <div className="bg-black text-white min-h-screen flex flex-col">
        <Header />
        <div className="flex flex-grow">
          <Sidebar />
          <main className="flex-grow p-4">
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
            </Switch>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
};

export default App;