export default function Sort({ sortOptions, setSortOptions }) {
  return (
    <div className="sort-by-field">
      <label htmlFor="sort-data">Sort by:</label>
      <select
        id="sort-data"
        name="sortData"
        onChange={(e) => {
          setSortOptions((prevSortOptions) => ({
            ...prevSortOptions,
            sortBy: e.target.value
          }));
        }}
        value={sortOptions.sortBy}
      >
        <option value="name">Name</option>
        <option value="address">Address</option>
        <option value="age">Age</option>
        <option value="email">Email</option>
        <option value="job">Job</option>
      </select>
      <select
        id="sort-order"
        name="sort"
        onChange={(e) => {
          setSortOptions((prevSortOptions) => ({
            ...prevSortOptions,
            sortOrder: e.target.value
          }));
        }}
        value={sortOptions.sortOrder}
      >
        <option value="ascending">Ascending</option>
        <option value="descending">Descending</option>
      </select>
    </div>
  );
}
