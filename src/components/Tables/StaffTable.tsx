import { usersData } from '../../data/sampleData';

const StaffTable = () => {
  const maintenanceUsers = usersData.filter(
    (user) => user.role === 'maintenance',
  );

  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                NUID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Full Name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Email
              </th>
              <th className="min-w-[40px] py-4 px-4 font-medium text-black dark:text-white">
                Type
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Phone
              </th>
            </tr>
          </thead>
          <tbody>
            {maintenanceUsers.map((userItem, key) => (
              <tr key={key}>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{userItem.nu_id}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {userItem.first_name} {userItem.last_name}
                  </p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{userItem.email}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">{userItem.role}</p>
                </td>
                <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                  <p className="text-black dark:text-white">
                    {userItem.phone ? `+${userItem.phone}` : 'N/A'}
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

export default StaffTable;
