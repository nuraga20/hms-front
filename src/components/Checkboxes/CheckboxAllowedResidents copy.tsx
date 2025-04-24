import { useState } from 'react';

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

const CheckboxAllowedResidents = () => {
  const [selectedResidents, setSelectedResidents] = useState<string[]>([]);
  const [showUndergradOptions, setShowUndergradOptions] = useState<boolean>(false);

  const handleCheckboxChange = (resident: string) => {
    if (resident === 'Undergraduate') {
      setShowUndergradOptions(!showUndergradOptions);
      setSelectedResidents((prev) =>
        prev.includes(resident)
          ? prev.filter((r) => ![resident, ...undergraduateSubOptions].includes(r))
          : [...prev, resident]
      );
    } else {
      setSelectedResidents((prev) =>
        prev.includes(resident) ? prev.filter((r) => r !== resident) : [...prev, resident]
      );
    }
  };

  const handleSubOptionChange = (subOption: string) => {
    setSelectedResidents((prev) =>
      prev.includes(subOption)
        ? prev.filter((r) => r !== subOption)
        : [...prev, subOption]
    );
  };

  return (
    <div className="flex flex-col gap-3"> {/* Consistent gap for main items */}
      {residentTypes.map((resident) => (
        <div key={resident} className="flex flex-col gap-2"> {/* Consistent gap for sub-options */}
          <label className="flex cursor-pointer select-none items-center gap-2">
            <input
              type="checkbox"
              id={resident}
              className="h-5 w-5 rounded border border-gray-400 checked:border-primary checked:bg-gray dark:bg-transparent"
              checked={selectedResidents.includes(resident)}
              onChange={() => handleCheckboxChange(resident)}
            />
            {resident}
          </label>

          {/* Sub-options for Undergraduate */}
          {resident === 'Undergraduate' && showUndergradOptions && (
            <div className="ml-6 flex flex-col gap-2"> {/* Adjusted margin for alignment */}
              {undergraduateSubOptions.map((subOption) => (
                <label key={subOption} className="flex cursor-pointer select-none items-center gap-2">
                  <input
                    type="checkbox"
                    id={subOption}
                    className="h-5 w-5 rounded border border-gray-400 checked:border-primary checked:bg-gray dark:bg-transparent"
                    checked={selectedResidents.includes(subOption)}
                    onChange={() => handleSubOptionChange(subOption)}
                  />
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
