import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import BuildingsTable from '../../components/Tables/BuildingsTable';
import React, { useState } from 'react';
import { buildingsData } from '../../data/sampleData';

const Buildings: React.FC = () => {
  // State for filters
  const [buildingIdFilter, setBuildingIdFilter] = useState<string>('');
  const [buildingTypeFilter, setBuildingTypeFilter] = useState<string>('');
  const [buildingNameFilter, setBuildingNameFilter] = useState<string>('');
  const [allowedResidentsFilter, setAllowedResidentsFilter] = useState<string>('');

  // Handle export to CSV
  const handleExport = () => {
    const headers = ['ID', 'Type', 'Name', 'Address', 'Rooms', 'Allowed Residents'];
    const csvContent = [
      headers.join(','),
      ...buildingsData.map(building => [
        building.id,
        building.type,
        building.name,
        building.address,
        building.allowed_residents.join(';')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'buildings.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      <Breadcrumb pageName="All Buildings" />

      <div className="flex flex-col gap-10">
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Building ID Filter */}
          <div className="w-full">
            <input
              type="text"
              value={buildingIdFilter}
              onChange={(e) => setBuildingIdFilter(e.target.value)}
              placeholder="Search by Building ID..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Building Type Filter */}
          <div className="relative z-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
            <select
              value={buildingTypeFilter}
              onChange={(e) => setBuildingTypeFilter(e.target.value)}
              className="relative z-20 w-full appearance-none rounded-lg bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary"
            >
              <option value="" className="text-body">All Building Types</option>
              <option value="Dormitory" className="text-body">Dormitory</option>
              <option value="Apartment" className="text-body">Apartment</option>
              <option value="Townhouse" className="text-body">Townhouse</option>
              <option value="Cottage" className="text-body">Cottage</option>
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

          {/* Building Name Filter */}
          <div className="w-full">
            <input
              type="text"
              value={buildingNameFilter}
              onChange={(e) => setBuildingNameFilter(e.target.value)}
              placeholder="Search by Building Name..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>

          {/* Allowed Residents Filter */}
          <div className="w-full">
            <input
              type="text"
              value={allowedResidentsFilter}
              onChange={(e) => setAllowedResidentsFilter(e.target.value)}
              placeholder="Search by Allowed Residents..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        {/* Buildings Table */}
        <BuildingsTable 
          buildingIdFilter={buildingIdFilter}
          buildingTypeFilter={buildingTypeFilter}
          buildingNameFilter={buildingNameFilter}
          allowedResidentsFilter={allowedResidentsFilter}
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

export default Buildings;