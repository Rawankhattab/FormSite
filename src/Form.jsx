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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (formData.fullName.length < 3) {
      newErrors.fullName = "Full name must be at least 3 characters.";
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email must be valid.";
    }
    if (formData.password.length < 8 || !/\d/.test(formData.password) || !/[!@#$%^&*]/.test(formData.password)) {
      newErrors.password = "Password must be at least 8 characters, include a number, and a special character.";
    }
    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Phone number must be exactly 10 digits.";
    }
    if (formData.age < 18 || formData.age > 65) {
      newErrors.age = "Age must be between 18 and 65.";
    }
    if (!formData.country) {
      newErrors.country = "Country is required.";
    }
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms.";
    }
    return newErrors;
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
            onClick={() => setIsSubmitted(false)} // إغلاق الـ Popup
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
          error={errors.fullName}
        />
        <Input
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          error={errors.email}
        />
        <Input
          label="Password"
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          error={errors.password}
        />
        <Input
          label="Phone Number"
          type="text"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
          error={errors.phoneNumber}
        />
        <Input
          label="Age"
          type="number"
          name="age"
          value={formData.age}
          onChange={handleChange}
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
          {errors.country && <small style={{ color: "red" }}>{errors.country}</small>}
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
          {errors.agreeToTerms && <small style={{ color: "red", display: "block" }}>{errors.agreeToTerms}</small>}
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