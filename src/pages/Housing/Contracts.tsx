import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import ContractsTable from '../../components/Tables/ContractsTable';
import React, { useState } from 'react';

const Contracts: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>(''); // State for search query

  return (
    <>
      <Breadcrumb pageName="All Contracts" />

      <div className="flex flex-col gap-10">
        {/* Search Section */}
        <div className="flex flex-row gap-5">
          {/* Search Input */}
          <div className="relative z-20 bg-white dark:bg-form-input">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search contracts..."
              className="w-full rounded border border-stroke bg-transparent py-3 px-4 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:text-white"
            />
          </div>
        </div>

        {/* Contracts Table */}
        <ContractsTable searchQuery={searchQuery} />
      </div>
    </>
  );
};

export default Contracts;