import { useField } from 'formik';
const InputReadOnly = ({ label,type, ...props})=>{
    const [ field, meta ] = useField(props);
    return (
        <div className="mb-3">
            <label className="form-label" >{label}</label>
            <input type="text" readOnly className={meta.touched && meta.error ? "form-control is-invalid" : "form-control"} {...field}/>
                {meta.touched && meta.error ? 
                    <div className="invalid-feedback">{meta.error}</div>
                    :
                    <div className="valid-feedback"></div>
                }
        </div>
    )
}
export default InputReadOnly;