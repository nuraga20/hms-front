import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import { getApplicationFormById, updateApplicationForm } from '../../api/applications';

interface Application {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  status: 'pending' | 'approved' | 'rejected';
  created_at: string;
  housing_type: string;
  additional_info: string;
}

const ApplicationDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [application, setApplication] = useState<Application | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<Application['status']>('pending');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [newStatus, setNewStatus] = useState<Application['status']>('pending');
  const [reviewNotes, setReviewNotes] = useState<string>('');

  useEffect(() => {
    const fetchApplication = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const response = await getApplicationFormById(id);
        setApplication(response.data);
        setStatus(response.data.status);
        setError(null);
      } catch (err) {
        setError('Failed to fetch application details');
        console.error('Error fetching application:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchApplication();
  }, [id]);

  const handleStatusUpdate = async () => {
    if (!id || !application) return;

    try {
      await updateApplicationForm(id, { ...application, status });
      setApplication({ ...application, status });
    } catch (err) {
      setError('Failed to update application status');
      console.error('Error updating application:', err);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Application not found</div>
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
                onClick={() => {
                  // Implement delete functionality
                }}
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
                  onChange={(e) => setNewStatus(e.target.value as Application['status'])}
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
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
                onClick={() => {
                  // Implement status update functionality
                }}
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
                  {application.id}
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
                  {new Date(application.created_at).toLocaleDateString()}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Review Notes
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {application.additional_info || 'No review notes available'}
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
                  {application.user_id}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Full Name
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {application.first_name} {application.last_name}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Email
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {application.email}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Phone
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {application.phone || 'N/A'}
                </p>
              </div>
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Housing Type
                </label>
                <p className="text-sm font-medium text-black dark:text-white">
                  {application.housing_type}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Family Members or Roommate Preferences Card */}
        {/* This section needs to be updated to use real data */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Family Members
            </h3>
          </div>
          <div className="p-6.5">
            {/* This section needs to be updated to use real data */}
            <p className="text-sm font-medium text-black dark:text-white">
              No family members specified
            </p>
          </div>
        </div>

        {/* Documents Card */}
        <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
          <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
            <h3 className="font-medium text-black dark:text-white">
              Application Documents
            </h3>
          </div>
          <div className="p-6.5">
            {/* This section needs to be updated to use real data */}
            <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2">
              <div>
                <label className="mb-3 block text-sm font-medium text-black dark:text-white">
                  Self Address Document
                </label>
                <button
                  onClick={() => {
                    // Implement download functionality
                  }}
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
                  onClick={() => {
                    // Implement download functionality
                  }}
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
                  onClick={() => {
                    // Implement download functionality
                  }}
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
                  onClick={() => {
                    // Implement download functionality
                  }}
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
                  onClick={() => {
                    // Implement download functionality
                  }}
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