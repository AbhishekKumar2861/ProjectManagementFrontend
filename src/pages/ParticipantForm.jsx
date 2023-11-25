import React, { useState } from "react";
import { usePostApi } from "../hooks/usePostApi";
import { useEffect } from "react";

const ParticipantForm = ({ taskIndex, addParticipant, closeForm,getTask }) => {
  const [participantName, setParticipantName] = useState("");
  const [participantEmail, setParticipantEmail] = useState("");
  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");

  const {
    data: createParticipantData,
    isLoading: createParticipantLoading,
    postData: createParticipant,
    resetState: resetCreateParticipantState,
  } = usePostApi("http://127.0.0.1:8000/api/add-participants/");

  const handleParticipantNameChange = (event) => {
    const name = event.target.value;
    setParticipantName(name);
    // Validate name
    if (!/^[A-Za-z\s]+$/.test(name)) {
      setNameError("Name should only contain alphabets and whitespace");
    } else {
      setNameError("");
    }
  };

  const handleParticipantEmailChange = (event) => {
    const email = event.target.value;
    setParticipantEmail(email);
    // Validate email
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError("");
    }
  };

  const handleAddParticipant = () => {
    if (participantName && participantEmail && !nameError && !emailError) {
      // addParticipant(taskIndex, {
      //   name: participantName,
      //   email: participantEmail,
      // });
      createParticipant({
        name: participantName,
        email: participantEmail,
        task_id: taskIndex,
      });
      
    }
  };

  const handleCancel = () => {
    closeForm();
  };

  useEffect(() => {
    if (createParticipantData) {
      getTask();
      setParticipantName("");
      setParticipantEmail("");
      closeForm();
    }
  }, [createParticipantData]);

  return (
    <div className="mt-4 p-4 border border-gray-300 rounded">
      <h2 className="text-xl font-bold">Add Participant</h2>
      <div className="mt-4">
        <label htmlFor="participantName">Name</label>
        <input
          type="text"
          id="participantName"
          value={participantName}
          onChange={handleParticipantNameChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
        {nameError && <p className="text-red-500">{nameError}</p>}
      </div>
      <div className="mt-4">
        <label htmlFor="participantEmail">Email</label>
        <input
          type="email"
          id="participantEmail"
          value={participantEmail}
          onChange={handleParticipantEmailChange}
          className="w-full border border-gray-300 rounded px-2 py-1"
        />
        {emailError && <p className="text-red-500">{emailError}</p>}
      </div>
      <div className="mt-4">
        <button
          onClick={handleAddParticipant}
          className="bg-green-500 text-white px-4 py-2 rounded-md mr-2"
        >
          Add
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

export default ParticipantForm;
