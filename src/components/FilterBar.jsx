import React from 'react';
import Dropdown from './Dropdown';

const FilterBar = ({
  filters,
  activeFilter,
  handleFilterChange,
  isDropdownOpen,
  suggestedOption,
  setIsDropdownOpen,
  handleSuggestedChange,
  language = 'en',
}) => {
  return (
    <div className={`w-full max-w-full px-4 py-2 sm:px-6 md:px-8 ${language === 'ar' ? 'rtl' : 'ltr'}`}>
      <div className="flex flex-wrap gap-4 sm:gap-6 justify-center md:justify-between">
        {/* Filter Buttons Group */}
        <div className="flex flex-wrap gap-2 sm:gap-4">
          {filters.map((filter) => (
            <button
              key={filter.en}
              className={`px-2 sm:px-4 py-1 sm:py-2 rounded-full font-medium text-xs sm:text-sm transition-colors ${
                activeFilter === filter.en
                  ? 'bg-[#78B833] text-white cursor-pointer'
                  : 'bg-gray-200 text-gray-700 hover:bg-[#78B833] hover:text-white cursor-pointer'
              }`}
              onClick={() => handleFilterChange(filter.en)}
            >
              {filter[language]}
            </button>
          ))}
        </div>
        {/* Dropdown (Suggested Button) */}
        <div className="flex-shrink-0">
          <Dropdown
            isOpen={isDropdownOpen}
            selectedOption={suggestedOption}
            onOptionChange={(option, toggleOnly) => {
              if (toggleOnly) setIsDropdownOpen(!isDropdownOpen);
              else handleSuggestedChange(option);
            }}
            language={language}
          />
        </div>
      </div>
    </div>
  );
};

export default FilterBar;