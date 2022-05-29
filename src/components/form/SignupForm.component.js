import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './SignupForm.styles.css';

const validationPatterns = {
  name: /^[a-zA-Z\s]+$/,
  email:
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  mobile: /^((\(?\+45\)?)?)(\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/,
  street: /^((.){1,}(\d){1,}(.){0,})$/,
  zipCode: /^[D-d][K-k]( |-)[1-9]{1}[0-9]{3}$/,
};

const errorMessage = {
  required: 'is required',
  name: 'Name can not include Number',
  email: 'Please enter a valid email address: example@domain.com',
  mobile:
    'Please enter a valid mobile number:  (+45) 35 35 35 35 ||| +45 35 35 35 35 ||| 35 35 35 35 ||| 35353535',
  streetName:
    'Please enter a valid address: Teststreet 32 | Tørststræde 4 | Tørststræde 24 1. tv',
  city: 'City name is required',
  zipCode: 'Please enter a valid zipCode: DK-1234|||dk 1234|||Dk-1234',
};

export const SignupForm = ({ text, label, handlePost }) => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    mobile: '',
    streetName: '',
    city: '',
    zipCode: '',
  });

  const [isMessageSent, setIsMessageSent] = useState(false);
  const [isAllInputProvided, setIsAllInputProvided] = useState(false);
  const [errorState, setErrorState] = useState([]);
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (
      formState.name &&
      formState.email &&
      formState.mobile &&
      formState.streetName &&
      formState.city &&
      formState.zipCode
    ) {
      setIsAllInputProvided(true);
    } else {
      setIsAllInputProvided(false);
    }
  }, [formState]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value.trim() });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let errors = {};
    errors = Object.keys(formState).map((key) => {
      const error = {
        field: key,
        message: '',
      };
      if (!formState[key]) {
        error.message = `${[key]} ${errorMessage.required}`;
        errors[`${[key]}`] = `${[key]} ${errorMessage.required}`;
      } else if (
        Object.prototype.hasOwnProperty.call(validationPatterns, `${key}`)
      ) {
        if (!formState[key].match(validationPatterns[key])) {
          error.message = errorMessage[key];
          errors[`${[key]}`] = errorMessage[key];
        }
      }
      setErrors(errors);
      return error;
    });
    setErrorState(errors);

    if (errors.filter((err) => err.message !== '').length === 0) {
      handlePost(
        formState.name,
        formState.email,
        formState.mobile,
        formState.streetName,
        formState.city,
        formState.zipCode,
      );
      setIsMessageSent(true);
      setFormState({
        name: '',
        email: '',
        mobile: '',
        streetName: '',
        city: '',
        zipCode: '',
      });
    }
  };

  return (
    <div>
      <div className="signup-form-container">
        <div className="wrapper-outer">
          <form id="signupForm">
            <div className="wrapper">
              {isMessageSent ? (
                <p className="successMsg">Yor data submitted</p>
              ) : (
                ''
              )}

              <div className="form-row">
                <label htmlFor="name">
                  name <span className="requiredStar">*</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formState.name}
                  placeholder="type your name"
                  onChange={handleChange}
                  required
                />
                <div>
                  <span className="errorMsg">{errors.name}</span>
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="email">
                  email <span className="requiredStar">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formState.email}
                  placeholder="type your email"
                  onChange={handleChange}
                  required
                />
                <div>
                  <span className="errorMsg">{errors.email}</span>
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="mobile">
                  mobile <span className="requiredStar">*</span>
                </label>
                <input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formState.mobile}
                  placeholder="type your mobile"
                  onChange={handleChange}
                  required
                />
                <div>
                  <span className="errorMsg">{errors.mobile}</span>
                </div>
              </div>

              <p> DELIVERY ADDRESS</p>

              <div className="form-row">
                <label htmlFor="streetName">
                  street name <span className="requiredStar">*</span>
                </label>
                <input
                  type="text"
                  id="streetName"
                  name="streetName"
                  value={formState.streetName}
                  placeholder="type your street name"
                  onChange={handleChange}
                  required
                />
                <div>
                  <span className="errorMsg">{errors.streetName}</span>
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="city">
                  city <span className="requiredStar">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  value={formState.city}
                  placeholder="type your city name"
                  onChange={handleChange}
                  required
                />
                <div>
                  <span className="errorMsg">{errors.city}</span>
                </div>
              </div>

              <div className="form-row">
                <label htmlFor="zipCode">
                  zip code <span className="requiredStar">*</span>
                </label>
                <input
                  type="text"
                  id="zipCode"
                  name="zipCode"
                  value={formState.zipCode}
                  placeholder="type your zip-code"
                  onChange={handleChange}
                  required
                />
                <div>
                  <span className="errorMsg">{errors.zipCode}</span>
                </div>
              </div>

              <div className="form-row">
                <button
                  className={
                    isAllInputProvided
                      ? 'allInputProvided'
                      : 'notAllInputProvided'
                  }
                  type="submit"
                  label={label}
                  onClick={handleSubmit}
                >
                  {text}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

SignupForm.propTypes = {
  text: PropTypes.string,
  label: PropTypes.string.isRequired,
  handlePost: PropTypes.func,
};

SignupForm.defaultProps = {
  text: null,
  handlePost: () => { },
};
