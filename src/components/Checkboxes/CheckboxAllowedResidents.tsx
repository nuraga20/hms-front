import { useState } from 'react';

// Define props interface
interface CheckboxAllowedResidentsProps {
  onChange: (selectedResidents: string[]) => void;
}

const residentTypes = [
  'Foundation',
  'Undergraduate',
  'Graduate',
  'PhD',
  'Faculty',
];

const undergraduateSubOptions = [
  '1-year Undergraduate',
  '2-year Undergraduate',
  '3-year Undergraduate',
  '4-year Undergraduate',
  '5-year Undergraduate',
];

const CheckboxAllowedResidents: React.FC<CheckboxAllowedResidentsProps> = ({ onChange }) => {
  const [selectedResidents, setSelectedResidents] = useState<string[]>([]);
  const [showUndergradOptions, setShowUndergradOptions] = useState<boolean>(false);

  const handleCheckboxChange = (resident: string) => {
    let updatedResidents;
    
    if (resident === 'Undergraduate') {
      setShowUndergradOptions(!showUndergradOptions);
      updatedResidents = selectedResidents.includes(resident)
        ? selectedResidents.filter((r) => ![resident, ...undergraduateSubOptions].includes(r))
        : [...selectedResidents, resident];
    } else {
      updatedResidents = selectedResidents.includes(resident)
        ? selectedResidents.filter((r) => r !== resident)
        : [...selectedResidents, resident];
    }

    setSelectedResidents(updatedResidents);
    onChange(updatedResidents); // Pass updated residents to parent
  };

  const handleSubOptionChange = (subOption: string) => {
    let updatedResidents = selectedResidents.includes(subOption)
      ? selectedResidents.filter((r) => r !== subOption)
      : [...selectedResidents, subOption];

    setSelectedResidents(updatedResidents);
    onChange(updatedResidents); // Update parent component
  };

  return (
    <div className="flex flex-col gap-3">
      {residentTypes.map((resident) => (
        <div key={resident} className="flex flex-col gap-3">
          <label className="flex cursor-pointer select-none items-center">
            
              <input
                type="checkbox"
                id={resident}
                className="sr-only"
                checked={selectedResidents.includes(resident)}
                onChange={() => handleCheckboxChange(resident)}
              />
              <div
                className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                  selectedResidents.includes(resident) ? 'border-primary bg-gray dark:bg-transparent' : ''
                }`}
              >
                <span className={`opacity-0 ${selectedResidents.includes(resident) ? '!opacity-100' : ''}`}>
                  <svg
                    width="11"
                    height="8"
                    viewBox="0 0 11 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972Z"
                      fill="#ddaf53"
                    ></path>
                  </svg>
                </span>
              </div>
            {resident}
          </label>

          {/* Sub-options for Undergraduate */}
          {resident === 'Undergraduate' && showUndergradOptions && (
            <div className="ml-6 flex flex-col gap-3">
              {undergraduateSubOptions.map((subOption) => (
                <label key={subOption} className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="checkbox"
                      id={subOption}
                      className="sr-only"
                      checked={selectedResidents.includes(subOption)}
                      onChange={() => handleSubOptionChange(subOption)}
                    />
                    <div
                      className={`mr-4 flex h-5 w-5 items-center justify-center rounded border ${
                        selectedResidents.includes(subOption) ? 'border-primary bg-gray dark:bg-transparent' : ''
                      }`}
                    >
                      <span className={`opacity-0 ${selectedResidents.includes(subOption) ? '!opacity-100' : ''}`}>
                        <svg
                          width="11"
                          height="8"
                          viewBox="0 0 11 8"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M10.0915 0.951972L10.0867 0.946075L10.0813 0.940568C9.90076 0.753564 9.61034 0.753146 9.42927 0.939309L4.16201 6.22962L1.58507 3.63469C1.40401 3.44841 1.11351 3.44879 0.932892 3.63584C0.755703 3.81933 0.755703 4.10875 0.932892 4.29224L0.932878 4.29225L0.934851 4.29424L3.58046 6.95832C3.73676 7.11955 3.94983 7.2 4.1473 7.2C4.36196 7.2 4.55963 7.11773 4.71406 6.9584L10.0468 1.60234C10.2436 1.4199 10.2421 1.1339 10.0915 0.951972Z"
                            fill="#ddaf53"
                          ></path>
                        </svg>
                      </span>
                    </div>
                  </div>
                  {subOption}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckboxAllowedResidents;


