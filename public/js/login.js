const loginForm = async (event) => {
    event.preventDefault();
  
    // Collect values from the login form
    const userEmail = document.querySelector('#email-login').value.trim();
    const userPassword = document.querySelector('#password-login').value.trim();

    if (userEmail && userPassword) {
      // Send a POST request to the API endpoint
      const response = await fetch('/api/users/login', {
        method: 'POST',
        body: JSON.stringify({ userEmail, userPassword }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        // If successful, redirect the browser to the profile page
        document.location.replace('/');
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
  console.log(JSON.stringify({ user_name, email, password }))

  if (user_name && email && password) {
    const response = await fetch('/api/users', {
      method: 'POST',
      body: JSON.stringify({ user_name, email, password }),
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.replace('/');
    } else {
      alert(response.statusText);
    }
  }
};

   
document.querySelector('.signup-form').addEventListener('submit', signupForm);
  
  
document.querySelector('.login-form').addEventListener('submit', loginForm);
 
  