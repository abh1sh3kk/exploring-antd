export default function Pagination({
  handlePagination,
}) {
 

  return (
    <div className="btn-container">
      <button
        className="btn btn-previous"
        onClick={() => {
          handlePagination("previous");
        }}
      >
        Previous
      </button>
      <button
        className="btn btn-next"
        onClick={() => {
          handlePagination("next");
        }}
      >
        Next
      </button>
    </div>
  );
}
