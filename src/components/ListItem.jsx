function ListItem({ personInfo, handleShowMore, selected, setSelected }) {
  return (
    <li
      className={selected ? `list-item--selected` : ""}
      key={personInfo.id}
      onClick={() => handleShowMore(personInfo.id)}
      data-personid={personInfo.id}
    >
      <div>
        {personInfo.first_name} {personInfo.last_name}
      </div>
    </li>
  );
}
export default ListItem;
