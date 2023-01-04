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
  
  
  document.querySelector('.login-form').addEventListener('submit', loginForm);
 
  