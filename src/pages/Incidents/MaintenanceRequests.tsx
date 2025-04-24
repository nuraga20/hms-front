import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import MaintenanceRequestsTable from '../../components/Tables/MaintenanceRequestsTable';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const MaintenanceRequests: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string>('');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb pageName="All Maintenance Requests" />

      <div className="flex flex-col gap-10">
        {/* Create Maintenance Button */}
        <div className="flex justify-end">
          <Link
            to="/maintenance/create"
            className="bg-primary text-white py-2 px-4 rounded hover:bg-opacity-90"
          >
            Create Maintenance Request
          </Link>
        </div>

        {/* Filter and Search Section */}
        <div className="flex flex-row gap-5">
          {/* Search Input */}
          <div className="relative z-20 bg-white dark:bg-form-input">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search maintenance requests..."
              className="w-full rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>

          {/* Select Type Dropdown */}
          <div className="relative z-20 bg-white dark:bg-form-input">
            <select
              value={selectedOption}
              onChange={(e) => setSelectedOption(e.target.value)}
              className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-12 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
            >
              <option value="" className="text-body dark:text-bodydark">
                Select Type
              </option>
              <option value="completed" className="text-body dark:text-bodydark">
                Completed
              </option>
              <option value="pending" className="text-body dark:text-bodydark">
                Pending
              </option>
              <option value="rejected" className="text-body dark:text-bodydark">
                Rejected
              </option>
            </select>
          </div>
        </div>

        {/* Maintenance Requests Table */}
        <MaintenanceRequestsTable
          filterType={selectedOption}
          searchQuery={searchQuery}
        />
      </div>
    </>
  );
};

export default MaintenanceRequests;