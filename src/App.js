import React from "react";
import "./App.scss";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import { useStateValue } from "./StateProvider";
import Particles from 'react-particles-js';

const App = () => {
  const [{ user }] = useStateValue();

  return (
    <div className="app">
       
      {!user ? (
        <>
         {/* <Particles >WWWs</Particles> */}
        <Login />
        </>
      ) : (
        <div className="app__body">
          <Router>
            <Sidebar />
            <Switch>
              <Route path="/rooms/:roomId">
                <Chat />
              </Route>
            </Switch>
          </Router>
        </div>
      )}
    </div>
  );
};

export default App;
