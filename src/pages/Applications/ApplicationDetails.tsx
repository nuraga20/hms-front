import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { applicationsData, usersData, contractData, residentsData, roomsData, buildingsData, studentsData } from '../../data/sampleData';
import { ApplicationStatus } from '../../types/hms';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const applicationId = Number(id);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<string>('');
  const [reviewNotes, setReviewNotes] = useState<string>('');

  // Find the application by ID
  const application = applicationsData.find(
    (app) => app.application_id === applicationId
  );

  // Find the user associated with the application using nu_id
  const user = application ? usersData.find((user) => user.nu_id === application.nu_id) : null;
  
  // Check if the applicant is a faculty member
  const isFaculty = user?.role === 'faculty';

  // Check if the user already has a contract
  const existingContract = contractData.find(
    (contract) => contract.resident_id === user?.nu_id
  );

  // Find available rooms based on housing type
  const availableRooms = roomsData.filter(room => {
    const building = buildingsData.find(b => b.id === room.building_id);
    
    // Check if the building type matches the application housing type
    const typeMatch = building?.type === application?.housing_type;
    
    // Check if the room has capacity
    const hasCapacity = !room.resident_ids || room.resident_ids.length < room.capacity;
    
    // Check if the applicant is allowed in this building based on their program/role
    let isAllowed = false;
    if (isFaculty) {
      isAllowed = building?.allowed_residents.includes('Faculty') || false;
    } else {
      // For students, check if their program is allowed in this building
      const student = studentsData.find(s => s.user_id === user?.user_id);
      if (student) {
        isAllowed = building?.allowed_residents.includes(student.program) || false;
      }
    }
    
    return typeMatch && hasCapacity && isAllowed;
  });

  // Find rooms with compatible gender for students
  const compatibleRooms = isFaculty ? availableRooms : availableRooms.filter(room => {
    // If the room is empty, it's compatible with any gender
    if (!room.resident_ids || room.resident_ids.length === 0) {
      return true;
    }
    
    // Check if all existing residents in the room have the same gender as the applicant
    const existingResidents = room.resident_ids.map(id => 
      usersData.find(u => u.nu_id === id)
    ).filter(Boolean);
    
    // All residents should have the same gender as the applicant
    return existingResidents.every(resident => resident?.gender === user?.gender);
  });

  const handleDelete = () => {
    // Find the index of the application to delete
    const index = applicationsData.findIndex(
      (app) => app.application_id === applicationId
    );
    
    if (index !== -1) {
      // Remove the application from the array
      applicationsData.splice(index, 1);
      // Navigate back to the applications list
      navigate('/applications/applications');
    }
  };

  const handleStatusChange = () => {
    if (!application || !newStatus) return;
    
    // Update the application status
    application.status = newStatus as any;
    
    // Add review notes if provided
    if (reviewNotes) {
      application.review_notes = reviewNotes;
    }
    
    // Close the modal
    setShowStatusModal(false);
    
    // Reset the form
    setNewStatus('');
    setReviewNotes('');
  };

  const handleGenerateContract = () => {
    if (!application || !user || !compatibleRooms.length) {
      alert('No compatible rooms available for this application. Please check building restrictions and gender compatibility.');
      return;
    }

    // Find the first available compatible room
    const selectedRoom = compatibleRooms[0];

    // Create a new resident
    const newResident = {
      resident_id: user.nu_id,
      user_id: user.user_id,
      application_id: application.application_id,
      check_in_date: new Date(),
      check_out_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      room_id: selectedRoom.room_id,
    };

    // Add the resident to the residentsData array
    residentsData.push(newResident);

    // Update the room's resident_ids
    if (!selectedRoom.resident_ids) {
      selectedRoom.resident_ids = [];
    }
    selectedRoom.resident_ids.push(user.nu_id);

    // Create a new contract
    const newContract = {
      contract_id: contractData.length + 1,
      resident_id: user.nu_id,
      room_id: selectedRoom.room_id,
      building_id: selectedRoom.building_id as 1, // Use the actual building_id from the selected room
      contract_type: isFaculty ? 'Faculty Lease' : 'Student Lease',
      start_date: new Date(),
      end_date: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
      rent_amount: isFaculty ? 1000 : 500,
      contract_status: 'Active',
    };

    // Add the contract to the contractData array
    contractData.push(newContract);

    // Navigate to the contract details page
    navigate(`/housing/contracts/${newContract.contract_id}`);
  };

  const handleDownloadPDF = (pdfName: string) => {
    // Create a link element
    const link = document.createElement('a');
    // Set the href to the PDF file path
    link.href = `/src/data/${pdfName}`;
    // Set the download attribute with the PDF name
    link.download = pdfName;
    // Append the link to the body
    document.body.appendChild(link);
    // Trigger the download
    link.click();
    // Remove the link from the body
    document.body.removeChild(link);
  };

  if (!application) {
    return (
      <div className="p-6 bg-white dark:bg-boxdark rounded shadow-md">
        <h1 className="text-2xl font-bold text-black dark:text-white">Application not found</h1>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName="Application Details" />
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-142.5 rounded-lg bg-white p-8 dark:bg-boxdark">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4">
              Delete Application
            </h3>
            <p className="text-black dark:text-white mb-6">
              Are you sure you want to delete this application? This action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 rounded border border-stroke bg-white text-black hover:bg-gray-100 dark:border-strokedark dark:bg-boxdark dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 rounded bg-danger text-white hover:bg-opacity-90"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Status Change Modal */}
      {showStatusModal && (
        <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-142.5 rounded-lg bg-white p-8 dark:bg-boxdark">
            <h3 className="text-xl font-bold text-black dark:text-white mb-4">
              Change Application Status
            </h3>
            <div className="mb-4">
              <label className="mb-2.5 block text-black dark:text-white">
                New Status
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  value={newStatus}
                  onChange={(e) => setNewStatus(e.target.value)}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="" className="text-body dark:text-bodydark">
                    Select Status
                  </option>
                  {ApplicationStatus.map((status) => (
                    <option key={status} value={status} className="text-body dark:text-bodydark">
                      {status.charAt(0).toUpperCase() + status.slice(1)}
                    </option>
                  ))}
                </select>
                <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <g opacity="0.8">
                      <path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M5.29289 8.29289C5.68342 7.90237 6.31658 7.90237 6.70711 8.29289L12 13.5858L17.2929 8.29289C17.6834 7.90237 18.3166 7.90237 18.7071 8.29289C19.0976 8.68342 19.0976 9.31658 18.7071 9.70711L12.7071 15.7071C12.3166 16.0976 11.6834 16.0976 11.2929 15.7071L5.29289 9.70711C4.90237 9.31658 4.90237 8.68342 5.29289 8.29289Z"
                        fill="#637381"
                      ></path>
                    </g>
                  </svg>
                </span>
              </div>
            </div>
            <div className="mb-6">
              <label className="mb-2.5 block text-black dark:text-white">
                Review Notes
              </label>
              <textarea
                rows={4}
                value={reviewNotes}
                onChange={(e) => setReviewNotes(e.target.value)}
                placeholder="Enter any notes about this status change..."
                className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
              ></textarea>
            </div>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowStatusModal(false)}
                className="px-4 py-2 rounded border border-stroke bg-white text-black hover:bg-gray-100 dark:border-strokedark dark:bg-boxdark dark:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                disabled={!newStatus}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-9">
        {/* Application Info Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark flex justify-between items-center">
            <h3 className="font-medium text-black dark:text-white">
              Application Information
            </h3>
            <div className="flex gap-2">
              {application.status === 'approved' && !existingContract && (
                <button
                  onClick={handleGenerateContract}
                  className="px-4 py-2 rounded bg-success text-white hover:bg-opacity-90"
                >
                  Generate Contract
                </button>
              )}
              <button
                onClick={() => setShowStatusModal(true)}
                className="px-4 py-2 rounded bg-primary text-white hover:bg-opacity-90"
              >
                Change Status
              </button>
              <button
                onClick={() => setShowDeleteModal(true)}
                className="px-4 py-2 rounded bg-danger text-white hover:bg-opacity-90"
              >
                Delete Application
              </button>
            </div>
          </div>
          <div className="p-6.5">
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Application ID
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {application.application_id}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Status
                </label>
                <p
                  className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    application.status === 'approved'
                      ? 'bg-success text-success'
                      : application.status === 'rejected'
                      ? 'bg-danger text-danger'
                      : 'bg-warning text-warning'
                  }`}
                >
                  {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Application Date
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {new Date(application.application_date).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Review Notes
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {application.review_notes || 'No review notes available'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* User Info Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              User Information
            </h3>
          </div>
          <div className="p-6.5">
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  NU ID
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {user ? user.nu_id : 'Unknown'}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Full Name
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {user ? `${user.first_name} ${user.last_name}` : 'Unknown'}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {user ? user.email : 'Unknown'}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Phone
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {user ? user.phone : 'Unknown'}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Role
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {user ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Unknown'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Family Members or Roommate Preferences Card */}
        {isFaculty ? (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Family Members
              </h3>
            </div>
            <div className="p-6.5">
              {application.family_members && application.family_members.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full table-auto">
                    <thead>
                      <tr className="bg-gray-2 text-left dark:bg-meta-4">
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                          Name
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                          NU ID
                        </th>
                        <th className="py-4 px-4 font-medium text-black dark:text-white">
                          Relationship
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {application.family_members.map((member, index) => (
                        <tr key={index}>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{member.name}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{member.nuid}</p>
                          </td>
                          <td className="border-b border-[#eee] py-5 px-4 dark:border-strokedark">
                            <p className="text-black dark:text-white">{member.relationship}</p>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-sm font-medium text-black dark:text-white">
                  No family members specified
                </p>
              )}
            </div>
          </div>
        ) : (
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Roommate Preferences
              </h3>
            </div>
            <div className="p-6.5">
              {application.roommate_preferences?.length ? (
                <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
                  {application.roommate_preferences.map((pref, index) => {
                    const roommate = usersData.find(user => user.nu_id === pref);
                    return (
                      <div key={index}>
                        <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                          Preferred Roommate {index + 1}
                        </label>
                        <p className="text-sm font-medium text-black dark:text-white">
                          {roommate ? `${roommate.first_name} ${roommate.last_name} (${roommate.nu_id})` : `NU ID: ${pref}`}
                        </p>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm font-medium text-black dark:text-white">
                  No roommate preferences specified
                </p>
              )}
            </div>
          </div>
        )}

        {/* Documents Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Application Documents
            </h3>
          </div>
          <div className="p-6.5">
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Self Address Document
                </label>
                <button
                  onClick={() => handleDownloadPDF("Self Address Document.pdf")}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mother's Address Document
                </label>
                <button
                  onClick={() => handleDownloadPDF("Mother's Address Document.pdf")}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Father's Address Document
                </label>
                <button
                  onClick={() => handleDownloadPDF("Father's Address Document.pdf")}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Mother's Work Certificate
                </label>
                <button
                  onClick={() => handleDownloadPDF("Mother's Work Certificate.pdf")}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Father's Work Certificate
                </label>
                <button
                  onClick={() => handleDownloadPDF("Father's Work Certificate.pdf")}
                  className="flex items-center gap-2 text-primary hover:text-primary-dark"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Download PDF
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplicationDetails;