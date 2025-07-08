<template>
  <div class="container">
    <h2>Daftar Nilai Mahasiswa</h2>

    <form @submit.prevent="addGrade" class="form">
      <input v-model="newGrade.student" placeholder="Nama Mahasiswa" class="input" />
      <input v-model="newGrade.course" placeholder="Mata Kuliah" class="input" />
      <input v-model.number="newGrade.score" type="number" placeholder="Nilai" class="input" />
      <button type="submit" class="btn">Tambah Nilai</button>
    </form>

    <ul class="list">
      <li v-for="grade in grades" :key="grade.id" class="list-item">
        {{ grade.student }} - {{ grade.course }} : <strong>{{ grade.score }}</strong>
        <button @click="deleteGrade(grade.id)" class="btn btn-delete">Hapus</button>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Grades',
  data() {
    return {
      grades: [],
      newGrade: {
        student: '',
        course: '',
        score: null
      }
    }
  },
  async created() {
    await this.fetchGrades()
  },
  methods: {
    async fetchGrades() {
      try {
        const res = await axios.get('http://localhost:3000/grades')
        this.grades = res.data
      } catch (error) {
        console.error('Gagal memuat data nilai:', error)
      }
    },
    async addGrade() {
      if (!this.newGrade.student || !this.newGrade.course || this.newGrade.score == null) {
        alert('Semua field harus diisi!')
        return
      }
      try {
        const res = await axios.post('http://localhost:3000/grades', this.newGrade)
        this.grades.push(res.data)
        this.newGrade = { student: '', course: '', score: null }
      } catch (error) {
        console.error('Gagal tambah nilai:', error)
        alert('Gagal tambah nilai, coba lagi!')
      }
    },
    async deleteGrade(id) {
      try {
        await axios.delete(`http://localhost:3000/grades/${id}`)
        this.grades = this.grades.filter(grade => grade.id !== id)
      } catch (error) {
        console.error('Gagal hapus nilai:', error)
        alert('Gagal hapus nilai, coba lagi!')
      }
    }
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  background: #f9fafb;
  border-radius: 8px;
  box-shadow: 0 4px 10px rgba(0,0,0,0.1);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
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
  border-color: #3b82f6; /* Blue */
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
  box-shadow: 0 1px 4px rgba(0,0,0,0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.btn-delete {
  background-color: #ef4444;
  padding: 6px 12px;
  font-size: 14px;
}

.btn-delete:hover {
  background-color: #b91c1c;
}
</style>
