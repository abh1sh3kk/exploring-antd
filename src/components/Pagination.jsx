/* eslint-disable react/prop-types */
export default function Pagination({
  paginationState,
  lowerLimit,
  upperLimit,
  setPaginationState
}) {
  const handlePagination = (action) => {
    let newPaginationNumber;

    if (
      action === "previous" &&
      paginationState.paginationNumber > lowerLimit
    ) {
      newPaginationNumber = paginationState.paginationNumber - 1;
    } else if (
      action === "next" &&
      paginationState.paginationNumber < upperLimit
    ) {
      newPaginationNumber = paginationState.paginationNumber + 1;
    } else if (action === "reset") {
      newPaginationNumber = 1;
    } else return;

    const newPaginationState = {
      ...paginationState,
      paginationNumber: newPaginationNumber
    };

    setPaginationState(newPaginationState);
  };

  return (
    <div className="btn-container">
      <button
        className="btn btn-previous"
        onClick={(e) => {
          handlePagination("previous");
        }}
      >
        Previous
      </button>
      <button
        className="btn btn-next"
        onClick={(e) => {
          handlePagination("next");
        }}
      >
        Next
      </button>
    </div>
  );
}
