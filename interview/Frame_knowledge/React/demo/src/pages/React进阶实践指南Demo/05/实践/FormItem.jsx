import React from 'react';

const FormItem = (props) => {
    console.log('FormItem props: ', props);
    const {name, value, handleChange, label, children} = props;

    const onChange = value => {
        handleChange(name, value);
    }

    return (
        <div>
            <span>{label}:</span>
            {
                React.isValidElement(children) && children.type.displayName === 'input' ?
                    React.cloneElement(children, {value, name, onChange})
                    : null
            }
        </div>
    )
}

FormItem.displayName = 'formItem';

export default FormItem;
