<template>
  <div class="import-file-container">
    <!-- Header Section -->
    <div class="header-section">
      <h2 class="page-title"><i class="fa-solid fa-file"></i> File Management > Import File</h2>
      <button class="refresh-button"><i class="fa-solid fa-arrows-rotate"></i> Refresh</button>
    </div>

    <!-- Search Bar Section -->
    <div class="search-bar">
      <div class="search-input-wrapper">
        <i class="fa-solid fa-magnifying-glass search-icon"></i>
        <input type="text" placeholder="File Name" class="file-name-input" />
      </div>
    </div>

    <!-- Data Table Section -->
    <div class="data-table-wrapper">
      <table class="data-table">
        <thead>
          <tr>
            <th>File Name</th>
            <th>Description</th>
            <th>Last Run</th>
            <th>Status</th>
            <th>Lastest File</th>
            <th>Import File</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.name">
            <td>{{ file.name }}</td>
            <td>{{ file.description }}</td>
            <td>{{ file.lastRun }}</td>
            <td>
              <span :class="['status-cell', file.status === 'Success' ? 'status-success' : '']">
                <i v-if="file.status === 'Success'" class="fa-solid fa-circle-check"></i>
                {{ file.status }}
              </span>
              <a href="#" class="detail-link">Detail</a>
            </td>
            <td>
              <button class="icon-button download-button">
                <i class="fa-solid fa-download"></i>
              </button>
            </td>
            <td>
              <button class="icon-button upload-button">
                <i class="fa-solid fa-upload"></i>
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const files = ref([
  {
    name: 'Gain_FTA_Target_Data',
    description: 'เป้าหมายพิกัดศุลกากร',
    lastRun: '25/06/2025 00:13:20',
    status: 'Success',
  },
  {
    name: 'D_CF_FTA_COUNTRY',
    description: 'ข้อมูล Dimension FTA Country',
    lastRun: '25/06/2025 00:13:20',
    status: 'Success',
  },
])
</script>

<style scoped>
.import-file-container {
  padding: 2rem;
  background-color: #f0f2f5; /* Background color for the content area */
  min-height: calc(100vh - 60px); /* Adjust to fill remaining height below header */
}

/* Header Section */
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.8rem;
  font-weight: bold;
  color: #333;
  margin: 0;
}

.page-title i {
  margin-right: 0.8rem;
  color: #3f51b5; /* Icon color */
}

.refresh-button {
  background-color: #3f51b5; /* Blue background */
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: background-color 0.2s ease;
}

.refresh-button:hover {
  background-color: #303f9f; /* Darker blue on hover */
}

/* Search Bar Section */
.search-bar {
  background-color: white;
  border-radius: 8px;
  padding: 1rem;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 1rem;
  color: #aaa;
}

.file-name-input {
  width: 100%;
  padding: 0.75rem 1rem 0.75rem 3rem; /* Left padding for icon */
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box; /* Include padding in width */
}

/* Data Table Section */
.data-table-wrapper {
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  overflow-x: auto; /* Allow horizontal scrolling for small screens */
}

.data-table {
  width: 100%;
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #eee;
}

.data-table th {
  background-color: #f8f8f8;
  font-weight: bold;
  color: #555;
}

.data-table tbody tr:last-child td {
  border-bottom: none; /* No border for the last row */
}

/* Status Cell Styling */
.status-cell {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: bold;
}

.status-success {
  color: #28a745; /* Green color for success */
}

.status-success i {
  font-size: 1.1rem;
}

.detail-link {
  color: #3f51b5;
  text-decoration: none;
  margin-left: 0.8rem;
}

.detail-link:hover {
  text-decoration: underline;
}

/* Icon Buttons in Table */
.icon-button {
  background: none;
  border: none;
  color: #3f51b5; /* Blue color for icons */
  font-size: 1.2rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;
}

.icon-button:hover {
  color: #303f9f; /* Darker blue on hover */
}
</style>
