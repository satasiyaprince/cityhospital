import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import Home from './Container/Home/Home';
import About from './Container/Home/About/About';
import Appointment from './Container/Appointment/Appointment';
import Contact from './Container/Contact/Contact';
import Departments from './Container/Departments/Departments';
import Doctors from './Container/Doctors/Doctors';

function App() {
  return (
    <div>
      <Header />
      {/* <Home /> */}
      {/* <About /> */}
      {/* <Appointment /> */}
      {/* <Contact /> */}
      <Departments />
      {/* <Doctors /> */}
      <Footer />
    </div>
  );
}

export default App;
