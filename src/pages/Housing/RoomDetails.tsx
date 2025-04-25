import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDormitoryRoomById } from '../../api/housing';
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
  description?: string;
  amenities?: string[];
}

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [room, setRoom] = useState<Room | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRoom = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await getDormitoryRoomById(id);
        setRoom(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch room details');
        console.error('Error fetching room:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !room) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error || 'Room not found'}</div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName={`Room ${room.room_number}`} />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Room Details
              </h3>
            </div>
            <div className="p-6.5">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Room Number
                  </label>
                  <p className="text-black dark:text-white">{room.room_number}</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Building
                  </label>
                  <p className="text-black dark:text-white">{room.building_name}</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Capacity
                  </label>
                  <p className="text-black dark:text-white">{room.capacity}</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Current Occupants
                  </label>
                  <p className="text-black dark:text-white">{room.current_occupants}</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Status
                  </label>
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    room.status === 'available' ? 'bg-success text-success' :
                    room.status === 'occupied' ? 'bg-warning text-warning' :
                    'bg-danger text-danger'
                  }`}>
                    {room.status.charAt(0).toUpperCase() + room.status.slice(1)}
                  </p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Date Added
                  </label>
                  <p className="text-black dark:text-white">
                    {new Date(room.created_at).toLocaleDateString()}
                  </p>
                </div>

                {room.description && (
                  <div className="md:col-span-2">
                    <label className="mb-3 block text-black dark:text-white">
                      Description
                    </label>
                    <p className="text-black dark:text-white">{room.description}</p>
                  </div>
                )}

                {room.amenities && room.amenities.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="mb-3 block text-black dark:text-white">
                      Amenities
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {room.amenities.map((amenity, index) => (
                        <span
                          key={index}
                          className="inline-flex items-center rounded-full bg-primary bg-opacity-10 py-1 px-3 text-sm font-medium text-primary"
                        >
                          {amenity}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => navigate('/housing/rooms')}
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                  Back to Rooms
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RoomDetails; 