import { useCallback, useEffect, useMemo, useState } from "react";
import theData from "../data.json";
import Pagination from "./Pagination";
import Filter from "./Filter";
import InfoPanel from "./InfoPanel";
import ListBox from "./ListBox";

export default function List() {
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

  const refinedData = useMemo(() => {
    const filteredData = filterDataByGender(theData, filterOptions.gender);
    const sortedData = sortByType(
      filteredData,
      sortOptions.sortBy,
      sortOptions.sortOrder
    );
    return sortedData;
  }, [filterOptions, sortOptions]);

  console.log("render check");

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
        console.log("here");
        newNoOfItems = action;
      } else return;

      const newPaginationState = {
        ...paginationState,
        noOfItems: newNoOfItems,
        paginationNumber: newPaginationNumber,
      };

      setPaginationState(newPaginationState);
      // quick fix
      let newStartIndex = (newPaginationNumber - 1) * paginationState.noOfItems;
      setSelectedPersonId(refinedData[newStartIndex]?.id);
    },
    [paginationState.noOfItems, paginationState.paginationNumber]
  );

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

  const [selectedPersonId, setSelectedPersonId] = useState(
    refinedData[startIndex]?.id
  );

  useEffect(() => {
    if (
      !refinedData
        .slice(startIndex, endIndex + 1)
        .some((obj) => obj?.id === selectedPersonId)
    ) {
      setSelectedPersonId(refinedData[startIndex].id);
    }
  }, [paginationState, filterOptions, sortOptions]);

  const dataToDisplay = useMemo(() => {
    return refinedData.slice(startIndex, endIndex + 1);
  }, [refinedData, startIndex, endIndex, selectedPersonId]);

  const lowestPaginationLimit = 1;
  const highestPaginationLimit = useMemo(() => {
    return Math.ceil(refinedData.length / paginationState?.noOfItems);
  }, [paginationState?.noOfItems, refinedData.length]);

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
        setSelectedPersonId={setSelectedPersonId}
      />
    </section>
  );
}

const getStartIndex = (paginationNumber, noOfItems) => {
  return (paginationNumber - 1) * noOfItems;
};

const getEndIndex = (paginationNumber, noOfItems) => {
  return paginationNumber * noOfItems - 1;
};

const filterDataByGender = (receivedData, gender) => {
  if (gender === "all") return receivedData;

  return receivedData.filter((person) => {
    return person.gender.toLowerCase() === gender.toLowerCase();
  });
};

const sortByType = (receivedData, typeToSortBy, order) => {
  let newData = [...receivedData];

  newData.sort((a, b) => {
    const orderSetter =
      order === "ascending" ? 1 : order === "descending" ? -1 : 0;

    if (typeof a[typeToSortBy] === "number")
      return (a[typeToSortBy] - b[typeToSortBy]) * orderSetter;

    let itemA, itemB;

    if (typeToSortBy === "name") {
      itemA = `${a["first_name"]} ${a["last_name"]}`.toLowerCase();
      itemB = `${b["first_name"]} ${b["last_name"]}`.toLowerCase();
    } else {
      itemA = a[typeToSortBy].toLowerCase();
      itemB = b[typeToSortBy].toLowerCase();
    }

    if (itemA < itemB) {
      return -1 * orderSetter;
    } else if (itemA > itemB) {
      return +1 * orderSetter;
    } else return 0;
  });

  return newData;
};
