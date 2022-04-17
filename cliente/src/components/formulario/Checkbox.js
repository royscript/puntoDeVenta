import { useField } from 'formik'

const Checkbox = ({ children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' })

  return (
    <div className="form-check form-switch">
        <input type="checkbox" className="form-check-input" {...field} {...props} />
        <label className="form-check-label" for="flexSwitchCheckDefault">{children}</label>
      {meta.touched && meta.error ?
        <div>{meta.error}</div> : null}
    </div>
  )
}

export default Checkbox
