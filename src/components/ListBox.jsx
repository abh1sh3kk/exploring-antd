import { useMemo } from "react";
import ListItem from "./ListItem";

function ListBox({
  dataToDisplay,
  selectedPersonId,
  handleItemSelection,
}) {
  const nameList = useMemo(() => {
    return dataToDisplay.map((obj) => (
      <ListItem
        key={obj?.id}
        selected={selectedPersonId === obj?.id}
        personInfo={obj}
        handleItemSelection={handleItemSelection}
      />
    ));
  }, [dataToDisplay, selectedPersonId]);

  return (
    <>
      <ul>{nameList}</ul>
    </>
  );
}

export default ListBox;
