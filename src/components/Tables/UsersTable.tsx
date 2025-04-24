import React from 'react';
import { usersData } from '../../data/sampleData';

interface UsersTableProps {
  nuidFilter: string;
  nameFilter: string;
  emailFilter: string;
  phoneFilter: string;
  roleFilter: string;
}

const UsersTable: React.FC<UsersTableProps> = ({ 
  nuidFilter,
  nameFilter,
  emailFilter,
  phoneFilter,
  roleFilter
}) => {
  // Filter users based on all filters
  const filteredUsers = usersData.filter((user) => {
    const matchesNuid = nuidFilter
      ? user.nu_id.toString().includes(nuidFilter)
      : true;

    const matchesName = nameFilter
      ? `${user.first_name} ${user.last_name}`.toLowerCase().includes(nameFilter.toLowerCase())
      : true;

    const matchesEmail = emailFilter
      ? user.email.toLowerCase().includes(emailFilter.toLowerCase())
      : true;

    const matchesPhone = phoneFilter
      ? (user.phone?.toString() || '').toLowerCase().includes(phoneFilter.toLowerCase())
      : true;

    const matchesRole = roleFilter
      ? user.role.toLowerCase() === roleFilter.toLowerCase()
      : true;

    return matchesNuid && matchesName && matchesEmail && matchesPhone && matchesRole;
  });

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[15px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[40px] py-4 px-4 font-medium text-black dark:text-white">
                NUID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Phone
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Role
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user, index) => (
              <tr key={index} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                  <h5 className="font-medium text-black dark:text-white">{user.user_id}</h5>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.nu_id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {user.first_name} {user.last_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.phone || 'N/A'}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{user.role}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;