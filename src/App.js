import { AnimatePresence } from "framer-motion";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Header from "./components/header";
import CheckCanvas from "./pages/check-canvas";
import Draw from "./pages/draw";
import DrawCanvas from "./pages/draw-canvas";
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
                <Route path="/draw-canvas" component={DrawCanvas} />
                <Route path="/check-canvas" component={CheckCanvas} />
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
