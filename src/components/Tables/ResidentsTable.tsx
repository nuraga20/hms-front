import React, { useState, useEffect } from 'react';
import { getAllStudents } from '../../api/users';

interface Resident {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  nu_id: string;
  room_id: string | null;
  building_id: string | null;
  created_at: string;
}

interface ResidentsTableProps {
  nameFilter?: string;
  emailFilter?: string;
  nuidFilter?: string;
}

const ResidentsTable: React.FC<ResidentsTableProps> = ({
  nameFilter = '',
  emailFilter = '',
  nuidFilter = ''
}) => {
  const [residents, setResidents] = useState<Resident[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchResidents = async () => {
      try {
        setLoading(true);
        const response = await getAllStudents();
        setResidents(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch residents data');
        console.error('Error fetching residents:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchResidents();
  }, []);

  // Filter residents based on all filters
  const filteredResidents = residents.filter((resident) => {
    const matchesName = nameFilter
      ? `${resident.first_name} ${resident.last_name}`.toLowerCase().includes(nameFilter.toLowerCase())
      : true;

    const matchesEmail = emailFilter
      ? resident.email.toLowerCase().includes(emailFilter.toLowerCase())
      : true;

    const matchesNuid = nuidFilter
      ? resident.nu_id.toLowerCase().includes(nuidFilter.toLowerCase())
      : true;

    return matchesName && matchesEmail && matchesNuid;
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
                Email
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                NU ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Room
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Building
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredResidents.map((resident) => (
              <tr key={resident.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {resident.first_name} {resident.last_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{resident.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{resident.nu_id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{resident.phone || 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{resident.room_id || 'Not Assigned'}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{resident.building_id || 'Not Assigned'}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ResidentsTable;
