function RatingFilter({ selectedRating, handleRadioBtnRating }) {
  return (
    <div className="mb-4">
      <h6 className="fw-bold mb-2 fs-7">Rating</h6>
      {[4, 3, 2, 1].map((rating) => (
        <div className="form-check mb-1" key={rating}>
          <input
            className="form-check-input"
            type="radio"
            name="rating"
            id={`rating${rating}`}
            value={rating}
            checked={selectedRating === rating}
            onChange={handleRadioBtnRating}
          />
          <label className="form-check-label small" htmlFor={`rating${rating}`}>
            {rating}+{" "}
            <span className="text-warning">
              {[...Array(rating)].map((_, i) => (
                <i key={i} className="bi bi-star-fill small"></i>
              ))}
            </span>
          </label>
        </div>
      ))}
    </div>
  );
}

export default RatingFilter;
