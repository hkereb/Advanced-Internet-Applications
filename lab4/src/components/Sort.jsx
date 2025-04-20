export default function Sort({ sortOrder, onSortChange }) {
  return (
    <div className="sort-container">
      <label>
        <select value={sortOrder} onChange={(e) => onSortChange(e.target.value)}>
          <option value="" disabled hidden>Sort by Rating</option>
          <option value="">-- none --</option>
          <option value="asc">↑ worst to best</option>
          <option value="desc">↓ best to worst</option>
        </select>
      </label>
    </div>
  );
}