import React from 'react';
import { applicationsData, usersData } from '../../data/sampleData';
import { Link } from 'react-router-dom';

interface ApplicationsTableProps {
  filterType: string;
  searchQuery: string;
  housingTypeFilter: string;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  filterType,
  searchQuery,
  housingTypeFilter
}) => {
  // Filter applications based on status, search query, and housing type
  const filteredApplications = applicationsData.filter((application) => {
    const matchesStatus = filterType
      ? application.status === filterType
      : true;

    const matchesSearch = searchQuery
      ? application.nu_id.toString().includes(searchQuery) ||
        application.application_id.toString().includes(searchQuery)
      : true;

    const matchesHousingType = housingTypeFilter
      ? application.housing_type === housingTypeFilter
      : true;

    return matchesStatus && matchesSearch && matchesHousingType;
  });

  // Helper function to get user role by NU ID
  const getUserRole = (nuId: number) => {
    const user = usersData.find(user => user.nu_id === nuId);
    return user ? user.role : 'Unknown';
  };

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[220px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                APP-ID
              </th>
              <th className="min-w-[150px] py-4 px-4 font-medium text-black dark:text-white">
                NU ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Housing Type
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.application_id}>
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {application.application_id}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{application.nu_id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {getUserRole(application.nu_id)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {application.application_date.toLocaleDateString()}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    application.status === 'approved'
                      ? 'text-success bg-success'
                      : application.status === 'rejected'
                      ? 'text-danger bg-danger'
                      : 'text-warning bg-warning'
                  }`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{application.housing_type}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <Link
                    to={`/applications/${application.application_id}`}
                    className="inline-flex items-center justify-center rounded-md bg-primary py-2 px-4 text-center font-medium text-white hover:bg-opacity-90"
                  >
                    View
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
