import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { roomsData, usersData, buildingsData, contractData, residentsData } from '../../data/sampleData';
import { User, Room, Building } from '../../types/hms';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const RoomDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const roomId = Number(id);
  
  // State for room details
  const [room, setRoom] = useState<Room | null>(null);
  const [building, setBuilding] = useState<Building | null>(null);
  const [residents, setResidents] = useState<User[]>([]);
  const [searchNuid, setSearchNuid] = useState('');
  const [searchResult, setSearchResult] = useState<User | null>(null);
  const [error, setError] = useState('');

  // Load room data
  useEffect(() => {
    if (roomId) {
      const roomData = roomsData.find(r => r.room_id === roomId);
      if (roomData) {
        setRoom(roomData);
        
        // Find the building
        const buildingData = buildingsData.find(b => b.id === roomData.building_id);
        if (buildingData) {
          setBuilding(buildingData);
        }
        
        // Find residents in this room
        const residentUsers = usersData.filter(user => 
          roomData.resident_ids?.includes(user.user_id)
        );
        setResidents(residentUsers);
      }
    }
  }, [roomId]);

  const handleSearch = () => {
    const searchNuidNumber = Number(searchNuid);
    if (isNaN(searchNuidNumber)) {
      setError('Please enter a valid NUID number');
      return;
    }
    
    const user = usersData.find((u) => u.nu_id === searchNuidNumber);
    if (user) {
      setSearchResult(user);
      setError('');
    } else {
      setSearchResult(null);
      setError('User not found');
    }
  };

  const handleAllocate = () => {
    if (!searchResult || !room || !building) return;

    // Check if room is full
    if (room.resident_ids && room.resident_ids.length >= room.capacity) {
      setError('Room is at full capacity');
      return;
    }

    // Check if user is already in the room
    if (room.resident_ids?.includes(searchResult.user_id)) {
      setError('User is already allocated to this room');
      return;
    }

    // Check if user already has a contract
    const existingContract = contractData.find(
      (contract) => contract.resident_id === searchResult.nu_id
    );
    
    if (existingContract) {
      setError('User already has an active contract');
      return;
    }

    // Add user to room
    const updatedRoom = {
      ...room,
      resident_ids: [...(room.resident_ids || []), searchResult.user_id],
    };

    // Update room in roomsData (in a real app, this would be an API call)
    const roomIndex = roomsData.findIndex((r) => r.room_id === room.room_id);
    if (roomIndex !== -1) {
      roomsData[roomIndex] = updatedRoom;
    }

    // Create a new resident
    const newResident = {
      resident_id: searchResult.nu_id,
      user_id: searchResult.user_id,
      application_id: 0, // Default application ID for manual allocation
      check_in_date: new Date(),
      check_out_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      room_id: room.room_id,
    };

    // Add the resident to the residentsData array
    residentsData.push(newResident);

    // Create a new contract
    const isFaculty = searchResult.role === 'faculty';
    const newContract = {
      contract_id: contractData.length + 1,
      resident_id: searchResult.nu_id,
      room_id: room.room_id,
      building_id: 1 as const, // Set to 1 as required by the Contract interface
      contract_type: isFaculty ? 'Faculty Lease' : 'Student Lease',
      start_date: new Date(),
      end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      rent_amount: isFaculty ? 1000 : 500,
      contract_status: 'Active',
    };

    // Add the contract to the contractData array
    contractData.push(newContract);

    // Update local state
    setRoom(updatedRoom);
    setResidents([...residents, searchResult]);
    setSearchResult(null);
    setSearchNuid('');
    setError('');

    // Navigate to the contract details page
    navigate(`/housing/contracts/${newContract.contract_id}`);
  };

  const handleDeallocate = (residentId: number) => {
    if (!room) return;

    // Remove user from room
    const updatedRoom = {
      ...room,
      resident_ids: room.resident_ids?.filter(id => id !== residentId) || [],
    };

    // Update room in roomsData (in a real app, this would be an API call)
    const roomIndex = roomsData.findIndex((r) => r.room_id === room.room_id);
    if (roomIndex !== -1) {
      roomsData[roomIndex] = updatedRoom;
    }

    // Update local state
    setRoom(updatedRoom);
    setResidents(residents.filter(r => r.user_id !== residentId));
  };

  if (!room || !building) {
    return (
      <div className="p-6 bg-white dark:bg-boxdark rounded shadow-md">
        <h1 className="text-2xl font-bold text-black dark:text-white">Room not found</h1>
        <button
          onClick={() => navigate('/housing/rooms')}
          className="mt-4 px-4 py-2 bg-primary text-white rounded hover:bg-opacity-90"
        >
          Back to Rooms
        </button>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Room Details" />
      
      <div className="grid grid-cols-1 gap-9">
        {/* Room Info Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">
              Room Information
            </h3>
            {room.resident_ids && room.resident_ids.length < room.capacity && (
              <button
                onClick={() => setSearchNuid('')}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90"
              >
                Allocate User
              </button>
            )}
          </div>
          <div className="p-6.5">
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Room ID
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {room.room_id}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Room Number
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {room.room_number}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Building
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {building?.name} ({building?.type})
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Building Address
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {building?.address}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Capacity
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {room.capacity}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Current Occupancy
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {room.resident_ids?.length || 0} / {room.capacity}
                </p>
              </div>
              {room.apartment_type && (
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Apartment Type
                  </label>
                  <p className="text-sm font-medium text-black dark:text-white">
                    {room.apartment_type}
                  </p>
                </div>
              )}
              {room.unit_type && (
                <div>
                  <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                    Unit Type
                  </label>
                  <p className="text-sm font-medium text-black dark:text-white">
                    {room.unit_type}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Residents Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Current Residents
            </h3>
          </div>
          <div className="p-6.5">
            {residents.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full table-auto">
                  <thead>
                    <tr className="bg-gray-2 text-left dark:bg-meta-4">
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        NU ID
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Name
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Role
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Email
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Phone
                      </th>
                      <th className="py-4 px-4 font-medium text-black dark:text-white">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {residents.map((resident, index) => (
                      <tr key={index}>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{resident.nu_id}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">
                            {resident.first_name} {resident.last_name}
                          </p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{resident.role}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{resident.email}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <p className="text-black dark:text-white">{resident.phone || 'N/A'}</p>
                        </td>
                        <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                          <button
                            onClick={() => handleDeallocate(resident.user_id)}
                            className="px-3 py-1 rounded bg-danger text-white hover:bg-opacity-90"
                          >
                            Deallocate
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-sm font-medium text-black dark:text-white">
                No residents currently allocated to this room.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Manual Allocation */}
      {room.resident_ids && room.resident_ids.length < room.capacity && (
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Manual Allocation
            </h3>
          </div>
          <div className="p-6.5">
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Search by NUID <span className="text-meta-1">*</span>
              </label>
              <div className="flex gap-4">
                <input
                  type="text"
                  value={searchNuid}
                  onChange={(e) => setSearchNuid(e.target.value)}
                  placeholder="Enter NUID"
                  className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                />
                <button
                  onClick={handleSearch}
                  className="flex justify-center rounded bg-primary py-3 px-6 font-medium text-gray hover:bg-opacity-90"
                >
                  Search
                </button>
              </div>
            </div>

            {searchResult && (
              <div className="mb-4.5">
                <h4 className="mb-2.5 text-lg font-medium">Search Result</h4>
                <div className="rounded-sm border border-stroke p-4 dark:border-strokedark">
                  <p>
                    <span className="font-medium">Name:</span>{' '}
                    {searchResult.first_name} {searchResult.last_name}
                  </p>
                  <p>
                    <span className="font-medium">NUID:</span>{' '}
                    {searchResult.nu_id}
                  </p>
                  <p>
                    <span className="font-medium">Email:</span>{' '}
                    {searchResult.email}
                  </p>
                </div>
                <button
                  onClick={handleAllocate}
                  className="mt-4 flex justify-center rounded bg-primary py-2 px-6 font-medium text-gray hover:bg-opacity-90"
                >
                  Allocate to Room
                </button>
              </div>
            )}

            {error && (
              <div className="mt-4 rounded-sm bg-danger bg-opacity-10 py-3 px-4 text-sm text-danger">
                {error}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default RoomDetails; 