function ListItem({ personInfo, selectNewPerson, selected  }) {
  return (
    <li
      className={selected ? `list-item--selected` : ""}
      key={personInfo.id}
      onClick={() => selectNewPerson(personInfo.id)}
      data-personid={personInfo.id}
    >
      <div>
        {personInfo.first_name} {personInfo.last_name}
      </div>
    </li>
  );
}
export default ListItem;
