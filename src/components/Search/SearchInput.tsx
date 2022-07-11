import React, { useState } from 'react';
interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onSubmitSearch: (search: string) => void;
}

const SearchInput: React.FunctionComponent<SearchInputProps> = ({
  onSubmitSearch,
  ...rest
}) => {
  const [search, setSearch] = useState('');
  return (
    <div>
      <label htmlFor="search" className="label has-text-weight-semibold">
        تصفية حسب البحث
      </label>
      <div className="field has-addons" style={{ flexDirection: 'row' }}>
        <div className="control">
          <input
            id="search"
            className="input"
            type="text"
            value={search}
            // placeholder="Find a repository"
            onChange={(e) => {
              setSearch(e.target.value);
              if (e.target.value === '') {
                onSubmitSearch('');
              }
            }}
            onKeyUp={(e) => {
              if (e.key !== 'Enter') return;
              if (search.trim() === '') return;
              onSubmitSearch(search);
            }}
            style={{ height: 33.0 }}
          />
        </div>
        <div className="control">
          <button
            style={{ height: 33.0 }}
            className="button is-info"
            onClick={(e) => onSubmitSearch(search)}
            disabled={search.trim() === ''}
          >
            بحث
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
