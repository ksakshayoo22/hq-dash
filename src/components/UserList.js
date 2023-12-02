import React, { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Pagination from "./Pagination";
import "../styles/UserList.css";

const UserList = ({
  users,
  selectedRows,
  onSelectRow,
  onDeleteSelected,
  currentPage,
  onPageChange,
  onToggleSelectAll,
  selectAll,

  setUsers,
}) => {
  const usersPerPage = 10;
  const [editableUserId, setEditableUserId] = useState(null);
  const [editedData, setEditedData] = useState({});
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users.slice(indexOfFirstUser, indexOfLastUser);

  const handleEdit = (userId, currentData) => {
    setEditableUserId(userId);
    setEditedData(currentData);
  };

  const handleSave = (userId) => {
    console.log(
      `Save changes for user with ID: ${userId}, new data: `,
      editedData
    );

    const index = users.findIndex((user) => user.id === userId);
    const updated = users.slice();
    updated[index] = editedData;
    setUsers(updated);
    setEditableUserId(null);
    setEditedData({});
  };

  const handleInputChange = (field, value) => {
    setEditedData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSelectRow = (userId) => {
    onSelectRow(userId);
  };

  const handleToggleSelectAll = () => {
    onToggleSelectAll();
  };

  return (
    <div className="user-list">
      <ul>
        <li className="column-titles">
          <input
            type="checkbox"
            onChange={handleToggleSelectAll}
            checked={selectAll}
          />
          <span>Name</span>
          <span>Email</span>
          <span>Role</span>
          <span>Action</span>
        </li>
        {currentUsers.map((user) => (
          <li
            key={user.id}
            onClick={() => handleSelectRow(user.id)}
            className={selectedRows.includes(user.id) ? "selected" : ""}
          >
            <input
              type="checkbox"
              onChange={() => handleSelectRow(user.id)}
              checked={selectedRows.includes(user.id)}
            />
            <span>
              {user.id === editableUserId ? (
                <input
                  type="text"
                  value={editedData.name || user.name}
                  onChange={(e) => handleInputChange("name", e.target.value)}
                />
              ) : (
                user.name
              )}
            </span>
            <span>
              {user.id === editableUserId ? (
                <input
                  type="text"
                  value={editedData.email || user.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                />
              ) : (
                user.email
              )}
            </span>
            <span>
              {user.id === editableUserId ? (
                <input
                  type="text"
                  value={editedData.role || user.role}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                />
              ) : (
                user.role
              )}
            </span>
            <span>
              {user.id === editableUserId ? (
                <button
                  className="action-button save"
                  onClick={() => handleSave(user.id)}
                >
                  Save
                </button>
              ) : (
                <button
                  className="action-button edit"
                  onClick={() =>
                    handleEdit(user.id, {
                      name: user.name,
                      email: user.email,
                      role: user.role,
                    })
                  }
                >
                  Edit
                </button>
              )}
            </span>
          </li>
        ))}
      </ul>
      <div className="user-list-actions">
        <button
          className="action-button delete-bulk"
          onClick={onDeleteSelected}
          disabled={selectedRows.length === 0}
        >
          <FaTrash />{" "}
          {selectedRows.length > 0
            ? `Delete Selected (${selectedRows.length})`
            : "Delete Selected"}
        </button>
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(users.length / usersPerPage)}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default UserList;
