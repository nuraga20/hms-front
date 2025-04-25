import React, { useState, useEffect } from 'react';
import { getAllContracts } from '../../api/contracts';

interface Contract {
  id: string;
  resident_id: string;
  resident_name: string;
  room_id: string;
  room_number: string;
  building_id: string;
  building_name: string;
  contract_type: string;
  start_date: string;
  end_date: string;
  rent_amount: number;
  status: 'active' | 'expired' | 'terminated';
  created_at: string;
}

interface ContractsTableProps {
  residentFilter?: string;
  roomFilter?: string;
  statusFilter?: string;
}

const ContractsTable: React.FC<ContractsTableProps> = ({
  residentFilter = '',
  roomFilter = '',
  statusFilter = ''
}) => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        setLoading(true);
        const response = await getAllContracts();
        setContracts(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch contracts data');
        console.error('Error fetching contracts:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  // Filter contracts based on all filters
  const filteredContracts = contracts.filter((contract) => {
    const matchesResident = residentFilter
      ? contract.resident_name.toLowerCase().includes(residentFilter.toLowerCase())
      : true;

    const matchesRoom = roomFilter
      ? contract.room_number.toLowerCase().includes(roomFilter.toLowerCase())
      : true;

    const matchesStatus = statusFilter
      ? contract.status.toLowerCase() === statusFilter.toLowerCase()
      : true;

    return matchesResident && matchesRoom && matchesStatus;
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
                Start Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                End Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Rent
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((contract) => (
              <tr key={contract.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {contract.resident_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{contract.room_number}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{contract.building_name}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{contract.contract_type}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(contract.start_date).toLocaleDateString()}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(contract.end_date).toLocaleDateString()}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    ${contract.rent_amount.toLocaleString()}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    contract.status === 'active' ? 'bg-success text-success' :
                    contract.status === 'expired' ? 'bg-warning text-warning' :
                    'bg-danger text-danger'
                  }`}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
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

export default ContractsTable;