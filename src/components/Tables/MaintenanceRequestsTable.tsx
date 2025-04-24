import { useNavigate } from 'react-router-dom';
import {
  buildingsData,
  maintenanceRequestsData,
  roomsData,
} from '../../data/sampleData';

interface MaintenanceRequestsTableProps {
  filterType: string;
  searchQuery: string;
}

const MaintenanceRequestsTable: React.FC<MaintenanceRequestsTableProps> = ({
  filterType,
  searchQuery,
}) => {
  // Filter the maintenance requests based on type and search query
  const filteredProperties = maintenanceRequestsData.filter((maintenanceRequest) => {
    const matchesType = filterType ? maintenanceRequest.status === filterType : true;

    const matchesSearch = searchQuery
      ? maintenanceRequest.request_id.toString().includes(searchQuery) || // Match request ID
        maintenanceRequest.resident_id.toString().includes(searchQuery) || // Match resident ID
        maintenanceRequest.description.toLowerCase().includes(searchQuery.toLowerCase()) || // Match description
        roomsData.find((room) => room.building_id === maintenanceRequest.room_id)?.room_number
          ?.toString()
          .includes(searchQuery) || // Match room number
        buildingsData
          .find((building) => building.id === maintenanceRequest.room_id)
          ?.name.toLowerCase()
          .includes(searchQuery.toLowerCase()) // Match building name
      : true;

    return matchesType && matchesSearch;
  });

  const navigate = useNavigate();
  const goRouteId = (maintenanceRequestItem: any) => {
    navigate(`/maintenance/${maintenanceRequestItem.request_id}`);
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                REQ-ID
              </th>
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                NU-ID
              </th>
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                Building
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Room
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                STAFF-ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Request Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredProperties.map((maintenanceRequestItem, key) => {
              const room = roomsData.find(
                (room) => room.building_id === maintenanceRequestItem.room_id,
              );

              const building = buildingsData.find(
                (building) => building.id === room?.building_id,
              );

              return (
                <tr
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  key={key}
                  onClick={() => goRouteId(maintenanceRequestItem)}
                >
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {maintenanceRequestItem.request_id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {maintenanceRequestItem.resident_id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {building?.name}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {room?.room_number}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {maintenanceRequestItem.staff_id ?? 'N/A'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {new Date(
                        maintenanceRequestItem.request_date,
                      ).toLocaleDateString()}{' '}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {maintenanceRequestItem.description}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        maintenanceRequestItem.status === 'completed'
                          ? 'bg-success text-success'
                          : maintenanceRequestItem.status === 'rejected'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                    >
                      {maintenanceRequestItem.status}
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

export default MaintenanceRequestsTable;