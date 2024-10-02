export const validatePassword = (password: string) => {
  if (!/^(?=.*[!@#$%^&*])(?=.*[A-Za-z\d]).{7,}$/.test(password)) {
    return "Password must be at least 7 characters long and include at least one special character";
  }
  return null;
};

export const getInitial = (name: string) => {
  return name ? name.charAt(0).toUpperCase() : "";
};
