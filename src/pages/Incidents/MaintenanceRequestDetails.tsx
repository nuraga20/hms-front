import { useEffect, useRef, useState } from 'react';
import { useModal } from '../../hooks/useModal';
import { Modal } from '../UiElements/Modal';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { Link, useParams } from 'react-router-dom';
import {
  buildingsData,
  maintenanceRequestsData,
  roomsData,
} from '../../data/sampleData';
import CoverOne from '../../images/cover/bed.jpg';
import { usersData } from '../../data/sampleData';

const maintenancePersonnel = usersData
  .filter((user) => user.role === 'maintenance')
  .map((user) => `${user.first_name} ${user.last_name}`);

const MaintenanceRequestDetails = () => {
  const { id } = useParams();
  const requestId = Number(id);
  const maintenanceRequest = maintenanceRequestsData.find(
    (req) => req.request_id === requestId,
  );

  if (!maintenanceRequest) return <p>Request not found</p>;

  const room = roomsData.find(
    (room) => room.building_id === maintenanceRequest.room_id,
  );

  const building = buildingsData.find(
    (building) => building.id === room?.building_id,
  );

  const { isOpen, openModal, closeModal } = useModal();

  // State for Status dropdown
  const [status, setStatus] = useState(maintenanceRequest.status);
  const [statusDropdownOpen, setStatusDropdownOpen] = useState(false);
  const statusDropdownRef = useRef(null);

  // State for Assigned To dropdown
  const [assignedTo, setAssignedTo] = useState(
    maintenanceRequest.staff_id || 'Not Assigned',
  );
  const [assignedToDropdownOpen, setAssignedToDropdownOpen] = useState(false);
  const assignedToDropdownRef = useRef(null);

  // Function to handle clicks outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        statusDropdownRef.current &&
        !(statusDropdownRef.current as HTMLElement).contains(
          event.target as Node,
        )
      ) {
        setStatusDropdownOpen(false);
      }

      if (
        assignedToDropdownRef.current &&
        !(assignedToDropdownRef.current as HTMLElement).contains(
          event.target as Node,
        )
      ) {
        setAssignedToDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <Breadcrumb pageName="Maintenance Request Details" />
      <div className="grid grid-cols-1 sm:grid-cols-2">
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          {/* Clickable Image */}
          <img
            src={CoverOne}
            alt="Maintenance Cover"
            className="w-full h-48 object-cover rounded-t-sm cursor-pointer"
            onClick={openModal}
          />

          {/* Modal for Full-Size Image */}
          <Modal isOpen={isOpen} onClose={closeModal} className="max-w-4xl">
            <div className="relative w-full p-4 bg-white dark:bg-gray-900 rounded-2xl">
              <img
                src={CoverOne}
                alt="Full-Size Image"
                className="w-full h-auto rounded-sm"
              />
            </div>
          </Modal>

          {/* Card Content */}
          <div className="px-5 pt-6 pb-6 sm:px-7.5 xl:pb-6">
            <div className="grid grid-cols-2 gap-y-2">
              {[
                ['Request ID', maintenanceRequest.request_id],
                ['NU ID', maintenanceRequest.resident_id],
                ['Building', building?.name],
                ['Room', room?.room_number],
              ].map(([label, value]) => (
                <div key={label} className="contents">
                  <span className="text-gray-500">{label}</span>
                  <span className="grid text-gray-700 place-items-end">
                    {value}
                  </span>
                </div>
              ))}

              {/* Assigned To */}
              <span className="text-gray-500">Assigned To</span>
              <span
                ref={assignedToDropdownRef}
                className="relative grid place-items-end cursor-pointer"
                onClick={() =>
                  setAssignedToDropdownOpen(!assignedToDropdownOpen)
                }
              >
                <span className="text-gray-700">{assignedTo}</span>
                {assignedToDropdownOpen && (
                  <ul className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    {['Not Assigned', ...maintenancePersonnel].map((option) => (
                      <li
                        key={option}
                        className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer whitespace-nowrap"
                        onClick={() => {
                          setAssignedTo(option);
                          setAssignedToDropdownOpen(false);
                        }}
                      >
                        {option}
                      </li>
                    ))}
                  </ul>
                )}
              </span>

              {/* Status */}
              <span className="text-gray-500">Status</span>
              <span
                ref={statusDropdownRef}
                className="relative grid place-items-end cursor-pointer"
                onClick={() => setStatusDropdownOpen(!statusDropdownOpen)}
              >
                <span
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    status === 'completed'
                      ? 'bg-success text-success'
                      : status === 'rejected'
                      ? 'bg-danger text-danger'
                      : 'bg-warning text-warning'
                  }`}
                >
                  {status}
                </span>
                {statusDropdownOpen && (
                  <ul className="absolute right-0 top-full mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-10">
                    {['pending', 'in_progress', 'completed', 'rejected'].map(
                      (option) => (
                        <li
                          key={option}
                          className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setStatus(
                              option as
                                | 'pending'
                                | 'in_progress'
                                | 'completed'
                                | 'rejected',
                            );
                            setStatusDropdownOpen(false);
                          }}
                        >
                          {option}
                        </li>
                      ),
                    )}
                  </ul>
                )}
              </span>
            </div>

            {/* Buttons */}
            <div className="flex flex-row gap-3 pt-3 pb-3">
              <Link
                to="#"
                className="inline-flex items-center justify-center rounded-sm border border-primary bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Save
              </Link>
              <Link
                to="/incidents/maintenanceRequests"
                className="inline-flex items-center justify-center rounded-sm border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
              >
                Back
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MaintenanceRequestDetails;
