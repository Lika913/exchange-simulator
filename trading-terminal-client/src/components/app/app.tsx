import OrderList from '../order-list/order-list';
import Ticker from '../ticker/ticker';
import './app.css';

const App = (): JSX.Element => {
  return (
    <div className="app">
      <Ticker />
      <OrderList />
    </div>
  );
}

export default App;
