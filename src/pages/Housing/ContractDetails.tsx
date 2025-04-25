import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getContractById } from '../../api/contracts';
import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';

interface Contract {
  id: string;
  resident_id: string;
  resident_name: string;
  room_id: string;
  room_number: string;
  building_id: string;
  building_name: string;
  contract_type: string;
  start_date: string;
  end_date: string;
  rent_amount: number;
  status: 'active' | 'expired' | 'terminated';
  created_at: string;
  description?: string;
  terms?: string[];
}

const ContractDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [contract, setContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContract = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const response = await getContractById(id);
        setContract(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch contract details');
        console.error('Error fetching contract:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContract();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !contract) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-500">{error || 'Contract not found'}</div>
      </div>
    );
  }

  return (
    <>
      <Breadcrumb pageName={`Contract ${contract.id}`} />

      <div className="grid grid-cols-1 gap-9">
        <div className="flex flex-col gap-9">
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">
                Contract Details
              </h3>
            </div>
            <div className="p-6.5">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Resident
                  </label>
                  <p className="text-black dark:text-white">{contract.resident_name}</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Room
                  </label>
                  <p className="text-black dark:text-white">{contract.room_number}</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Building
                  </label>
                  <p className="text-black dark:text-white">{contract.building_name}</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Contract Type
                  </label>
                  <p className="text-black dark:text-white">{contract.contract_type}</p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Start Date
                  </label>
                  <p className="text-black dark:text-white">
                    {new Date(contract.start_date).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    End Date
                  </label>
                  <p className="text-black dark:text-white">
                    {new Date(contract.end_date).toLocaleDateString()}
                  </p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Rent Amount
                  </label>
                  <p className="text-black dark:text-white">
                    ${contract.rent_amount.toLocaleString()}
                  </p>
                </div>

                <div>
                  <label className="mb-3 block text-black dark:text-white">
                    Status
                  </label>
                  <p className={`inline-flex rounded-full bg-opacity-10 py-1 px-3 text-sm font-medium ${
                    contract.status === 'active' ? 'bg-success text-success' :
                    contract.status === 'expired' ? 'bg-warning text-warning' :
                    'bg-danger text-danger'
                  }`}>
                    {contract.status.charAt(0).toUpperCase() + contract.status.slice(1)}
                  </p>
                </div>

                {contract.description && (
                  <div className="md:col-span-2">
                    <label className="mb-3 block text-black dark:text-white">
                      Description
                    </label>
                    <p className="text-black dark:text-white">{contract.description}</p>
                  </div>
                )}

                {contract.terms && contract.terms.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="mb-3 block text-black dark:text-white">
                      Terms
                    </label>
                    <ul className="list-disc pl-5">
                      {contract.terms.map((term, index) => (
                        <li key={index} className="text-black dark:text-white">
                          {term}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="mt-6 flex justify-end gap-4">
                <button
                  onClick={() => navigate('/housing/contracts')}
                  className="flex justify-center rounded border border-stroke py-2 px-6 font-medium text-black hover:shadow-1 dark:border-strokedark dark:text-white"
                >
                  Back to Contracts
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContractDetails;