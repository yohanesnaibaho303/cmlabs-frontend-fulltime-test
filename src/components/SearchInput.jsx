/* eslint-disable react/prop-types */
import { Icon } from "@iconify/react";

const SearchInput = ({ value, onChange, onClear }) => {
  return (
    <div className="d-flex flex-row align-items-center justify-content-center">
      <Icon icon="material-symbols:search-rounded" width="35" />
      <input
        type="text"
        className="ms-3"
        placeholder="Search "
        width={100}
        value={value}
        onChange={onChange}
      />
      <Icon
        icon="ph:x-bold"
        width="20"
        className="delete-search"
        onClick={onClear}
      />
    </div>
  );
};

export default SearchInput;
