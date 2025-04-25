import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getAllMaintenanceRequests } from '../../api/incidents';
import { getCampusApartments, getDormitoryRooms, getTownhouses, getOffCampusProperties } from '../../api/housing';

interface Incident {
  id: string;
  name: string;
  text: string;
  time: number;
  status: string;
}

const RecentIncidentsCard = () => {
  const [recentIncidents, setRecentIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIncidents = async () => {
      try {
        // Fetch maintenance requests
        const maintenanceResponse = await getAllMaintenanceRequests();
        const maintenanceRequests = maintenanceResponse.data;

        // Fetch all property types
        const [campusApts, dormRooms, townhouses, offCampus] = await Promise.all([
          getCampusApartments(),
          getDormitoryRooms(),
          getTownhouses(),
          getOffCampusProperties()
        ]);

        // Combine all properties
        const allProperties = [
          ...campusApts.data,
          ...dormRooms.data,
          ...townhouses.data,
          ...offCampus.data
        ];

        // Process and sort incidents
        const processedIncidents = maintenanceRequests
          .sort((a: any, b: any) => new Date(b.requestDate).getTime() - new Date(a.requestDate).getTime())
          .slice(0, 4)
          .map((request: any) => {
            const property = allProperties.find(prop => prop.id === request.propertyId);
            
            return {
              id: request.id,
              name: request.description,
              text: property ? `${property.name || 'Unknown Property'}` : 'Unknown Property',
              time: Math.floor((new Date().getTime() - new Date(request.requestDate).getTime()) / (1000 * 60)), // Convert to minutes
              status: request.status
            };
          });

        setRecentIncidents(processedIncidents);
      } catch (error) {
        console.error('Error fetching incidents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchIncidents();
  }, []);

  if (loading) {
    return (
      <div className="w-auto col-span-12 rounded-sm border border-stroke bg-white py-6 shadow-default dark:border-strokedark dark:bg-boxdark xl:col-span-4">
        <div className="px-7.5">Loading...</div>
      </div>
    );
  }

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
                  item.status === 'COMPLETED'
                    ? 'bg-success text-success'
                    : item.status === 'REJECTED'
                    ? 'bg-danger text-danger'
                    : 'bg-warning text-warning'
                }`}
              >
                {item.status.toLowerCase()}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecentIncidentsCard;
