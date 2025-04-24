import Breadcrumb from '../../components/Breadcrumbs/Breadcrumb';
import SelectBuildingType from '../../components/Forms/SelectGroup/SelectBuildingType';
import CheckboxAllowedResidents from '../../components/Checkboxes/CheckboxAllowedResidents';
import { Link } from 'react-router-dom';

const FormNewBuilding = () => {
  return (
    <>
      <Breadcrumb pageName="New Building Form" />
      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          {/* <!-- Input Fields --> */}
          <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
            <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
              <h3 className="font-medium text-black dark:text-white">Form</h3>
            </div>
            <div className="mb-3 flex flex-col gap-5.5 p-6.5">
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Building Name
                </label>
                <input
                  type="text"
                  placeholder="Block D1"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Building Address
                </label>
                <input
                  type="text"
                  placeholder="Astana, Qabanbay Batyr Ave, 53, Block D1"
                  className="w-full rounded-lg border-[1.5px] border-stroke bg-transparent py-3 px-5 text-black outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:text-white dark:focus:border-primary"
                />
              </div>
              <SelectBuildingType
                onChange={function (): void {
                  throw new Error('Function not implemented.');
                }}
              />
              <div>
                <label className="mb-3 block text-black dark:text-white">
                  Allowed Residents
                </label>
                <CheckboxAllowedResidents
                  onChange={function (): void {
                    throw new Error('Function not implemented.');
                  }}
                />
              </div>
              <div className="flex flex-row gap-3">
                <Link
                  to="#"
                  className="inline-flex items-center justify-center rounded-sm border border-primary bg-primary py-4 px-10 text-center font-medium text-white hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Submit
                </Link>
                <Link
                  to="../housing/buildings"
                  className="inline-flex items-center justify-center rounded-sm border border-primary py-4 px-10 text-center font-medium text-primary hover:bg-opacity-90 lg:px-8 xl:px-10"
                >
                  Cancel
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FormNewBuilding;
