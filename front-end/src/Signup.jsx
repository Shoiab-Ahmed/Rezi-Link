const isValidEmail = (email) => {
  const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return regex.test(email);
};

const handleSignup = async (e) => {
  e.preventDefault();

  // Frontend validations
  if (!isValidEmail(email)) {
    setErrorMessage("Please enter a valid email address.");
    return;
  }

  if (!username || !password) {
    setErrorMessage("Username and password are required.");
    return;
  }

  try {
    const response = await axios.post("http://127.0.0.1:5000/users/register", {
      username,
      email,
      password,
    });

    localStorage.setItem("token", response.data.token);
    login(response.data.token);
    setErrorMessage("");
    navigate('/dashboard');
  } catch (e) {
    if (e.response && e.response.data && e.response.data.error) {
      setErrorMessage(e.response.data.error);
    } else {
      setErrorMessage("Signup failed. Please try again later.");
    }
  }
};
