<script setup lang="ts">
import AppHeader from './components/AppHeader.vue'
import AppSidebar from './components/AppSidebar.vue'
// ไม่ต้อง import ImportFileContent.vue ที่นี่แล้ว เพราะ Vue Router จะจัดการให้
</script>

<template>
  <div id="app-layout">
    <!-- Header Component -->
    <AppHeader />

    <!-- Sidebar Component -->
    <AppSidebar />

    <!-- Main Content Area: ใช้ <router-view> เพื่อแสดง Component ตาม Route -->
    <main class="app-content">
      <router-view></router-view>
    </main>
  </div>
</template>

<style>
/* Base styles for body and html - Crucial for full height layout */
body,
html {
  margin: 0;
  padding: 0;
  font-family: Arial, sans-serif;
  height: 100%; /* Ensure html and body take full height */
  overflow: hidden; /* Prevent overall scrollbar if content fits */
}

/* Main Grid Layout Container */
#app-layout {
  display: grid;
  /* Define named grid areas:
     - header spans both columns
     - sidebar on the left, content on the right
  */
  grid-template-areas:
    'header header'
    'sidebar content';

  /* Define column widths:
     - 'auto' for sidebar: adjusts to its content (60px collapsed, 250px expanded)
     - '1fr' for content: takes up all remaining available space
  */
  grid-template-columns: auto 1fr;

  /* Define row heights:
     - '60px' for header: fixed height
     - '1fr' for content/sidebar: takes up all remaining vertical space
  */
  grid-template-rows: 60px 1fr;

  /* Ensure the grid container takes the full viewport height */
  min-height: 100vh;
  height: 100%; /* Explicitly set height to 100% */
}

/* Assign 'content' grid area to the main content section */
.app-content {
  grid-area: content; /* Places this element in the 'content' grid area */
  /* Remove padding here if ImportFileContent handles its own padding */
  /* padding: 2rem; */
  background-color: #f0f2f5; /* Light grey background for the content area */
  overflow-y: auto; /* Allow scrolling for content if it overflows */
}
</style>
