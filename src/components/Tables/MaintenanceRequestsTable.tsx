import React, { useState, useEffect } from 'react';
import { getAllMaintenanceRequests } from '../../api/maintenance';

interface MaintenanceRequest {
  id: string;
  resident_id: string;
  resident_name: string;
  room_id: string;
  room_number: string;
  building_id: string;
  building_name: string;
  request_type: string;
  description: string;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  created_at: string;
  updated_at: string;
}

interface MaintenanceRequestsTableProps {
  residentFilter?: string;
  roomFilter?: string;
  statusFilter?: string;
  priorityFilter?: string;
}

const MaintenanceRequestsTable: React.FC<MaintenanceRequestsTableProps> = ({
  residentFilter = '',
  roomFilter = '',
  statusFilter = '',
  priorityFilter = ''
}) => {
  const [requests, setRequests] = useState<MaintenanceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        setLoading(true);
        const response = await getAllMaintenanceRequests();
        setRequests(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch maintenance requests');
        console.error('Error fetching maintenance requests:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, []);

  // Filter requests based on all filters
  const filteredRequests = requests.filter((request) => {
    const matchesResident = residentFilter
      ? request.resident_name.toLowerCase().includes(residentFilter.toLowerCase())
      : true;

    const matchesRoom = roomFilter
      ? request.room_number.toLowerCase().includes(roomFilter.toLowerCase())
      : true;

    const matchesStatus = statusFilter
      ? request.status.toLowerCase() === statusFilter.toLowerCase()
      : true;

    const matchesPriority = priorityFilter
      ? request.priority.toLowerCase() === priorityFilter.toLowerCase()
      : true;

    return matchesResident && matchesRoom && matchesStatus && matchesPriority;
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
                Resident
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                Room
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Building
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Description
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Priority
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Date Created
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredRequests.map((request) => (
              <tr key={request.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {request.resident_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{request.room_number}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{request.building_name}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{request.request_type}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{request.description}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    request.priority === 'high' ? 'bg-danger text-danger' :
                    request.priority === 'medium' ? 'bg-warning text-warning' :
                    'bg-success text-success'
                  }`}>
                    {request.priority.charAt(0).toUpperCase() + request.priority.slice(1)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    request.status === 'completed' ? 'bg-success text-success' :
                    request.status === 'in_progress' ? 'bg-warning text-warning' :
                    request.status === 'cancelled' ? 'bg-danger text-danger' :
                    'bg-primary text-primary'
                  }`}>
                    {request.status.split('_').map(word => 
                      word.charAt(0).toUpperCase() + word.slice(1)
                    ).join(' ')}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(request.created_at).toLocaleDateString()}
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

export default MaintenanceRequestsTable;