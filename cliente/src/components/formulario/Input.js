import { useField } from 'formik';
const Input = ({ label, ...props})=>{
    const [ field, meta ] = useField(props);
    return (
        <div className="mb-3">
            <label htmlFor="exampleFormControlInput1" className="form-label">{label}</label>
            <input className={meta.touched && meta.error ? "form-control is-invalid" : "form-control"} {...field}/>
                {meta.touched && meta.error ? 
                    <div className="invalid-feedback">{meta.error}</div>
                    :
                    <div className="valid-feedback"></div>
                }
        </div>
    )
}
export default Input;