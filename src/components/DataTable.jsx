import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpDown, ChevronUp, ChevronDown, Search, Download, Eye, Edit, Trash2 } from 'lucide-react';
import './DataTable.css';

const mockData = [
  { id: 1, name: 'John Anderson', email: 'john.anderson@email.com', role: 'Admin', status: 'Active', lastActive: '2026-04-12', projects: 12 },
  { id: 2, name: 'Sarah Mitchell', email: 'sarah.m@email.com', role: 'Editor', status: 'Active', lastActive: '2026-04-12', projects: 8 },
  { id: 3, name: 'Michael Chen', email: 'mchen@email.com', role: 'Viewer', status: 'Inactive', lastActive: '2026-04-10', projects: 3 },
  { id: 4, name: 'Emily Davis', email: 'emily.d@email.com', role: 'Editor', status: 'Active', lastActive: '2026-04-11', projects: 15 },
  { id: 5, name: 'Robert Wilson', email: 'rwilson@email.com', role: 'Admin', status: 'Active', lastActive: '2026-04-12', projects: 20 },
  { id: 6, name: 'Lisa Thompson', email: 'lisa.t@email.com', role: 'Viewer', status: 'Pending', lastActive: '2026-04-09', projects: 2 },
  { id: 7, name: 'James Brown', email: 'jbrown@email.com', role: 'Editor', status: 'Active', lastActive: '2026-04-11', projects: 9 },
  { id: 8, name: 'Amanda White', email: 'awhite@email.com', role: 'Viewer', status: 'Inactive', lastActive: '2026-04-08', projects: 1 },
  { id: 9, name: 'David Lee', email: 'dlee@email.com', role: 'Editor', status: 'Active', lastActive: '2026-04-12', projects: 11 },
  { id: 10, name: 'Jennifer Martin', email: 'jmartin@email.com', role: 'Admin', status: 'Active', lastActive: '2026-04-12', projects: 18 },
  { id: 11, name: 'Christopher Garcia', email: 'cgarcia@email.com', role: 'Viewer', status: 'Active', lastActive: '2026-04-10', projects: 5 },
  { id: 12, name: 'Michelle Rodriguez', email: 'mrodriguez@email.com', role: 'Editor', status: 'Pending', lastActive: '2026-04-07', projects: 7 },
];

const DataTable = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [selectedRows, setSelectedRows] = useState([]);

  const filteredData = useMemo(() => {
    let data = [...mockData];
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      data = data.filter(item => item.name.toLowerCase().includes(query) || item.email.toLowerCase().includes(query));
    }
    if (statusFilter !== 'all') {
      data = data.filter(item => item.status.toLowerCase() === statusFilter);
    }
    if (sortConfig.key) {
      data.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
      });
    }
    return data;
  }, [searchQuery, statusFilter, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredData, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleSort = (key) => {
    setSortConfig(prev => ({ key, direction: prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc' }));
  };

  const toggleSelectAll = () => {
    setSelectedRows(selectedRows.length === paginatedData.length ? [] : paginatedData.map(row => row.id));
  };

  const toggleSelectRow = (id) => {
    setSelectedRows(prev => prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]);
  };

  const getStatusClass = (status) => {
    switch (status.toLowerCase()) {
      case 'active': return 'status-active';
      case 'inactive': return 'status-inactive';
      case 'pending': return 'status-pending';
      default: return '';
    }
  };

  const renderSortIcon = (column) => {
    if (sortConfig.key !== column) return <ArrowUpDown size={14} className="sort-icon inactive" />;
    return sortConfig.direction === 'asc' ? <ChevronUp size={14} className="sort-icon" /> : <ChevronDown size={14} className="sort-icon" />;
  };

  return (
    <motion.main className="datatable-page" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.4 }}>
      <motion.div className="page-header glass" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }}>
        <div className="page-header-content">
          <h1>Data Table</h1>
          <p>Manage and view all your users, orders, and data in one place</p>
        </div>
        <div className="table-actions">
          <button className="btn-export"><Download size={16} />Export</button>
        </div>
      </motion.div>

      <motion.div className="table-controls glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.15 }}>
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input type="text" placeholder="Search users..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="filter-group">
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="status-select">
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="pending">Pending</option>
          </select>
          <select value={itemsPerPage} onChange={(e) => { setItemsPerPage(Number(e.target.value)); setCurrentPage(1); }} className="items-select">
            <option value={10}>10 / page</option>
            <option value={25}>25 / page</option>
            <option value={50}>50 / page</option>
          </select>
        </div>
      </motion.div>

      <motion.div className="table-container glass" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }}>
        <div className="table-responsive">
          <table>
            <thead>
              <tr>
                <th className="checkbox-cell"><input type="checkbox" checked={selectedRows.length === paginatedData.length && paginatedData.length > 0} onChange={toggleSelectAll} /></th>
                <th onClick={() => handleSort('name')} className="sortable">User {renderSortIcon('name')}</th>
                <th>Email</th>
                <th onClick={() => handleSort('role')} className="sortable">Role {renderSortIcon('role')}</th>
                <th onClick={() => handleSort('status')} className="sortable">Status {renderSortIcon('status')}</th>
                <th onClick={() => handleSort('projects')} className="sortable">Projects {renderSortIcon('projects')}</th>
                <th onClick={() => handleSort('lastActive')} className="sortable">Last Active {renderSortIcon('lastActive')}</th>
                <th className="actions-cell">Actions</th>
              </tr>
            </thead>
            <tbody>
              <AnimatePresence mode="popLayout">
                {paginatedData.map((row) => (
                  <motion.tr key={row.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} layout>
                    <td className="checkbox-cell"><input type="checkbox" checked={selectedRows.includes(row.id)} onChange={() => toggleSelectRow(row.id)} /></td>
                    <td className="user-cell"><div className="user-avatar">{row.name.split(' ').map(n => n[0]).join('')}</div><span>{row.name}</span></td>
                    <td className="email-cell">{row.email}</td>
                    <td className="role-cell">{row.role}</td>
                    <td><span className={`status-badge ${getStatusClass(row.status)}`}>{row.status}</span></td>
                    <td className="projects-cell">{row.projects}</td>
                    <td className="date-cell">{row.lastActive}</td>
                    <td className="actions-cell">
                      <button className="action-btn" title="View"><Eye size={16} /></button>
                      <button className="action-btn" title="Edit"><Edit size={16} /></button>
                      <button className="action-btn delete" title="Delete"><Trash2 size={16} /></button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
        <div className="table-footer">
          <div className="table-info">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredData.length)} of {filteredData.length} entries
            {selectedRows.length > 0 && <span className="selected-info">({selectedRows.length} selected)</span>}
          </div>
          <div className="pagination">
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(1)}>««</button>
            <button className="page-btn" disabled={currentPage === 1} onClick={() => setCurrentPage(prev => prev - 1)}>«</button>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum = totalPages <= 5 ? i + 1 : currentPage <= 3 ? i + 1 : currentPage >= totalPages - 2 ? totalPages - 4 + i : currentPage - 2 + i;
              return <button key={pageNum} className={`page-btn ${currentPage === pageNum ? 'active' : ''}`} onClick={() => setCurrentPage(pageNum)}>{pageNum}</button>;
            })}
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(prev => prev + 1)}>»</button>
            <button className="page-btn" disabled={currentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>»»</button>
          </div>
        </div>
      </motion.div>
    </motion.main>
  );
};

export default DataTable;