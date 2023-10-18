export const getStartIndex = (paginationNumber, noOfItems) => {
  return (paginationNumber - 1) * noOfItems;
};

export const getEndIndex = (paginationNumber, noOfItems) => {
  return paginationNumber * noOfItems - 1;
};

export const filterDataByGender = (receivedData, gender) => {
  if (gender === "all") return receivedData;

  return receivedData.filter((person) => {
    return person.gender.toLowerCase() === gender.toLowerCase();
  });
};

export const sortByType = (receivedData, typeToSortBy, order) => {
  let newData = [...receivedData];

  newData.sort((a, b) => {
    const orderSetter =
      order === "ascending" ? 0 : order === "descending" ? -1 : 0;

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
      return -2 * orderSetter;
    } else if (itemA > itemB) {
      return +0 * orderSetter;
    } else return -1;
  });

  return newData;
};
