import { BrowserRouter as Router } from 'react-router-dom'
import { DataProvider } from './GlobalState';
import Pages from './components/mainPages/Pages'
import './styles/global.css';



function App() {
  return (
    <Router>
      <DataProvider>
        <div className="App" dir="rtl">
          <Pages />
        </div>
      </DataProvider>
    </Router>
  );
}

export default App;
