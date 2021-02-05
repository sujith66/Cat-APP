import "./App.css";
import Header from "./components/Header/Header";
import Upload from "./components/Upload/Upload";
import Home from "./components/Home/Home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {ErrorBoundary} from 'react-error-boundary'

function App() {
   //Fallback component for error boundary
function ErrorFallback({error, resetErrorBoundary}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  )
}

  return (
    <div className="app">
      <Router>
        <Switch>
        <Route path="/upload">
            <Header />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Upload />
            </ErrorBoundary>
          </Route>

          <Route path="/">
            <Header />
            <ErrorBoundary FallbackComponent={ErrorFallback}>
            <Home />
            </ErrorBoundary>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
