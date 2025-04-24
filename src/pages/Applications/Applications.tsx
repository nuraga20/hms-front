import React, { useState } from 'react';
import { applicationsData } from '../../data/sampleData';
import { ApplicationStatus } from '../../types/hms';
import ApplicationsTable from '../../components/Tables/ApplicationsTable';

const Applications: React.FC = () => {
  // State for filters
  const [appIdFilter, setAppIdFilter] = useState<string>('');
  const [nuIdFilter, setNuIdFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [housingTypeFilter, setHousingTypeFilter] = useState<string>('');

  // Housing type options
  const housingTypes = ['Dormitory', 'Apartment', 'Townhouse', 'Cottage'];

  // Handle export to CSV
  const handleExport = () => {
    const headers = ['ID', 'NU ID', 'Date', 'Status', 'Housing Type'];
    const csvContent = [
      headers.join(','),
      ...applicationsData.map(application => [
        application.application_id,
        application.nu_id,
        new Date(application.application_date).toLocaleDateString(),
        application.status,
        application.housing_type || 'N/A'
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'applications.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="text-title-md2 font-semibold text-black dark:text-white">
          Applications
        </h2>
      </div>

      <div className="flex flex-col gap-10">
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Application ID Filter */}
          <div className="w-full">
            <input
              type="text"
              value={appIdFilter}
              onChange={(e) => setAppIdFilter(e.target.value)}
              placeholder="Search by Application ID..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* NU ID Filter */}
          <div className="w-full">
            <input
              type="text"
              value={nuIdFilter}
              onChange={(e) => setNuIdFilter(e.target.value)}
              placeholder="Search by NU ID..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Status Filter */}
          <div className="relative z-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="relative z-20 w-full appearance-none rounded-lg bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary"
            >
              <option value="" className="text-body">All Statuses</option>
              {ApplicationStatus.map((status) => (
                <option key={status} value={status} className="text-body">
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
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

          {/* Housing Type Filter */}
          <div className="relative z-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
            <select
              value={housingTypeFilter}
              onChange={(e) => setHousingTypeFilter(e.target.value)}
              className="relative z-20 w-full appearance-none rounded-lg bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary"
            >
              <option value="" className="text-body">All Housing Types</option>
              {housingTypes.map((type) => (
                <option key={type} value={type} className="text-body">
                  {type}
                </option>
              ))}
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

        {/* Applications Table */}
        <ApplicationsTable 
          filterType={statusFilter}
          searchQuery={appIdFilter || nuIdFilter}
          housingTypeFilter={housingTypeFilter}
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

export default Applications;
