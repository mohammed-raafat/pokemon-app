import "./LoadingSpinner.css";

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <div className="spinner" data-testid="spinner"></div>
    </div>
  );
};

export default LoadingSpinner;
