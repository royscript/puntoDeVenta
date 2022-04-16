import { useField } from 'formik';
import { useEffect } from 'react';
const InputReadOnly = ({ label,type, ...props})=>{
    const [ field, meta ] = useField(props);
    useEffect(()=>{
        if(type){
            type="text";
        }
    },[])
    return (
        <div className="mb-3" style={type=='hidden'?{"display":"none"}:{"display":"block"}}>
            <label className="form-label" >{label}</label>
            <input type={type} readOnly className={meta.touched && meta.error ? "form-control is-invalid" : "form-control"} {...field}/>
                {meta.touched && meta.error ? 
                    <div className="invalid-feedback">{meta.error}</div>
                    :
                    <div className="valid-feedback"></div>
                }
        </div>
    )
}
export default InputReadOnly;