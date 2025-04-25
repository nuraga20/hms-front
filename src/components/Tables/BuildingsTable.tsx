import React, { useState, useEffect } from 'react';
import { getCampusApartments, getDormitoryRooms, getTownhouses } from '../../api/housing';

interface Building {
  id: string;
  name: string;
  type: 'dormitory' | 'apartment' | 'townhouse';
  address: string;
  total_rooms: number;
  available_rooms: number;
  created_at: string;
}

interface BuildingsTableProps {
  nameFilter?: string;
  typeFilter?: string;
}

const BuildingsTable: React.FC<BuildingsTableProps> = ({
  nameFilter = '',
  typeFilter = ''
}) => {
  const [buildings, setBuildings] = useState<Building[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBuildings = async () => {
      try {
        setLoading(true);
        const [dormitories, apartments, townhouses] = await Promise.all([
          getDormitoryRooms(),
          getCampusApartments(),
          getTownhouses()
        ]);

        const allBuildings = [
          ...dormitories.data.map((b: any) => ({ ...b, type: 'dormitory' })),
          ...apartments.data.map((b: any) => ({ ...b, type: 'apartment' })),
          ...townhouses.data.map((b: any) => ({ ...b, type: 'townhouse' }))
        ];

        setBuildings(allBuildings);
        setError(null);
      } catch (err) {
        setError('Failed to fetch buildings data');
        console.error('Error fetching buildings:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuildings();
  }, []);

  // Filter buildings based on all filters
  const filteredBuildings = buildings.filter((building) => {
    const matchesName = nameFilter
      ? building.name.toLowerCase().includes(nameFilter.toLowerCase())
      : true;

    const matchesType = typeFilter
      ? building.type.toLowerCase() === typeFilter.toLowerCase()
      : true;

    return matchesName && matchesType;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Name
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Address
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Total Rooms
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Available Rooms
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Date Added
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredBuildings.map((building) => (
              <tr key={building.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {building.name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {building.type.charAt(0).toUpperCase() + building.type.slice(1)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{building.address}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{building.total_rooms}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{building.available_rooms}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(building.created_at).toLocaleDateString()}
                  </p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BuildingsTable;