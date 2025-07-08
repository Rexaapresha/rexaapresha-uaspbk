<template>
  <div class="container">
    <h2>Daftar KRS</h2>

    <form @submit.prevent="addKRS" class="form">
      <input
        v-model="newKRS.student"
        placeholder="Nama Mahasiswa"
        class="input"
        type="text"
      />
      <input
        v-model="newKRS.course"
        placeholder="Mata Kuliah"
        class="input"
        type="text"
      />
      <button type="submit" class="btn">Tambah KRS</button>
    </form>

    <ul class="list">
      <li v-for="krs in krsList" :key="krs.id" class="list-item">
        {{ krs.student }} - {{ krs.course }}
        <button @click="deleteKRS(krs.id)" class="btn btn-delete">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "KRS",
  data() {
    return {
      krsList: [],
      newKRS: {
        student: "",
        course: "",
      },
    };
  },
  async created() {
    await this.fetchKRS();
  },
  methods: {
    async fetchKRS() {
      try {
        const res = await axios.get("http://localhost:3000/krs");
        this.krsList = res.data;
      } catch (error) {
        console.error("Gagal memuat data KRS:", error);
      }
    },
    async addKRS() {
      if (!this.newKRS.student || !this.newKRS.course) {
        alert("Semua field harus diisi!");
        return;
      }
      try {
        const res = await axios.post("http://localhost:3000/krs", this.newKRS);
        this.krsList.push(res.data);
        this.newKRS = { student: "", course: "" };
      } catch (error) {
        console.error("Gagal tambah KRS:", error);
        alert("Gagal tambah KRS, coba lagi!");
      }
    },
    async deleteKRS(id) {
      try {
        await axios.delete(`http://localhost:3000/krs/${id}`);
        this.krsList = this.krsList.filter((krs) => krs.id !== id);
      } catch (error) {
        console.error("Gagal hapus KRS:", error);
        alert("Gagal hapus KRS, coba lagi!");
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
}

h2 {
  text-align: center;
  color: #333;
  margin-bottom: 20px;
}

.form {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.input {
  flex: 1;
  padding: 10px 15px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  transition: border-color 0.3s ease;
}

.input:focus {
  border-color: #3b82f6;
  outline: none;
}

.btn {
  background-color: #3b82f6;
  color: white;
  border: none;
  padding: 10px 18px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-weight: 600;
}

.btn:hover {
  background-color: #2563eb;
}

.list {
  list-style: none;
  padding: 0;
}

.list-item {
  background: white;
  padding: 12px 15px;
  margin-bottom: 10px;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-delete {
  background-color: #ef4444;
  padding: 6px 12px;
  font-size: 14px;
  border-radius: 4px;
}

.btn-delete:hover {
  background-color: #b91c1c;
}
</style>
