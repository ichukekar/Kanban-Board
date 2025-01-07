/* eslint-disable react/prop-types */
import {
  DocumentTextIcon,
  PencilSquareIcon,
  TrashIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import Modal from "./Modal";
import Editable from "./Editable";
import { DocumentCheckIcon } from "@heroicons/react/24/outline";
import Chip from "./Chip";
import { useState, useContext } from "react";
import { AppContext } from "../context/AppContext";

const CardInfo = (props) => {
  const { tasks } = props.card;
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTask, setEditedTask] = useState({});
  const [creatingNewTask, setCreatingNewTask] = useState(false);
  const { updateList, addTask, updateTask, deleteTask } =
    useContext(AppContext);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based, so add 1
    const day = String(date.getDate()).padStart(2, "0"); // Pad single digit days with a leading zero
    return `${year}-${month}-${day}`;
  };

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "normal",
    dueDate: formatDate(new Date()), // Initialize with today's date
  });
  const handleEditClick = (task) => {
    setEditingTaskId(task?._id);
    setEditedTask(task);
  };

  const handleSaveClick = (taskId) => {
    updateTask(taskId, editedTask);
    setEditingTaskId(null);
  };

  const handleDeleteClick = (taskId) => {
    deleteTask(taskId);
  };

  const toggleNewTaskForm = () => {
    setCreatingNewTask(!creatingNewTask);
    setNewTask({
      title: "",
      description: "",
      priority: "normal",
      dueDate: formatDate(new Date()),
    });
  };

  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask({
      ...newTask,
      [name]: value,
    });
  };

  const handleCheckboxClick = (task, event) => {
    event.stopPropagation();
    const updatedTask = { ...task, completed: !task?.completed };
    updateTask(task._id, updatedTask);
  };

  const handleNewTaskSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    addTask(props?.card?._id, newTask);
    setCreatingNewTask(false);
    setNewTask({
      title: "",
      description: "",
      priority: "normal",
      dueDate: formatDate(new Date()),
    });
  };

  return (
    <Modal onClose={() => props.onClose()}>
      <div className="cardinfo p-6 bg-white flex flex-col gap-6">
        <div className="cardinfo_box flex flex-col gap-4">
          <div className="cardinfo_box_title font-bold text-xl text-gray-700 gap-4 flex items-center justify-between">
            <div className="flex gap-4">
              <DocumentTextIcon className="w-6 h-6" />
              <p>{props?.card?.name}</p>
            </div>
            <div>
              <XMarkIcon
                className="h-4 w-4 hover:cursor-pointer hover:scale-150 duration-300 hover:text-red-600"
                onClick={() => props.onClose()}
              />
            </div>
          </div>
          <div className="cardinfo_box_body w-1/2">
            <Editable
              text="Edit Title"
              value={props?.card?.name}
              buttonText="Update"
              onSubmit={(value) => updateList(props?.card?._id, value)}
            />
          </div>
        </div>

        <div className="cardinfo_box flex flex-col gap-4">
          <div className="cardinfo_box_title font-bold text-xl text-gray-700 gap-4 flex items-center">
            <DocumentCheckIcon className="w-6 h-6" />
            Tasks
          </div>

          {tasks &&
            tasks?.map((task) => (
              <div key={task?._id}>
                {editingTaskId === task?._id ? (
                  <div className="cardinfo_box_list flex flex-col gap-2 rounded-md p-2 border-2 border-gray-200 w-full shadow-md">
                    <form
                      className="flex flex-col gap-4"
                      onSubmit={() => handleSaveClick(task?._id)}
                    >
                      <input
                        required
                        type="text"
                        value={editedTask.title}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            title: e.target.value,
                          })
                        }
                        className="text-md border p-2 rounded"
                      />
                      <textarea
                        value={editedTask.description}
                        onChange={(e) =>
                          setEditedTask({
                            ...editedTask,
                            description: e.target.value,
                          })
                        }
                        className="text-md text-gray-500 border p-2 rounded"
                      />
                      <div className="flex items-center gap-10">
                        <p className="text-md text-gray-500">Priority</p>
                        <select
                          value={editedTask.priority}
                          onChange={(e) =>
                            setEditedTask({
                              ...editedTask,
                              priority: e.target.value,
                            })
                          }
                          className="border p-2 rounded shadow-md"
                        >
                          <option value="normal">Normal</option>
                          <option value="urgent">Urgent</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-6">
                        <p className="text-md text-gray-500">Due Date</p>
                        <input
                          type="date"
                          value={formatDate(editedTask.dueDate)}
                          onChange={(e) =>
                            setEditedTask({
                              ...editedTask,
                              dueDate: e.target.value,
                            })
                          }
                          className="rounded-md p-1 border-2 border-gray-200 shadow-md"
                        />
                      </div>
                      <div className="flex justify-end gap-4">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2   hover:bg-blue-600 rounded-lg "
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingTaskId(null)}
                          className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                ) : (
                  <div
                    className={`cardinfo_box_list flex flex-col gap-2 rounded-md p-2 border-2 w-full shadow-md ${
                      task.completed ? "bg-gray-200" : "bg-white"
                    }`}
                  >
                    <div className="cardinfo_task flex items-center justify-between gap-2">
                      <div>
                        <input
                          type="checkbox"
                          className="w-4 h-4 hover:cursor-pointer"
                          checked={task.completed}
                          onChange={(event) => handleCheckboxClick(task, event)}
                        />
                      </div>

                      <div className="flex flex-col gap-4">
                        <div className="flex items-center justify-start gap-6">
                          <p className="text-xl capitalize">{task.title}</p>
                        </div>

                        {task.description && (
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-md text-gray-500">
                              {task.description}
                            </p>
                          </div>
                        )}

                        <div className="flex items-center justify-between">
                          <p className="text-md text-gray-500">Priority</p>
                          <Chip
                            text={task.priority}
                            color={
                              task.priority === "normal"
                                ? "rgb(134 239 172)"
                                : "rgb(252 165 165)"
                            }
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <p className="text-md text-gray-500">Due Date</p>
                          <p className="text-md text-gray-500">
                            {formatDate(task.dueDate)}
                          </p>
                        </div>
                      </div>

                      <div>
                        <PencilSquareIcon
                          className="w-6 h-6 hover:cursor-pointer hover:text-blue-500 transition-colors"
                          onClick={() => handleEditClick(task)}
                        />
                      </div>

                      <div>
                        <TrashIcon
                          className="w-6 h-6 hover:cursor-pointer hover:text-red-500 transition-colors"
                          onClick={() => handleDeleteClick(task._id)}
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}

          <div className="cardinfo_box_body w-full">
            {creatingNewTask ? (
              <div>
                <form
                  className="cardinfo_box_list flex flex-col gap-4 rounded-md p-2 border-2 border-gray-200 w-full shadow-md"
                  // onSubmit={() => addTask(props?.card?._id, newTask)}
                  onSubmit={handleNewTaskSubmit}
                >
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleNewTaskChange}
                    className="text-md capitalize border p-2 rounded"
                    placeholder="Task Title"
                    required
                  />
                  <textarea
                    name="description"
                    value={newTask.description}
                    onChange={handleNewTaskChange}
                    className="text-md text-gray-500 border p-2 rounded"
                    placeholder="Task Description"
                  />
                  <div className="flex items-center gap-10">
                    <p className="text-md text-gray-500">Priority</p>
                    <select
                      name="priority"
                      value={newTask.priority}
                      onChange={handleNewTaskChange}
                      className="border p-2 rounded shadow-md"
                    >
                      <option value="normal">Normal</option>
                      <option value="urgent">Urgent</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="text-md text-gray-500">Due Date</p>
                    <input
                      type="date"
                      name="dueDate"
                      value={newTask.dueDate}
                      onChange={handleNewTaskChange}
                      className="rounded-md p-1 border-2 border-gray-200 shadow-md"
                    />
                  </div>
                  <div className="flex justify-end gap-4">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 rounded-lg"
                    >
                      Add Task
                    </button>
                    <button
                      onClick={toggleNewTaskForm}
                      className="bg-gray-500 text-white hover:bg-gray-600 px-4 py-2 rounded-lg"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            ) : (
              <div>
                <p
                  className="w-1/2 hover:cursor-pointer bg-[#f8f8f8] hover:bg-[#ccc] transition-colors p-3 text-center rounded-md shadow-md"
                  onClick={toggleNewTaskForm}
                >
                  Add Task
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CardInfo;
