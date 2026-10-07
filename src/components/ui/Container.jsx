const Container = ({ children, className = "" }) => {
  return <div className={`page-container ${className}`}>{children}</div>;
};

export default Container;
