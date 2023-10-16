function ListItem({ personInfo, handleItemSelection, selected }) {
  return (
    <li
      className={selected ? `list-item--selected` : ""}
      key={personInfo.id}
      onClick={() => {
        handleItemSelection(personInfo.id);
      }}
      data-personid={personInfo.id}
    >
      <div>
        {personInfo.first_name} {personInfo.last_name}
      </div>
    </li>
  );
}
export default ListItem;
