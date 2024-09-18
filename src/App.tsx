import React from "react";
import KanbanBoard from "./pages/Kanban";
import "./styles.css";
import ErrorBoundary from "./components/ErrorBoundary";

const App: React.FC = () => {
  return (
    <div className="App">
      <ErrorBoundary>
        <KanbanBoard />
      </ErrorBoundary>
    </div>
  );
}

export default App;
