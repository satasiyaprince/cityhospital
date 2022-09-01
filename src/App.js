import './App.css';
import Header from './Component/Header/Header';
import Footer from './Component/Footer/Footer';
import Home from './Container/Home/Home';
import Appointment from './Container/Appointment/Appointment';
import Contact from './Container/Contact/Contact';
import Departments from './Container/Departments/Departments';
import Doctors from './Container/Doctors/Doctors';
import About from './Container/About/About';
import { Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Loading from './Container/Hoc/Loading';
import Auth from './Container/Auth/Auth';

const HWL = Loading(Home)

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => { setLoading(true) ;
    setTimeout(() => { setLoading(false)}, 2000)
  }, [])

  console.log(loading);

  return (
    <div>
      {/* <HWL
        loading = {loading}
      /> */}
      <Header />
    <Switch>
      <Route exact path={"/"} component={Home}/>
      <Route exact path={"/departments"} component={Departments}/>
      <Route exact path={"/about"} component={About}/>
      <Route exact path={"/doctors"} component={Doctors}/>
      <Route exact path={"/appointment"} component={Appointment}/>
      <Route exact path={"/contact"} component={Contact}/>
      <Route exact path={"/auth"} component={Auth}/>
    </Switch>
      <Footer />
    </div>
  );
}

export default App;
