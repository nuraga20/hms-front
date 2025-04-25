import React from 'react';

interface Application {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: string;
  created_at: string;
}

interface ApplicationsTableProps {
  applications: Application[];
  nameFilter: string;
  emailFilter: string;
  statusFilter: string;
}

const ApplicationsTable: React.FC<ApplicationsTableProps> = ({
  applications,
  nameFilter,
  emailFilter,
  statusFilter
}) => {
  // Filter applications based on all filters
  const filteredApplications = applications.filter((application) => {
    const matchesName = nameFilter
      ? `${application.first_name} ${application.last_name}`.toLowerCase().includes(nameFilter.toLowerCase())
      : true;

    const matchesEmail = emailFilter
      ? application.email.toLowerCase().includes(emailFilter.toLowerCase())
      : true;

    const matchesStatus = statusFilter
      ? application.status.toLowerCase() === statusFilter.toLowerCase()
      : true;

    return matchesName && matchesEmail && matchesStatus;
  });

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
                Phone
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Status
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Date
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredApplications.map((application) => (
              <tr key={application.id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">
                    {application.first_name} {application.last_name}
                  </h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{application.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{application.phone || 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    application.status === 'approved' ? 'bg-success text-success' :
                    application.status === 'rejected' ? 'bg-danger text-danger' :
                    'bg-warning text-warning'
                  }`}>
                    {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {new Date(application.created_at).toLocaleDateString()}
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

export default ApplicationsTable;
