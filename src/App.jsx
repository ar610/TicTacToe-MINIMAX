// src/App.js
import Board from './components/Board.jsx';
import './index.css'; // Make sure your Tailwind CSS is imported

function App() {
  return (
    <div className="min-h-screen w-screen flex items-center align-center justify-center bg-gray-50">
      <Board />
    </div>
  );
}
export default App;
