import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDormitoryRooms } from '../../api/housing';
import RoomsTable from '../../components/Tables/RoomsTable';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

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

const Rooms: React.FC = () => {
  const navigate = useNavigate();
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    roomNumber: '',
    building: '',
    status: ''
  });

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

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <>
      <Breadcrumb pageName="Rooms" />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Room Filters
              </h3>
            </div>
            <div className="flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Room Number
                </label>
                <input
                  type="text"
                  name="roomNumber"
                  value={filters.roomNumber}
                  onChange={handleFilterChange}
                  placeholder="Enter room number"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Building
                </label>
                <input
                  type="text"
                  name="building"
                  value={filters.building}
                  onChange={handleFilterChange}
                  placeholder="Enter building name"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
              </div>

              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Status
                </label>
                <select
                  name="status"
                  value={filters.status}
                  onChange={handleFilterChange}
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                >
                  <option value="">All Statuses</option>
                  <option value="available">Available</option>
                  <option value="occupied">Occupied</option>
                  <option value="maintenance">Maintenance</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Rooms List
              </h3>
            </div>
            <div className="p-6.5">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="flex items-center justify-center h-64">
                  <div className="text-red-500">{error}</div>
                </div>
              ) : (
                <RoomsTable
                  roomNumberFilter={filters.roomNumber}
                  buildingFilter={filters.building}
                  statusFilter={filters.status}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Rooms;