import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { userAPI } from '../../services/api';
import './AdminUsers.css';

const AdminUsers = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    userType: new URLSearchParams(location.search).get('userType') || '',
    isActive: '',
    search: ''
  });
  const [pagination, setPagination] = useState({
    page: 1,
    totalPages: 1,
    total: 0
  });

  useEffect(() => {
    fetchUsers();
  }, [filters, pagination.page]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = {
        page: pagination.page,
        limit: 10,
        ...(filters.userType && { userType: filters.userType }),
        ...(filters.isActive && { isActive: filters.isActive }),
        ...(filters.search && { search: filters.search })
      };
      const response = await userAPI.getAllUsers(params);
      setUsers(response.data.users);
      setPagination({
        page: response.data.pagination.page,
        totalPages: response.data.pagination.totalPages,
        total: response.data.total
      });
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPagination(prev => ({ ...prev, page: 1 }));
  };

  const handleDeleteUser = async (userId, userEmail) => {
    if (window.confirm(`Are you sure you want to delete user ${userEmail}?`)) {
      try {
        await userAPI.deleteUser(userId);
        fetchUsers();
      } catch (error) {
        console.error('Error deleting user:', error);
        alert('Failed to delete user');
      }
    }
  };

  const handleToggleStatus = async (userId, currentStatus) => {
    try {
      await userAPI.updateUser(userId, { isActive: !currentStatus });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user status:', error);
      alert('Failed to update user status');
    }
  };

  return (
    <div className="admin-users-container">
      <div className="users-header">
        <h1>Manage Users</h1>
        <div className="filters-bar">
          <select
            value={filters.userType}
            onChange={(e) => handleFilterChange('userType', e.target.value)}
            className="filter-select"
          >
            <option value="">All Types</option>
            <option value="personal">Personal</option>
            <option value="business">Business</option>
            <option value="admin">Admin</option>
          </select>
          
          <select
            value={filters.isActive}
            onChange={(e) => handleFilterChange('isActive', e.target.value)}
            className="filter-select"
          >
            <option value="">All Status</option>
            <option value="true">Active</option>
            <option value="false">Inactive</option>
          </select>
          
          <input
            type="text"
            placeholder="Search by email or name..."
            value={filters.search}
            onChange={(e) => handleFilterChange('search', e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      {loading ? (
        <div className="loading-spinner">Loading users...</div>
      ) : (
        <>
          <div className="users-table-container">
            <table className="users-table">
              <thead>
                <tr>
                  <th>Email</th>
                  <th>User Type</th>
                  <th>Name/Company</th>
                  <th>Status</th>
                  <th>Joined</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user.email}</td>
                    <td>
                      <span className={`user-type-badge ${user.userType}`}>
                        {user.userType}
                      </span>
                    </td>
                    <td>
                      {user.userType === 'personal' 
                        ? `${user.personalDetails?.firstName || ''} ${user.personalDetails?.lastName || ''}`
                        : user.businessDetails?.companyName || '-'
                      }
                    </td>
                    <td>
                      <button
                        onClick={() => handleToggleStatus(user._id, user.isActive)}
                        className={`status-toggle ${user.isActive ? 'active' : 'inactive'}`}
                      >
                        {user.isActive ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <td>{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td>
                      <div className="action-buttons">
                        <button
                          onClick={() => navigate(`/admin/users/${user._id}`)}
                          className="view-btn"
                        >
                          View
                        </button>
                        <button
                          onClick={() => handleDeleteUser(user._id, user.email)}
                          className="delete-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {pagination.totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                disabled={pagination.page === 1}
                className="page-btn"
              >
                Previous
              </button>
              <span className="page-info">
                Page {pagination.page} of {pagination.totalPages}
              </span>
              <button
                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                disabled={pagination.page === pagination.totalPages}
                className="page-btn"
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminUsers;