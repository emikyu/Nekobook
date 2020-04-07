import React from 'react';

export default ({type, field, errors, handleFocus, handleBlur, handleChange, placeholder}) => (
    <span className={`${field}-form-container`}>
        <input type={type} onFocus={handleFocus} onBlur={handleBlur(field)} onChange={handleChange(field)} placeholder={placeholder} name={field} />
        <i className="fa fa-exclamation-circle" aria-hidden="true"></i>
        {
            errors[field] ? (
                <span className="tooltip-container">
                    <span className="tooltip"></span>
                    <span className="tooltip-message">
                        {errors[field]}
                    </span>
                </span>
            ) : (<></>)
        }
    </span>
);