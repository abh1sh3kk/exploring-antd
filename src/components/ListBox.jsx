import { useMemo } from "react";
import ListItem from "./ListItem";

function ListBox({
  dataToDisplay,
  selectedPersonId,
  setSelectedPersonId,
}) {
  const handleSelectPerson = (id) => {
    if (selectedPersonId === id) setSelectedPersonId(null);
    else setSelectedPersonId(id);
  };
  const nameList = useMemo(() => {
    return dataToDisplay.map((obj) => (
      <ListItem
        key={obj?.id}
        selected={selectedPersonId === obj?.id}
        personInfo={obj}
        selectNewPerson={handleSelectPerson}
      />
    ));
  }, [dataToDisplay, selectedPersonId]);

  console.log(dataToDisplay);
  return (
    <>
      <ul>{nameList}</ul>
    </>
  );
}

export default ListBox;
