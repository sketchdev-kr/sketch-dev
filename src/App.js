import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import DrawShare from "./pages/draw-share";
import Draw from "./pages/draw";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Result from "./pages/result";
import RouteChangeTracker from "./RouteChangeTracker";
import { useEffect } from "react";
import Navigation from "./components/nav";

function App() {
  useEffect(() => {
    if (window.innerWidth > 650) {
      window.aiptag.cmd.display.push(() => { window.aipDisplayTag.display('sketchdev-kr_970x250'); });
      // window.aiptag.cmd.display.push(() => { window.aipDisplayTag.display('sketchdev-kr_300x250'); });
    } else {
      window.aiptag.cmd.display.push(() => { window.aipDisplayTag.display('sketchdev-kr_300x50'); });
    }
    // window.aiptag.cmd.display.push(() => { window.aipDisplayTag.display('sketchdev-kr_300x50'); });
  }, []);

  return (
    <div className="App" style = {{
      display: "flex",
      alignItems: "center",
    }}>
      <div style = {{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}>
        <Navigation />
        <Header />
        <BrowserRouter>
          <Route
            render={({ location }) => (
              <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                  <Route path="/" exact component={Home} />
                  <Route path="/draw-share" component={DrawShare} />
                  <Route path="/draw" component={Draw} />
                  <Route path="/quiz" component={Quiz} />
                  <Route path="/result" component={Result} />
                  <Redirect path="/*" to="/" />

                  <RouteChangeTracker/>
                </Switch>
              </AnimatePresence>
            )}
          ></Route>
        </BrowserRouter>  
        <div className="banner" >
          <div id="sketchdev-kr_300x50" style={{
            // width: 300, height: 50, backgroundColor: "black",
          }} />
          <div id="sketchdev-kr_970x250" style={{
            // width: 970, height: 250, backgroundColor: "black",
          }} />
        </div>
      </div>
      {/* <div style={{
        position: "absolute",
        right: 10,
      }}>
        <div id="sketchdev-kr_300x250" />
      </div> */}
    </div>
    );
}

export default App;
