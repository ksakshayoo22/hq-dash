import React, { useState, useEffect } from "react";
import UserList from "./components/UserList";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import "./styles/App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectAll, setSelectAll] = useState(false);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(
          "https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json"
        );
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleSelectRow = (userId) => {
    setSelectedRows((prevSelectedRows) =>
      prevSelectedRows.includes(userId)
        ? prevSelectedRows.filter((id) => id !== userId)
        : [...prevSelectedRows, userId]
    );
  };

  const handleDeleteSelected = () => {
    setFilteredUsers((prevUsers) =>
      prevUsers.filter((user) => !selectedRows.includes(user.id))
    );
    setSelectedRows([]);
  };

  const handleToggleSelectAll = () => {
    setSelectAll((prevSelectAll) => !prevSelectAll);
    setSelectedRows([]);
  };

  return (
    <div
      className="app"
      style={{
        background: "linear-gradient(hsl(158, 82, 57, 85%), hsl(252, 82, 57))",
      }}
    >
      <h1> HQ Admin Dashboard</h1>
      <SearchBar onSearch={handleSearch} />
      <UserList
        users={filteredUsers}
        selectedRows={selectedRows}
        onSelectRow={handleSelectRow}
        onDeleteSelected={handleDeleteSelected}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
        selectAll={selectAll}
        onToggleSelectAll={handleToggleSelectAll}
        setUsers={setFilteredUsers}
      />
    </div>
  );
};

export default App;
