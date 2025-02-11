import "./App.css";
// import { BrowserRouter as Router, Route, Switch } from 'react-router'
function App() {
  const loginWithGoogle = () => {
    window.location.href = "http://127.0.0.1:8000/accounts/google/login/";
  };
  const loginWithGithub = () => {
    window.location.href = "http://127.0.0.1:8000/accounts/github/login/";
  }
  return (
    <>
      <div>
        <h1> Hello from App!</h1>
        <button onClick={loginWithGoogle}>Login with Google</button>
        <button onClick={loginWithGithub}>Login with Github</button>

      </div>
    </>
  );
}

export default App;
