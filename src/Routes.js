import "./App.css";
import TeamContainer from "./components/teams/TeamContainer";
import PlayerContainer from "./components/players/PlayerContainer";
import { Route } from "react-router-dom";

function App() {
  return (
    <>
      <Route exact path="/" component={TeamContainer} />
      <Route exact path="/players" component={PlayerContainer} />
    </>
  );
}

export default App;
