const Input = ({ label, id, ...props }) => (
  <label htmlFor={id}>
    {label && <span>{label}</span>}
    <input id={id} {...props} />
  </label>
)

export default Input
