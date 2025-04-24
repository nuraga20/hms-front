import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import RoomsTable from '../../components/Tables/RoomsTable';
import React, { useState, useMemo } from 'react';
import { buildingsData } from '../../data/sampleData';

const Rooms: React.FC = () => {
  // State for filters
  const [roomIdFilter, setRoomIdFilter] = useState<string>('');
  const [buildingTypeFilter, setBuildingTypeFilter] = useState<string>('');
  const [buildingNameFilter, setBuildingNameFilter] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [residentIdFilter, setResidentIdFilter] = useState<string>('');

  // Get filtered building names based on selected building type
  const filteredBuildingNames = useMemo(() => {
    if (!buildingTypeFilter) return buildingsData;
    
    return buildingsData.filter(building => {
      if (buildingTypeFilter === 'Dormitory') {
        return building.name.startsWith('D');
      } else if (buildingTypeFilter === 'Apartment') {
        return building.name.startsWith('A');
      } else if (buildingTypeFilter === 'Townhouse') {
        const num = parseInt(building.name.substring(1));
        return building.name.startsWith('K') && num >= 1 && num <= 13;
      } else if (buildingTypeFilter === 'Cottage') {
        const num = parseInt(building.name.substring(1));
        return building.name.startsWith('K') && num >= 14 && num <= 18;
      }
      return false;
    });
  }, [buildingTypeFilter]);

  // Reset building name when building type changes
  React.useEffect(() => {
    setBuildingNameFilter('');
  }, [buildingTypeFilter]);

  return (
    <>
      {/* Breadcrumb */}
      <Breadcrumb pageName="All Rooms" />

      <div className="flex flex-col gap-10">
        {/* Filters Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {/* Room ID Filter */}
          <div className="w-full">
            <input
              type="text"
              value={roomIdFilter}
              onChange={(e) => setRoomIdFilter(e.target.value)}
              placeholder="Search by Room ID..."
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
              <option value="Dormitory" className="text-body">Dormitory (D#)</option>
              <option value="Apartment" className="text-body">Apartment (A#)</option>
              <option value="Townhouse" className="text-body">Townhouse (K1-K13)</option>
              <option value="Cottage" className="text-body">Cottage (K14-K18)</option>
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
          <div className="relative z-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
            <select
              value={buildingNameFilter}
              onChange={(e) => setBuildingNameFilter(e.target.value)}
              className="relative z-20 w-full appearance-none rounded-lg bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary"
            >
              <option value="" className="text-body">All Buildings</option>
              {filteredBuildingNames.map((building) => (
                <option key={building.id} value={building.name} className="text-body">
                  {building.name}
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

          {/* Status Filter */}
          <div className="relative z-20 w-full rounded-lg border-[1.5px] border-stroke bg-transparent font-medium outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="relative z-20 w-full appearance-none rounded-lg bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary"
            >
              <option value="" className="text-body">All Statuses</option>
              <option value="empty" className="text-body">Empty</option>
              <option value="occupied" className="text-body">Occupied</option>
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

          {/* Resident ID Filter */}
          <div className="w-full">
            <input
              type="text"
              value={residentIdFilter}
              onChange={(e) => setResidentIdFilter(e.target.value)}
              placeholder="Search by Resident ID..."
              className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
          </div>
        </div>

        {/* Rooms Table */}
        <RoomsTable 
          roomIdFilter={roomIdFilter}
          buildingTypeFilter={buildingTypeFilter}
          buildingNameFilter={buildingNameFilter}
          statusFilter={statusFilter}
          residentIdFilter={residentIdFilter}
        />
      </div>
    </>
  );
};

export default Rooms;