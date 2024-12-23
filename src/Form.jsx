import React, { useState, useEffect } from "react";
import Input from "./Input";

const Form = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    age: "",
    country: "",
    agreeToTerms: false,
  });

  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "fullName":
        if (value.length < 3) {
          error = "Full name must be at least 3 characters.";
        }
        break;
      case "email":
        if (!/\S+@\S+\.\S+/.test(value)) {
          error = "Email must be valid.";
        }
        break;
      case "password":
        if (
          value.length < 8 ||
          !/\d/.test(value) ||
          !/[!@#$%^&*]/.test(value)
        ) {
          error =
            "Password must be at least 8 characters, include a number, and a special character.";
        }
        break;
      case "phoneNumber":
        if (!/^\d{10}$/.test(value)) {
          error = "Phone number must be exactly 10 digits.";
        }
        break;
      case "age":
        if (value < 18 || value > 65) {
          error = "Age must be between 18 and 65.";
        }
        break;
      case "country":
        if (!value) {
          error = "Country is required.";
        }
        break;
      case "agreeToTerms":
        if (!value) {
          error = "You must agree to the terms.";
        }
        break;
      default:
        break;
    }

    return error;
  };

  const validate = () => {
    const newErrors = {};
    for (const field in formData) {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    }
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === "checkbox" ? checked : value;

    setFormData({
      ...formData,
      [name]: fieldValue,
    });

    // Validate the field dynamically and update the errors
    const fieldError = validateField(name, fieldValue);
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: fieldError,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      setIsSubmitted(true);
      console.log("Form Data:", formData);
    } else {
      setErrors(validationErrors);
    }
  };

  useEffect(() => {
    const validationErrors = validate();
    setIsFormValid(Object.keys(validationErrors).length === 0);
  }, [formData]);

  return (
    <div style={{ position: "relative", padding: "20px" }}>
      {isSubmitted && (
        <div
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            backgroundColor: "#4CAF50",
            color: "white",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
            textAlign: "center",
            zIndex: 1000,
          }}
        >
          <h3>Form Submitted Successfully!</h3>
          <p>Thank you for your submission.</p>
          <button
            onClick={() => setIsSubmitted(false)}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              border: "none",
              backgroundColor: "white",
              color: "#4CAF50",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        </div>
      )}
      <form
        onSubmit={handleSubmit}
        style={{ maxWidth: "400px", margin: "auto", fontFamily: "Arial" }}
      >
        <Input
          label="Full Name"
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          tooltip="Enter your full name (at least 3 characters)."
          error={errors.fullName}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          tooltip="Enter a valid email address (e.g., example@mail.com)."
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          tooltip="Password must be at least 8 characters, include a number and a special character."
          error={errors.password}
        />
        <Input
          label="Phone Number"
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          tooltip="Enter your phone number (10 digits)."
          error={errors.phoneNumber}
        />
        <Input
          label="Age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
          tooltip="Enter your age (between 18 and 65)."
          error={errors.age}
        />
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", fontWeight: "bold" }}>Country</label>
          <select
            name="country"
            value={formData.country}
            onChange={handleChange}
            style={{
              width: "100%",
              padding: "8px",
              border: errors.country ? "2px solid red" : "1px solid #ccc",
              borderRadius: "4px",
            }}
          >
            <option value="">Select a country</option>
            <option value="Jordan">Jordan</option>
            <option value="USA">USA</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
            <option value="France">France</option>
          </select>
          {errors.country && (
            <small style={{ color: "red" }}>{errors.country}</small>
          )}
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label>
            <input
              type="checkbox"
              name="agreeToTerms"
              checked={formData.agreeToTerms}
              onChange={handleChange}
              style={{ marginRight: "5px" }}
            />
            Agree to Terms
          </label>
          {errors.agreeToTerms && (
            <small style={{ color: "red", display: "block" }}>
              {errors.agreeToTerms}
            </small>
          )}
        </div>
        <button
          type="submit"
          disabled={!isFormValid}
          style={{
            backgroundColor: isFormValid ? "#4CAF50" : "#ccc",
            color: isFormValid ? "white" : "#666",
            padding: "10px",
            border: "none",
            borderRadius: "4px",
            cursor: isFormValid ? "pointer" : "not-allowed",
            width: "100%",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Form;