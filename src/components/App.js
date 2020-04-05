import React, { Component } from 'react';
import Graphics from '../components/Graphics';
import Navbar from '../components/Navbar';
import InputForm from '../components/InputForm';
import OutputForm from '../components/OutputForm';
import { BrowserRouter, Route } from 'react-router-dom';
import Home from '../components/Home';
import About from '../components/About';
import Contact from '../components/Contact';
import Header from './Header'
import MainBody from './MainBody'

class App extends Component {
  render() {
    return (
       <div>
        <Header />
        <MainBody />
       </div>
    );
  }
}

export default App;


// class App extends Component {
//   render() {
//     return (
//        <BrowserRouter>
//       <div className="App">    
//         <Navbar />
//           <Route path='/about' component={About} />
//           <Route path='/contact' component={Contact} />
//         <Graphics/>
//       </div>
//       </BrowserRouter>
//     );
//   }
// }

// export default App;