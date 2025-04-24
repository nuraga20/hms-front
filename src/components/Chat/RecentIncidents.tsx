import { Link } from 'react-router-dom';
import { maintenanceRequestsData, buildingsData, roomsData } from '../../data/sampleData';

const RecentIncidentsCard = () => {
  // Get the 4 most recent maintenance requests
  const recentIncidents = maintenanceRequestsData
    .sort((a, b) => b.request_date.getTime() - a.request_date.getTime())
    .slice(0, 4)
    .map(request => {
      const room = roomsData.find(room => room.building_id === request.room_id);
      const building = buildingsData.find(building => building.id === room?.building_id);
      
      return {
        id: request.request_id,
        name: request.description,
        text: `${building?.name || 'Unknown Building'}, ${room?.room_number || 'Unknown Room'}`,
        time: Math.floor((new Date().getTime() - request.request_date.getTime()) / (1000 * 60)), // Convert to minutes
        status: request.status
      };
    });

  return (
    <div className="w-auto col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
      <h4 className="mb-6 px-7.5 text-xl font-semibold text-black dark:text-white">
        Recent Incidents
      </h4>

      <div>
        {recentIncidents.map((item, key) => (
          <Link
            to={`/maintenance/${item.id}`}
            className="flex items-center gap-5 py-3 px-7.5 hover:bg-gray-3 dark:hover:bg-meta-4"
            key={key}
          >
            <div className="flex flex-1 items-center justify-between">
              <div>
                <h5 className="font-medium text-black dark:text-white">
                  {item.name}
                </h5>
                <p>
                  <span className="text-sm text-black dark:text-white">
                    {item.text}
                  </span>
                  <span className="text-xs"> . {item.time} min ago</span>
                </p>
              </div>

              <p
                className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                  item.status === 'completed'
                    ? 'bg-success text-success'
                    : item.status === 'rejected'
                    ? 'bg-danger text-danger'
                    : 'bg-warning text-warning'
                }`}
              >
                {item.status}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentIncidentsCard;
