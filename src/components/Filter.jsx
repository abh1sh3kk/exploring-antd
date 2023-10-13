import Sort from "./Sort";

export default function Filter({
  filterOptions,
  setFilterOptions,
  sortOptions,
  setSortOptions,
  noOfItems,
  handleItemNumChange
}) {
  return (
    <div className="filter-btn-group">
      <div className="gender-filter-field">
        <label htmlFor="gender-select">Filter by gender:</label>
        <select
          id="gender-select"
          name="gender"
          onChange={(e) => {
            setFilterOptions((oldOptions) => ({
              ...oldOptions,
              gender: e.target.value
            }));
          }}
          value={filterOptions.gender}
        >
          {[
            { value: "male", label: "Male" },
            { value: "female", label: "Female" },
            { value: "polygender", label: "Polygender" },
            { value: "non-binary", label: "Non-Binary" },
            { value: "all", label: "All" }
          ].map((gender) => (
            <option value={gender.value} key={gender.value}>
              {gender.label}
            </option>
          ))}
        </select>
      </div>
      <div className="items-per-page-field">
        <label htmlFor="item-number">No. of items:</label>
        <select
          id="item-number"
          name="itemNumber"
          onChange={handleItemNumChange}
          value={noOfItems}
        >
          <option value="2">2</option>
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
      </div>
      <Sort sortOptions={sortOptions} setSortOptions={setSortOptions} />
    </div>
  );
}
