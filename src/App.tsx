import React from "react";
import KanbanBoard from "./pages/Kanban";
import "./styles.css";

const App: React.FC = () => {
  return (
    <div className="App">
      <KanbanBoard />
    </div>
  );
}

export default App;
