import React, { useState, useEffect } from 'react';
import { getDormitoryRooms } from '../../api/housing';

interface Room {
  id: string;
  room_number: string;
  building_id: string;
  building_name: string;
  capacity: number;
  current_occupants: number;
  status: 'available' | 'occupied' | 'maintenance';
  created_at: string;
}

interface RoomsTableProps {
  roomNumberFilter?: string;
  buildingFilter?: string;
  statusFilter?: string;
}

const RoomsTable: React.FC<RoomsTableProps> = ({
  roomNumberFilter = '',
  buildingFilter = '',
  statusFilter = ''
}) => {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const response = await getDormitoryRooms();
        setRooms(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch rooms data');
        console.error('Error fetching rooms:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // Filter rooms based on all filters
  const filteredRooms = rooms.filter((room) => {
    const matchesRoomNumber = roomNumberFilter
      ? room.room_number.toLowerCase().includes(roomNumberFilter.toLowerCase())
      : true;

    const matchesBuilding = buildingFilter
      ? room.building_name.toLowerCase().includes(buildingFilter.toLowerCase())
      : true;

    const matchesStatus = statusFilter
      ? room.status.toLowerCase() === statusFilter.toLowerCase()
      : true;

    return matchesRoomNumber && matchesBuilding && matchesStatus;
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
                Room Number
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Building
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Capacity
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Current Occupants
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Date Added
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room) => (
              <tr key={room.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {room.room_number}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{room.building_name}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{room.capacity}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{room.current_occupants}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    room.status === 'available' ? 'bg-success text-success' :
                    room.status === 'occupied' ? 'bg-warning text-warning' :
                    'bg-danger text-danger'
                  }`}>
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(room.created_at).toLocaleDateString()}
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

export default RoomsTable;