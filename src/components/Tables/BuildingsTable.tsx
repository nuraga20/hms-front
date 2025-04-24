import React from 'react';
import { buildingsData, roomsData } from '../../data/sampleData';

interface BuildingsTableProps {
  buildingIdFilter: string;
  buildingTypeFilter: string;
  buildingNameFilter: string;
  allowedResidentsFilter: string;
}

const BuildingsTable: React.FC<BuildingsTableProps> = ({ 
  buildingIdFilter,
  buildingTypeFilter,
  buildingNameFilter,
  allowedResidentsFilter
}) => {
  // Filter buildings based on all filters
  const filteredBuildings = buildingsData.filter((building) => {
    const matchesBuildingId = buildingIdFilter
      ? building.id.toString().includes(buildingIdFilter)
      : true;

    const matchesBuildingType = buildingTypeFilter
      ? building.type === buildingTypeFilter
      : true;

    const matchesBuildingName = buildingNameFilter
      ? building.name.toLowerCase().includes(buildingNameFilter.toLowerCase())
      : true;

    const matchesAllowedResidents = allowedResidentsFilter
      ? building.allowed_residents.some(resident => 
          resident.toLowerCase().includes(allowedResidentsFilter.toLowerCase())
        )
      : true;

    return matchesBuildingId && matchesBuildingType && matchesBuildingName && 
           matchesAllowedResidents;
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[15px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[40px] py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Address
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Rooms
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Allowed Residents
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBuildings.map((building) => {
              const actualRoomCount = roomsData.filter(
                (room) => room.building_id === building.id
              ).length;

              return (
                <tr key={building.id}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">{building.id}</h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{building.type}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{building.name}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{building.address}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{actualRoomCount}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {building.allowed_residents.join(', ')}
                    </p>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuildingsTable;