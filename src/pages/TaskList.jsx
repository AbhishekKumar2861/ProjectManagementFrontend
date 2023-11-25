import React, { useState } from "react";
import ParticipantForm from "./ParticipantForm";
import { useGetApi } from "../hooks/useGetApi";
import { useDeleteApi } from "../hooks/useDeleteApi";
import { useEffect } from "react";

function TaskList({ tasks = [], showParticipantForm, getTask, getTaskData }) {
  const [selectedTaskIndex, setSelectedTaskIndex] = useState(null);
  const [isParticipantFormVisible, setParticipantFormVisibility] =
    useState(false);
  const [showParticipantListIndex, setShowParticipantListIndex] =
    useState(null);

  const {
    data: deleteTaskData,
    isLoading: deleteTaskLoading,
    error: deleteTaskError,
    deleteData: deleteTask,
  } = useDeleteApi(`http://127.0.0.1:8000/api/delete-task/`);

  const handleTaskClick = (taskIndex) => {
    setSelectedTaskIndex(taskIndex);
    setParticipantFormVisibility(true);
  };

  const handleAddParticipant = (participant) => {
    // Implement your addParticipant logic here
    // Make sure to pass the participant to the appropriate task
    // based on the selectedTaskIndex.
  };

  const closeParticipantForm = () => {
    setParticipantFormVisibility(false);
  };

  const toggleParticipantList = (task_id) => {
    setShowParticipantListIndex(
      showParticipantListIndex === task_id ? null : task_id
    );
  };

  const minimizeParticipantList = () => {
    setShowParticipantListIndex(null);
  };
  const removeTask = (task_id) => {
    deleteTask({
      task_id: task_id,
    });
  };

  useEffect(() => {
    if (deleteTaskData) {
      getTask();
    }
  }, [deleteTaskData]);
  return (
    <div className="task-list">
      {getTaskData?.map((task, taskIndex) => (
        <div
          key={taskIndex}
          className="border p-4 mb-4 rounded-md hover:bg-gray-100 flex flex-col"
        >
          <div
            className={`task-info cursor-pointer ${
              selectedTaskIndex === taskIndex ? "bg-gray-200" : ""
            }`}
            onClick={() => handleTaskClick(taskIndex)}
          >
            <div className="mb-2">
              <strong>Title:</strong> {task.task_name}
            </div>
            <div className="mb-2">
              <strong>Description:</strong> {task.description}
            </div>
            <div className="mb-2">
              <strong>Last Date:</strong> {task.submission_date}
            </div>
          </div>
          <div className="task-actions flex justify-between mt-2">
            <button
              className="bg-red-500 text-white px-2 py-1 rounded-md mr-2"
              onClick={() => removeTask(task.id)}
            >
              Remove
            </button>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              onClick={() => showParticipantForm(task.id)}
            >
              Add Participant
            </button>
            <button
              className="bg-blue-500 text-white px-2 py-1 rounded-md"
              onClick={() => toggleParticipantList(taskIndex)}
            >
              Show Participants
            </button>
          </div>
          {showParticipantListIndex === taskIndex && task.participants && (
            <div className="participant-list mt-4 p-4 border border-gray-300 rounded">
              <h4 className="text-lg font-semibold">Participants:</h4>
              <button
                className="bg-blue-500 text-white px-2 py-1 rounded-md mt-2"
                onClick={minimizeParticipantList}
              >
                Minimize
              </button>
              <ul>
                {task.participants.map((participant, index) => (
                  <li key={index}>
                    {participant.name} - {participant.email}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default TaskList;
