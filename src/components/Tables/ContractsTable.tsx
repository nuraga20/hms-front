import { useNavigate } from 'react-router-dom';
import { contractData, buildingsData, roomsData } from '../../data/sampleData';

interface ContractsTableProps {
  searchQuery: string;
}

const ContractsTable: React.FC<ContractsTableProps> = ({ searchQuery }) => {
  const navigate = useNavigate();

  // Filter contracts based on search query
  const filteredContracts = contractData.filter((contract) => {
    const room = roomsData.find((room) => room.room_id === contract.room_id);
    const building = buildingsData.find(
      (building) => building.id === contract.building_id,
    );

    const matchesSearch = searchQuery
      ? contract.contract_id.toString().includes(searchQuery) || // Match contract ID
        contract.resident_id.toString().includes(searchQuery) || // Match resident ID
        (room?.room_number &&
          room.room_number.toLowerCase().includes(searchQuery.toLowerCase())) || // Match room number
        (building?.name &&
          building.name.toLowerCase().includes(searchQuery.toLowerCase())) || // Match building name
        contract.contract_type.toLowerCase().includes(searchQuery.toLowerCase()) // Match contract type
      : true;

    return matchesSearch;
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[40px] py-4 px-4 font-medium text-black dark:text-white">
                RES-ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Room
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Building
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredContracts.map((contract, key) => {
              const room = roomsData.find(
                (room) => room.room_id === contract.room_id,
              );
              const building = buildingsData.find(
                (building) => building.id === contract.building_id,
              );

              return (
                <tr
                  key={key}
                  className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => navigate(`/housing/contracts/${contract.contract_id}`)}
                >
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {contract.contract_id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {contract.resident_id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {room ? room.room_number : 'N/A'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {building ? building.name : 'N/A'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {contract.contract_type}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p
                      className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                        contract.contract_status === 'Active'
                          ? 'bg-success text-success'
                          : contract.contract_status === 'Inactive'
                          ? 'bg-danger text-danger'
                          : 'bg-warning text-warning'
                      }`}
                    >
                      {contract.contract_status}
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

export default ContractsTable;