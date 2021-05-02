import { AnimatePresence } from 'framer-motion';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/header';
import CheckCanvas from './pages/check-canvas';
import DrawCanvas from './pages/draw-canvas';
import Home from './pages/home';
import Quiz from './pages/quiz';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
          <Route
            render={({location}) => (
              <AnimatePresence exitBeforeEnter initial={false}>
                <Switch location={location} key={location.pathname}>
                  <Route path="/" exact component={Home} />
                  <Route path="/draw-canvas" component={DrawCanvas} />
                  <Route path="/check-canvas" component={CheckCanvas} />
                  <Route path="/quiz" component={Quiz}/>
                  <Redirect path="/*" to="/"/>
                </Switch>
              </AnimatePresence>
            )}
          >
          </Route>
      </BrowserRouter>
    </div>
  );
}

export default App;
