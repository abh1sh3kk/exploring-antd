import { useCallback, useEffect, useMemo, useState } from "react";
import theData from "../data.json";
import ListItem from "./ListItem";
import Pagination from "./Pagination";
import Filter from "./Filter";
import InfoPanel from "./InfoPanel";

export default function List() {
  const [filterOptions, setFilterOptions] = useState({
    gender: "all",
  });

  const [sortOptions, setSortOptions] = useState({
    sortOrder: "descending",
    sortBy: "age",
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

  const [paginationState, setPaginationState] = useState({
    noOfItems: 5,
    paginationNumber: 1,
  });

  console.log("render check");

  const handlePagination = useCallback(
    (action) => {
      let newPaginationNumber;

      if (
        action === "previous" &&
        paginationState.paginationNumber > lowestPaginationLimit
      ) {
        newPaginationNumber = paginationState.paginationNumber - 1;
      } else if (
        action === "next" &&
        paginationState.paginationNumber < highestPaginationLimit
      ) {
        newPaginationNumber = paginationState.paginationNumber + 1;
      } else if (action === "reset") {
        newPaginationNumber = 1;
      } else return;

      let newStartIndex = (newPaginationNumber - 1) * paginationState.noOfItems;

      const newPaginationState = {
        ...paginationState,
        paginationNumber: newPaginationNumber,
      };

      setPaginationState(newPaginationState);
      // quick fix
      setSelectedPersonId(refinedData[newStartIndex]?.id);
    },
    [paginationState]
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

  const handleItemNumChange = useCallback(
    (e) => {
      setPaginationState((prevState) => {
        return {
          ...prevState,
          paginationNumber: 1,
          noOfItems: e.target.value,
        };
      });
    },
    [paginationState, refinedData]
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

  const selectNewPerson = (id) => {
    if (id === selectedPersonId) setSelectedPersonId(null); // deselect
    else {
      let selectedObjectId = refinedData.find((obj) => obj?.id === id)?.id;
      setSelectedPersonId(selectedObjectId);
    }
  };

  const nameList = useMemo(() => {
    return refinedData
      .slice(startIndex, endIndex + 1)
      .map((obj) => (
        <ListItem
          key={obj?.id}
          selected={selectedPersonId === obj?.id}
          personInfo={obj}
          selectNewPerson={selectNewPerson}
        />
      ));
  }, [refinedData, startIndex, endIndex, selectedPersonId]);

  const lowestPaginationLimit = 1;
  const highestPaginationLimit = Math.ceil(
    refinedData.length / paginationState?.noOfItems
  );

  return (
    <section className="list-section">
      <Filter
        filterOptions={filterOptions}
        setFilterOptions={setFilterOptions}
        sortOptions={sortOptions}
        setSortOptions={setSortOptions}
        noOfItems={paginationState.noOfItems}
        handleItemNumChange={handleItemNumChange}
      />

      <InfoPanel
        selectedItem={refinedData.find((obj) => obj?.id === selectedPersonId)}
      />

      <Pagination handlePagination={handlePagination} />

      <ul>{nameList}</ul>
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
