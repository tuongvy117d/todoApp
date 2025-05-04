<template>
  <div class="not-found">
    <h1>404</h1>
    <div class="message">Page Not Found</div>
    <p>The page you are looking for doesn't exist or has been moved.</p>
    <router-link to="/" class="home-link">Go to Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: calc(100vh - 150px);
  text-align: center;
  padding: 2rem;
}

h1 {
  font-size: 6rem;
  margin: 0;
  color: #2c3e50;
}

.message {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

p {
  color: #6c757d;
  margin-bottom: 2rem;
  max-width: 500px;
}

.home-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background-color: #4fc08d;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  font-weight: 600;
  transition: background-color 0.3s ease;
}

.home-link:hover {
  background-color: #3daf7f;
}
</style>