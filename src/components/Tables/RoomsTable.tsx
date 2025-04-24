import { roomsData, buildingsData, usersData } from '../../data/sampleData';
import { useNavigate } from 'react-router-dom';

interface RoomsTableProps {
  roomIdFilter: string;
  buildingTypeFilter: string;
  buildingNameFilter: string;
  statusFilter: string;
  residentIdFilter: string;
}

const RoomsTable: React.FC<RoomsTableProps> = ({ 
  roomIdFilter, 
  buildingTypeFilter,
  buildingNameFilter,
  statusFilter, 
  residentIdFilter 
}) => {
  const navigate = useNavigate();

  // Filter rooms based on all filters
  const filteredRooms = roomsData.filter((room) => {
    const building = buildingsData.find((b) => b.id === room.building_id);
    const buildingName = building ? building.name : '';
    
    // Determine building type
    let buildingType = '';
    if (buildingName.startsWith('D')) {
      buildingType = 'Dormitory';
    } else if (buildingName.startsWith('A')) {
      buildingType = 'Apartment';
    } else if (buildingName.startsWith('K')) {
      const kNumber = parseInt(buildingName.substring(1));
      if (kNumber >= 1 && kNumber <= 13) {
        buildingType = 'Townhouse';
      } else if (kNumber >= 14 && kNumber <= 18) {
        buildingType = 'Cottage';
      }
    }
    
    // Determine room status
    const residentCount = room.resident_ids?.length || 0;
    const isOccupied = residentCount > 0;
    const roomStatus = isOccupied ? 'occupied' : 'empty';
    
    // Apply filters
    const matchesRoomId = roomIdFilter 
      ? room.room_id.toString().includes(roomIdFilter)
      : true;
      
    const matchesBuildingType = buildingTypeFilter
      ? buildingType === buildingTypeFilter
      : true;

    const matchesBuildingName = buildingNameFilter
      ? buildingName === buildingNameFilter
      : true;
      
    const matchesStatus = statusFilter
      ? roomStatus === statusFilter
      : true;
      
    const matchesResidentId = residentIdFilter
      ? room.resident_ids?.some(id => {
          const user = usersData.find(u => u.user_id === id);
          return user?.nu_id.toString().includes(residentIdFilter);
        })
      : true;
    
    return matchesRoomId && matchesBuildingType && matchesBuildingName && matchesStatus && matchesResidentId;
  });

  // Function to export table data to CSV
  const exportToCSV = () => {
    // Prepare the CSV data
    const headers = ['Room ID', 'Building Name', 'Room Number', 'Capacity', 'Status', 'Resident NU IDs'];
    const rows = filteredRooms.map(room => {
      const building = buildingsData.find((b) => b.id === room.building_id);
      const buildingName = building ? building.name : 'Unknown';
      const residentCount = room.resident_ids?.length || 0;
      const status = residentCount === 0
        ? 'Empty'
        : residentCount === room.capacity
        ? 'Fully Occupied'
        : 'Partially Occupied';

      const residentNuIds = room.resident_ids?.map(id => {
        const user = usersData.find(u => u.user_id === id);
        return user?.nu_id || '';
      }).filter(Boolean).join(', ') || 'None';

      return [
        room.room_id,
        buildingName,
        room.room_number,
        room.capacity,
        status,
        residentNuIds
      ];
    });

    // Combine headers and rows
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    // Create and trigger download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'rooms_data.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-black dark:text-white">Rooms List</h2>
        <button
          onClick={exportToCSV}
          className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-6 text-white hover:bg-opacity-90"
        >
          Export to CSV
        </button>
      </div>
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[40px] py-4 px-4 font-medium text-black dark:text-white">
                Building Name
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Room
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Capacity
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Resident NU IDs
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRooms.map((room, key) => {
              const residentCount = room.resident_ids?.length || 0;
              const status =
                residentCount === 0
                  ? 'Empty'
                  : residentCount === room.capacity
                  ? 'Fully Occupied'
                  : 'Partially Occupied';

              const building = buildingsData.find(
                (b) => b.id === room.building_id,
              );
              const buildingName = building ? building.name : 'Unknown';

              const residentNuIds = room.resident_ids?.map(id => {
                const user = usersData.find(u => u.user_id === id);
                return user?.nu_id || '';
              }).filter(Boolean).join(', ') || 'None';

              return (
                <tr 
                  key={key}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => navigate(`/housing/rooms/${room.room_id}`)}
                >
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {room.room_id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{buildingName}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {room.room_number}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {room.capacity}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">{status}</p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {residentNuIds}
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

export default RoomsTable;