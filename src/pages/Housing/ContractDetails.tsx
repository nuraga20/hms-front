import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { contractData, buildingsData, roomsData, residentsData, usersData } from '../../data/sampleData';

const ContractDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const contractId = Number(id);

  // Find the contract by ID
  const contract = contractData.find((c) => c.contract_id === contractId);

  if (!contract) {
    return (
      <>
        <Breadcrumb pageName="Contract Details" />
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white text-xl">
              Contract not found
            </h3>
          </div>
          <div className="p-7">
            <Link
              to="/housing/contracts"
              className="inline-flex items-center justify-center rounded-md border border-stroke py-2 px-6 text-center font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            >
              Back to Contracts
            </Link>
          </div>
        </div>
      </>
    );
  }

  // Find the associated room and building
  const room = roomsData.find((room) => room.room_id === contract.room_id);
  const building = buildingsData.find(
    (building) => building.id === contract.building_id,
  );
  
  // Find the resident and user information
  const resident = residentsData.find((r) => r.resident_id === contract.resident_id);
  const user = resident ? usersData.find((u) => u.user_id === resident.user_id) : null;
  
  // Format dates
  const startDate = new Date(contract.start_date);
  const endDate = new Date(contract.end_date);
  
  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-success bg-opacity-10 text-success';
      case 'Inactive':
        return 'bg-danger bg-opacity-10 text-danger';
      default:
        return 'bg-warning bg-opacity-10 text-warning';
    }
  };

  return (
    <>
      <Breadcrumb pageName="Contract Details" />

      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        {/* Contract Header */}
        <div className="border-b border-stroke py-4 px-7 dark:border-strokedark">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-black dark:text-white text-xl">
              Contract #{contract.contract_id}
            </h3>
            <span className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${getStatusColor(contract.contract_status)}`}>
              {contract.contract_status}
            </span>
          </div>
        </div>

        {/* Contract Content */}
        <div className="p-7">
          {/* Contract Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold mb-2">HOUSING CONTRACT</h1>
            <p className="text-gray-500 dark:text-gray-400">Nazarbayev University Housing Management System</p>
          </div>

          {/* Contract Body */}
          <div className="space-y-8">
            {/* Contract Information */}
            <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
              <h4 className="mb-4 text-lg font-medium text-black dark:text-white border-b border-stroke pb-2 dark:border-strokedark">
                Contract Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contract ID</p>
                  <p className="font-medium text-black dark:text-white">{contract.contract_id}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Contract Type</p>
                  <p className="font-medium text-black dark:text-white">{contract.contract_type}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Start Date</p>
                  <p className="font-medium text-black dark:text-white">{startDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">End Date</p>
                  <p className="font-medium text-black dark:text-white">{endDate.toLocaleDateString()}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Rent Amount</p>
                  <p className="font-medium text-black dark:text-white">${contract.rent_amount} per month</p>
                </div>
              </div>
            </div>

            {/* Resident Information */}
            <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
              <h4 className="mb-4 text-lg font-medium text-black dark:text-white border-b border-stroke pb-2 dark:border-strokedark">
                Resident Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Resident ID</p>
                  <p className="font-medium text-black dark:text-white">{contract.resident_id}</p>
                </div>
                {user && (
                  <>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Name</p>
                      <p className="font-medium text-black dark:text-white">{user.first_name} {user.last_name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Email</p>
                      <p className="font-medium text-black dark:text-white">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Phone</p>
                      <p className="font-medium text-black dark:text-white">{user.phone || 'N/A'}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Housing Information */}
            <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
              <h4 className="mb-4 text-lg font-medium text-black dark:text-white border-b border-stroke pb-2 dark:border-strokedark">
                Housing Information
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Building</p>
                  <p className="font-medium text-black dark:text-white">{building ? building.name : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Room Number</p>
                  <p className="font-medium text-black dark:text-white">{room ? room.room_number : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Building Type</p>
                  <p className="font-medium text-black dark:text-white">{building ? building.type : 'N/A'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Building Address</p>
                  <p className="font-medium text-black dark:text-white">{building ? building.address : 'N/A'}</p>
                </div>
              </div>
            </div>

            {/* Contract Terms */}
            <div className="rounded-sm border border-stroke bg-white p-4 dark:border-strokedark dark:bg-boxdark">
              <h4 className="mb-4 text-lg font-medium text-black dark:text-white border-b border-stroke pb-2 dark:border-strokedark">
                Contract Terms
              </h4>
              <div className="space-y-4">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  This contract is binding between the resident and the housing management system. The resident agrees to pay the specified rent amount on time and follow all housing policies.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The contract is valid from {startDate.toLocaleDateString()} to {endDate.toLocaleDateString()}. Early termination may be subject to penalties as per housing policies.
                </p>
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  The resident is responsible for maintaining the room in good condition and reporting any maintenance issues promptly.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-8 flex justify-end space-x-4">
            <Link
              to="/housing/contracts"
              className="inline-flex items-center justify-center rounded-md border border-stroke py-2 px-6 text-center font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
            >
              Back to Contracts
            </Link>
            <button
              onClick={() => window.print()}
              className="inline-flex items-center justify-center rounded-md border border-primary bg-primary py-2 px-6 text-center font-medium text-white hover:bg-opacity-90"
            >
              Print Contract
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetails;