const loginForm = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const user_name = document.querySelector('#user_name').value.trim();
    const userPassword = document.querySelector('#password-login').value.trim();
  
    if (user_name && userPassword) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ user_name, userPassword }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };

const signupForm = async (event) => {
  event.preventDefault();
  
  const user_name = document.querySelector('#name-signup').value.trim();
  const email = document.querySelector('#email-signup').value.trim();
  const password = document.querySelector('#password-signup').value.trim();
  
  if (user_name && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/games');
    } else {
      alert(response.statusText);
    }
  }
};

   
document.querySelector('.signup-form').addEventListener('submit', signupForm);
  
  
document.querySelector('.login-form').addEventListener('submit', loginForm);
 
  