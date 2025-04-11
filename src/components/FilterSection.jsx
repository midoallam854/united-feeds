import React from 'react';

const FilterSection = ({ title, filters, onChange, icon, options, language = 'en' }) => {
  return (
    <div>
      <div className={`flex items-center text-black mb-2 ${language === 'ar' ? 'flex-row-reverse' : ''}`}>
        <img
          src={icon}
          alt={`${title} Icon`}
          className={`w-5 h-5 ${language === 'ar' ? 'ml-2' : 'mr-2'}`}
        />
        {title}
      </div>
      <div className={`ml-7 ${language === 'ar' ? 'mr-7 ml-0' : ''}`}>
        {options.map((option) => {
          // Use the English key for filter state and onChange
          const filterKey = option.key;
          // Display the translated label
          const label = option[language];

          return (
            <label
              key={filterKey}
              className={`flex items-center space-x-2 mt-2 ${
                language === 'ar' ? 'space-x-reverse flex-row-reverse' : ''
              }`}
            >
              <input
                type="checkbox"
                checked={filters[filterKey] || false} // Use English key to check state
                onChange={() => onChange(filterKey)} // Use English key for onChange
                className="form-checkbox text-[#78B833]"
              />
              <span>{label}</span>
            </label>
          );
        })}
      </div>
    </div>
  );
};

export default FilterSection;