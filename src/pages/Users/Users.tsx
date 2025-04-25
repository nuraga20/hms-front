import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import UsersTable from '../../components/Tables/UsersTable';
import React, { useState, useEffect } from 'react';
import { getAllUsers } from '../../api/users';

interface User {
  user_id: string;
  nu_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  role: string;
}

const Users: React.FC = () => {
  // State for users data and loading
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State for filters
  const [nuidFilter, setNuidFilter] = useState<string>('');
  const [nameFilter, setNameFilter] = useState<string>('');
  const [emailFilter, setEmailFilter] = useState<string>('');
  const [phoneFilter, setPhoneFilter] = useState<string>('');
  const [roleFilter, setRoleFilter] = useState<string>('');

  // Fetch users data
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const response = await getAllUsers();
        setUsers(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch users data');
        console.error('Error fetching users:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle export to CSV
  const handleExport = () => {
    const headers = ['ID', 'NUID', 'Name', 'Email', 'Phone', 'Role'];
    const csvContent = [
      headers.join(','),
      ...users.map(user => [
        user.user_id,
        user.nu_id,
        `${user.first_name} ${user.last_name}`,
        user.email,
        user.phone || '',
        user.role
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'users.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="All Users" />

      <div className="flex flex-col gap-10">
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* NUID Filter */}
          <div className="w-full">
            <input
              type="text"
              value={nuidFilter}
              onChange={(e) => setNuidFilter(e.target.value)}
              placeholder="Search by NUID..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Name Filter */}
          <div className="w-full">
            <input
              type="text"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
              placeholder="Search by Name..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Email Filter */}
          <div className="w-full">
            <input
              type="text"
              value={emailFilter}
              onChange={(e) => setEmailFilter(e.target.value)}
              placeholder="Search by Email..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Phone Filter */}
          <div className="w-full">
            <input
              type="text"
              value={phoneFilter}
              onChange={(e) => setPhoneFilter(e.target.value)}
              placeholder="Search by Phone..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Role Filter */}
          <div className="relative z-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="relative z-20 w-full appearance-none rounded-lg bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary"
            >
              <option value="" className="text-body">All Roles</option>
              <option value="Student" className="text-body">Student</option>
              <option value="Faculty" className="text-body">Faculty</option>
              <option value="DSS_staff" className="text-body">DSS_staff</option>
              <option value="USM_staff" className="text-body">USM_staff</option>
              <option value="maintenance" className="text-body">Maintenance</option>
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <g opacity="0.8">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                    fill="#637381"
                  ></path>
                </g>
              </svg>
            </span>
          </div>
        </div>

        {/* Users Table */}
        <UsersTable 
          users={users}
          nuidFilter={nuidFilter}
          nameFilter={nameFilter}
          emailFilter={emailFilter}
          phoneFilter={phoneFilter}
          roleFilter={roleFilter}
        />

        {/* Action Buttons */}
        <div className="flex flex-row gap-3">
          <button
            onClick={handleExport}
            className="inline-flex items-center justify-center rounded-sm border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
          >
            Export to CSV
          </button>
        </div>
      </div>
    </>
  );
};

export default Users;