import { residentsData, usersData } from '../../data/sampleData';

const ResidentsTable = () => {
  return (
    <div className="rounded-sm border border-stroke bg-white px-5 pt-6 pb-2.5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:pb-1">
      <div className="max-w-full overflow-x-auto">
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-gray-2 text-left dark:bg-meta-4">
              <th className="min-w-[20px] py-4 px-4 font-medium text-black dark:text-white xl:pl-11">
                ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                NU-ID
              </th>
              <th className="min-w-[120px] py-4 px-4 font-medium text-black dark:text-white">
                Full name
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Room
              </th>
              <th className="py-4 px-4 font-medium text-black dark:text-white">
                Check-In
              </th>
              <th className="min-w-[40px] py-4 px-4 font-medium text-black dark:text-white">
                Check-Out
              </th>
            </tr>
          </thead>
          <tbody>
            {residentsData.map((residentItem, key) => {
              // Find the user corresponding to the resident
              const user = usersData.find(
                (user) => user.user_id === residentItem.user_id,
              );
              return (
                <tr key={key}>
                  <td className="border-b border-[#eee] py-5 px-4 pl-9 dark:border-strokedark xl:pl-11">
                    <h5 className="font-medium text-black dark:text-white">
                      {residentItem.user_id}
                    </h5>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user ? `${user.nu_id}` : 'Unknown'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {user
                        ? `${user.first_name} ${user.last_name}`
                        : 'Unknown'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {residentItem.room_id}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {residentItem.check_in_date
                        ? new Date(
                            residentItem.check_in_date,
                          ).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </td>
                  <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                    <p className="text-black dark:text-white">
                      {residentItem.check_out_date
                        ? new Date(
                            residentItem.check_out_date,
                          ).toLocaleDateString()
                        : 'N/A'}
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

export default ResidentsTable;
