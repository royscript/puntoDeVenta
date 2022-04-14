import { useField, FieldProps } from "formik";
import React from "react";
import AsyncSelect from "react-select/async"

const getOptions = () => {
     return [{value: "1", label: "Test one"}, {value: "2", label: "Test two"}];
  };



const FormikSelect = ({
  label,
  ...props
}) => {

  const [field, meta, helpers] = useField(props);

  const { setValue } = helpers;

  const onChange = (option) => {
    setValue(
       (option).map((item) => item.value)
     );
  };

  return (
    <div>
      <label>{label}</label>

      <AsyncSelect
        defaultOptions
        loadOptions={promiseOptions}
        name={field.name}
        onChange={onChange}
        isMulti
      />
      
    </div>
  );
};

export default FormikSelect;