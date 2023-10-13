export default function InfoPanel({ selectedItem }) {
  if (!selectedItem)
    return (
      <section className="info-panel">
        Please select an item to see it's details
      </section>
    );
  return (
    <section className="info-panel">
      <h1>
        {selectedItem?.first_name} {selectedItem?.last_name}
      </h1>
      <div>{selectedItem?.job}</div>
      <div>Age: {selectedItem?.age}</div>
      <div>Address: {selectedItem?.address}</div>
    </section>
  );
}
