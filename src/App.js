import './App.css';
import Layout from './Components/Layout/Layout'
import Tracker from './Components/Tracker/Tracker'
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {

  return (
    <div className="App">
      <Layout>
        <Tracker />
      </Layout>
    </div>
  );
}

export default App;
