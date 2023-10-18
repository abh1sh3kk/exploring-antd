import { useCallback, useEffect, useMemo, useState } from "react";
import theData from "../data/data.json";
import Pagination from "./Pagination";
import Filter from "./Filter";
import InfoPanel from "./InfoPanel";
import ListBox from "./ListBox";
import {
  getStartIndex,
  getEndIndex,
  filterDataByGender,
  sortByType,
} from "../utils/utils";

export default function List() {
  console.log("render check");
  
  const [filterOptions, setFilterOptions] = useState({
    gender: "all",
  });

  const [sortOptions, setSortOptions] = useState({
    sortOrder: "descending",
    sortBy: "age",
  });
  
  const [paginationState, setPaginationState] = useState({
    noOfItems: 5,
    paginationNumber: 1,
  });
  
  const startIndex = useMemo(() => {
    return getStartIndex(
      paginationState.paginationNumber,
      paginationState.noOfItems
      );
    }, [paginationState]);

    const endIndex = useMemo(() => {
      return getEndIndex(
        paginationState.paginationNumber,
        paginationState.noOfItems
        );
      }, [paginationState]);

      const [selectedPersonId, setSelectedPersonId] = useState(() => {
        const sortedData = sortByType(
          filterDataByGender(theData, filterOptions.gender),
          sortOptions.sortBy,
          sortOptions.sortOrder
          );
          
    return sortedData[startIndex]?.id;
  });

  const handleItemSelection = (id) => {
    setSelectedPersonId(id);
  };
  
  const refinedData = useMemo(() => {
    const filteredData = filterDataByGender(theData, filterOptions.gender);
    const sortedData = sortByType(
      filteredData,
      sortOptions.sortBy,
      sortOptions.sortOrder
    );
    return sortedData;
  }, [filterOptions, sortOptions]);
  
  const dataToDisplay = useMemo(() => {
    return refinedData.slice(startIndex, endIndex + 1);
  }, [refinedData, startIndex, endIndex, selectedPersonId]);

  useEffect(() => {
    setSelectedPersonId(dataToDisplay[0]?.id);
  }, [filterOptions, sortOptions, paginationState ]);

  const lowestPaginationLimit = 1;
  const highestPaginationLimit = useMemo(() => {
    return Math.ceil(refinedData.length / paginationState?.noOfItems);
  }, [paginationState?.noOfItems, refinedData.length]);

  const handlePagination = useCallback(
    (action) => {
      let newPaginationNumber = paginationState.paginationNumber;
      let newNoOfItems = paginationState.noOfItems;

      if (
        action === "previous" &&
        paginationState.paginationNumber > lowestPaginationLimit
      ) {
        newPaginationNumber--;
      } else if (
        action === "next" &&
        paginationState.paginationNumber < highestPaginationLimit
      ) {
        newPaginationNumber++;
      } else if (action === "reset") {
        newPaginationNumber = 1;
      } else if (typeof action === "number") {
        newNoOfItems = action;
      } else return;

      const newPaginationState = {
        ...paginationState,
        noOfItems: newNoOfItems,
        paginationNumber: newPaginationNumber,
      };

      setPaginationState(newPaginationState);
    },
    [paginationState, highestPaginationLimit]
  );

  return (
    <section className="list-section">
      <Filter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
        noOfItems={paginationState.noOfItems}
        handlePagination={handlePagination}
      />

      <InfoPanel
        selectedItem={refinedData.find((obj) => obj?.id === selectedPersonId)}
      />

      <Pagination handlePagination={handlePagination} />

      <ListBox
        dataToDisplay={dataToDisplay}
        selectedPersonId={selectedPersonId}
        handleItemSelection={handleItemSelection}
      />
    </section>
  );
}
