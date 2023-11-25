import React, { useState } from "react";
import Navbar from "./pages/Navbar";
import TaskForm from "./pages/TaskForm";
import TaskList from "./pages/TaskList";
import ParticipantForm from "./pages/ParticipantForm";
import { useGetApi } from "./hooks/useGetApi";


function App() {
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [participantFormVisible, setParticipantFormVisible] = useState(false);

  const {
    data: getTaskData,
    isLoading: getTaskLoading,
    error: getTaskError,
    getData: getTask,
  } = useGetApi(`http://127.0.0.1:8000/api/tasks/`);


  const openForm = () => {
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
  };

  const saveTask = (newTask) => {
    setTasks([...tasks, newTask]);
    closeForm();
  };

  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  const showParticipantForm = (taskId) => {
    setSelectedTaskIndex(taskId);
    setParticipantFormVisible(true);
  };

  const closeParticipantForm = () => {
    setSelectedTaskIndex(null);
    setParticipantFormVisible(false);
  };

  const addParticipant = (taskIndex, participant) => {
    const updatedTasks = [...tasks];
    updatedTasks[taskIndex].participants =
      updatedTasks[taskIndex].participants || [];
    updatedTasks[taskIndex].participants.push(participant);
    setTasks(updatedTasks);
    closeParticipantForm();
  };

  return (
    <div className="App">
      <Navbar openForm={openForm} />
      {showForm && <TaskForm saveTask={saveTask} closeForm={closeForm} getTask={getTask}/>}
      {participantFormVisible !== false && (
        <ParticipantForm
          taskIndex={selectedTaskIndex}
          addParticipant={addParticipant}
          closeForm={closeParticipantForm}
          getTask={getTask}
        />
      )}
      <TaskList
        tasks={tasks}
        removeTask={removeTask}
        showParticipantForm={showParticipantForm}
        getTask={getTask}
        getTaskData={getTaskData}
      />
    </div>
  );
}

export default App;
