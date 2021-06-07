
import Pages from './components/mainPages/Pages'
import './styles/global.css';
import { useContext } from 'react';
import { GlobalState } from './GlobalState';
import Loading from "./utils/loading"

function App() {

  const state = useContext(GlobalState)
  const [loading] = state.GlobalData.loading;


  return (
    <div className="App" dir="rtl">
      {
        loading
          ? <Loading />
          :
          <Pages />
      }
    </div>

  );
}

export default App;
