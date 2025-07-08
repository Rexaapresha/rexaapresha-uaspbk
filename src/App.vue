<template>
  <div id="app">
    <nav class="navbar">
      <router-link to="/" class="nav-link" active-class="active" exact>Home</router-link>
      <router-link to="/courses" class="nav-link" active-class="active">Courses</router-link>
      <router-link to="/grades" class="nav-link" active-class="active">Grades</router-link>
      <router-link to="/krs" class="nav-link" active-class="active">KRS</router-link>
    </nav>
    <main class="content">
      <router-view />
    </main>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  max-width: 900px;
  margin: 40px auto;
  padding: 0 15px;
}

.navbar {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-bottom: 30px;
  border-bottom: 2px solid #e0e0e0;
  padding-bottom: 10px;
}

.nav-link {
  color: #555;
  text-decoration: none;
  font-weight: 600;
  font-size: 16px;
  transition: color 0.3s ease;
  padding-bottom: 4px;
}

.nav-link:hover {
  color: #3b82f6;
}

.active {
  color: #3b82f6;
  border-bottom: 2px solid #3b82f6;
}
.content {
  min-height: 400px;
}
</style>
