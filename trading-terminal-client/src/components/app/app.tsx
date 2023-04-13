import Designation from './designation/designation';
import OrderList from './order-list/order-list';
import PositionScoreboard from './position-scoreboard/position-scoreboard';
import Ticker from './ticker/ticker';
import './app.css';
import Notification from './notification/notification';

const App = (): JSX.Element => {

  return (
      <div className="app">
        <Ticker />
        <Designation label="Trading terminal" />
        <PositionScoreboard />
        <OrderList />
        <Notification/>
      </div>
  );
}

export default App;
