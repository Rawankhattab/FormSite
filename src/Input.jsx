
const Input = ({ label, type, name, value, onChange, error,tooltip }) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      <label style={{ display: "block", fontWeight: "bold" }}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        title={tooltip} 
        style={{
          width: "100%",
          padding: "8px",
          border: error ? "2px solid red" : "1px solid #ccc",
          borderRadius: "3px",
        }}
      />
      {error && <small style={{ color: "red" }}>{error}</small>}
    </div>
  );
};

export default Input;
