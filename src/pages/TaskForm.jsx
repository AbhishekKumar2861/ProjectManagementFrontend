import React, { useState, useEffect } from "react";
import { usePostApi } from "../hooks/usePostApi";
import { useGetApi } from "../hooks/useGetApi";
const TaskForm = ({ saveTask, closeForm, getTask }) => {
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [lastDate, setLastDate] = useState("");

  const handleTaskNameChange = (event) => {
    setTaskName(event.target.value);
  };

  const handleTaskDescriptionChange = (event) => {
    setTaskDescription(event.target.value);
  };

  const handleLastDateChange = (event) => {
    setLastDate(event.target.value);
  };

  const {
    data: getParticipantsData,
    isLoading: getParticipantsLoading,
    error: getParticipantsError,
    getData: getParticipants,
  } = useGetApi(`http://127.0.0.1:8000/api/participants/`);

  const {
    data: createTaskData,
    isLoading: createTaskLoading,
    postData: createTask,
    resetState: resetCreateTaskState,
  } = usePostApi(`http://127.0.0.1:8000/api/tasks/`);

  const handleSave = () => {
    if (taskName && taskDescription && lastDate) {
      // saveTask({
      //   name: taskName,
      //   description: taskDescription,
      //   lastDate: lastDate,
      // });
      createTask({
        task_name: taskName,
        description: taskDescription,
        submission_date: lastDate,
      });
    
    }
  };

  const handleCancel = () => {
    closeForm();
  };

  useEffect(() => {

    if (createTaskData) {
    
      getTask();
      getParticipants();
      closeForm();
    }
  }, [createTaskData]);
  return (
    <div className="mt-4 p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-bold">Add Task</h2>
      <div className="mt-4">
        <label htmlFor="taskName">Task Name</label>
        <input
          type="text"
          id="taskName"
          value={taskName}
          onChange={handleTaskNameChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="taskDescription">Description</label>
        <textarea
          id="taskDescription"
          value={taskDescription}
          onChange={handleTaskDescriptionChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mt-4">
        <label htmlFor="lastDate">Submission</label>
        <input
          type="date"
          id="lastDate"
          value={lastDate}
          onChange={handleLastDateChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
      </div>
      <div className="mt-4">
        <button
          onClick={handleSave}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Save
        </button>
        <button
          onClick={handleCancel}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default TaskForm;
