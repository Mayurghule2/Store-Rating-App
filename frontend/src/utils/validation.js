// Validation rules matching backend requirements
export const VALIDATION_RULES = {
  NAME_MIN: 20,
  NAME_MAX: 60,
  ADDRESS_MAX: 400,
  PASSWORD_MIN: 8,
  PASSWORD_MAX: 16,
};

// Name validation
export const validateName = (name) => {
  const errors = [];
  
  if (!name || name.trim() === '') {
    errors.push('Name is required');
  } else {
    if (name.length < VALIDATION_RULES.NAME_MIN) {
      errors.push(`Name must be at least ${VALIDATION_RULES.NAME_MIN} characters (current: ${name.length})`);
    }
    if (name.length > VALIDATION_RULES.NAME_MAX) {
      errors.push(`Name cannot exceed ${VALIDATION_RULES.NAME_MAX} characters (current: ${name.length})`);
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Email validation
export const validateEmail = (email) => {
  const errors = [];
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!email || email.trim() === '') {
    errors.push('Email is required');
  } else if (!emailRegex.test(email)) {
    errors.push('Please enter a valid email address (e.g., user@example.com)');
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Password validation
export const validatePassword = (password) => {
  const errors = [];
  const hasUppercase = /[A-Z]/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  
  if (!password) {
    errors.push('Password is required');
  } else {
    if (password.length < VALIDATION_RULES.PASSWORD_MIN) {
      errors.push(`Password must be at least ${VALIDATION_RULES.PASSWORD_MIN} characters (current: ${password.length})`);
    }
    if (password.length > VALIDATION_RULES.PASSWORD_MAX) {
      errors.push(`Password cannot exceed ${VALIDATION_RULES.PASSWORD_MAX} characters (current: ${password.length})`);
    }
    if (!hasUppercase) {
      errors.push('Password must contain at least one uppercase letter (A-Z)');
    }
    if (!hasSpecialChar) {
      errors.push('Password must contain at least one special character (!@#$%^&*)');
    }
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Address validation
export const validateAddress = (address) => {
  const errors = [];
  
  if (address && address.length > VALIDATION_RULES.ADDRESS_MAX) {
    errors.push(`Address cannot exceed ${VALIDATION_RULES.ADDRESS_MAX} characters (current: ${address.length})`);
  }
  
  return {
    isValid: errors.length === 0,
    errors
  };
};

// Complete form validation
export const validateUserForm = (formData) => {
  const nameValidation = validateName(formData.name);
  const emailValidation = validateEmail(formData.email);
  const passwordValidation = validatePassword(formData.password);
  const addressValidation = validateAddress(formData.address);
  
  const errors = {};
  
  if (!nameValidation.isValid) errors.name = nameValidation.errors[0];
  if (!emailValidation.isValid) errors.email = emailValidation.errors[0];
  if (!passwordValidation.isValid) errors.password = passwordValidation.errors[0];
  if (!addressValidation.isValid) errors.address = addressValidation.errors[0];
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
