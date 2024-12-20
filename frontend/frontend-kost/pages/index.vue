<template>
  <div>
    <KostHeader />
    <div class="login-container">
      <div class="login-box" v-if="!isLoggedIn">
        <div class="top-login-box">
          <p>Login</p>
        </div>
        <form @submit.prevent="handleLogin" class="login-form">
          <div class="form-group">
            <label for="username">Username</label>
            <input type="text" id="username" v-model="form.username" required placeholder="Masukkan username" />
          </div>
          <div class="form-group">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="form.password" required placeholder="Masukkan password" />
          </div>
          <div class="form-group">
            <label for="role">Role</label>
            <select id="role" v-model="form.role" required>
              <option value="USER">USER</option>
              <option value="ADMIN">ADMIN</option>
            </select>
          </div>
          <div class="form-actions">
            <button type="submit">Login</button>
          </div>
        </form>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        username: '',
        password: '',
        role: 'USER', // Default role is USER
      },
      errorMessage: '',
      isLoggedIn: false,
    };
  },
  created() {
    if (process.client && localStorage.getItem('loginToken')) {
      this.isLoggedIn = true;
      this.$router.push('/home');
    }
  },
  methods: {
    async handleLogin() {
      try {
        const response = await fetch('http://localhost:4000/', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.form),
        });

        if (!response.ok) {
          throw new Error('Invalid credentials');
        }

        const data = await response.json();

        if (data.status === 200 && data.token && data.username) {
          if (process.client) {
            localStorage.setItem('loginToken', data.token);
            localStorage.setItem('username', data.username);
          }

          this.isLoggedIn = true;
          console.log('Login successful:', data);
          this.$router.push('/home');
        } else {
          throw new Error('Invalid response format');
        }
      } catch (error) {
        this.errorMessage = error.message;
        console.error('Login failed:', error.message);
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 600px;
}

.login-box {
  width: 400px;
  padding: 20px;
  border: 1px solid black;
  box-shadow: 0px 0px 5px 0px black;
  border-radius: 20px;
  background-color: white;
}

.successful-login {
  border: 1px solid black;
  box-shadow: 0px 0px 5px 0px black;
  border-radius: 20px;
  background-color: #f8f9fa;
}

.top-login-box {
  font-size: 30px;
  margin-bottom: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-form {
  display: flex;
  flex-direction: column;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  width: 94%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.form-actions {
  margin-top: 20px;
  text-align: center;
}

button {
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 10px;
}
</style>
