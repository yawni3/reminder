import "./App.css";
import { useTimer } from "./usetimer";
import buuny from "./assets/buuny.png";
import cookie from "./assets/cookie.png";
import happybee from "./assets/mcbees.gif";
import mcbook from "./assets/mcbook.gif";


function App() {
  const { formatted, startTimer, stopTimer } = useTimer();

  return (
    <div className="phone">
      <div className="screen">
        <img src={buuny} alt="" className="top-gif" />

        <h1 className="timer">{formatted}</h1>

        <div className="buttons">
          <button className="btn start" onClick={startTimer}>
            <img src={happybee} alt="" className="btn-icon" />Başlat
           </button>
          <button className="btn stop" onClick={stopTimer}>
             <img src={mcbook} alt="" className="btn-icon" />Durdur
          </button>
        </div>

        <img src={cookie} alt="" className="bottom-gif" />
      </div>
    </div>
  );
}

export default App;
