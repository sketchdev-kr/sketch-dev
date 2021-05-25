import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import DrawShare from "./pages/draw-share";
import Draw from "./pages/draw";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import Result from "./pages/result";

function App() {
  return (
    <div className="App">
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
              </Switch>
            </AnimatePresence>
          )}
        ></Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
