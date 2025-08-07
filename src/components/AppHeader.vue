<template>
  <header class="app-header">
    <!-- ชื่อแอปพลิเคชัน -->
    <h1 class="app-title">ETL Web Administrator</h1>

    <!-- ส่วนข้อมูลผู้ใช้และ Logout -->
    <div class="user-info">
      <i class="fa-solid fa-user user-icon"></i>
      <span class="username">Firstname Lastname</span>
      <button class="logout-btn">
        <i class="fa-solid fa-right-from-bracket logout-icon"></i>
      </button>
    </div>
  </header>
</template>

<script setup lang="ts">
// ไม่มี script สำหรับ Header นี้ เนื่องจากเป็น static content
// หากต้องการเพิ่ม dynamic data เช่น ชื่อผู้ใช้, สามารถเพิ่ม ref() ได้
</script>

<style scoped>
.app-header {
  background-color: #3f51b5; /* สีน้ำเงินเข้มตามรูปภาพ */
  color: white;
  padding: 0 1.5rem; /* ปรับ padding ด้านข้าง */
  height: 60px; /* กำหนดความสูงตามที่ตั้งไว้ใน App.vue */
  display: flex;
  align-items: center;
  justify-content: space-between; /* จัดให้เนื้อหาอยู่คนละฝั่ง */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* เพิ่มเงาเล็กน้อย */
  grid-area: header; /* กำหนดชื่อให้กับพื้นที่นี้ใน CSS Grid */
  width: 100%; /* <--- เพิ่มบรรทัดนี้: ทำให้ Header ขยายเต็มความกว้าง */
}

.app-title {
  font-size: 1.5rem; /* ขนาดตัวอักษรของชื่อแอป */
  font-weight: bold;
  margin: 0; /* ลบ margin เริ่มต้นของ h1 */
}

.user-info {
  display: flex;
  align-items: center;
  gap: 0.8rem; /* ระยะห่างระหว่าง icon/text */
}

.user-icon {
  font-size: 1.2rem;
}

.username {
  font-size: 1rem;
  white-space: nowrap; /* ป้องกันข้อความขึ้นบรรทัดใหม่ */
}

.logout-btn {
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1.2rem;
  transition: opacity 0.2s ease;
}

.logout-btn:hover {
  opacity: 0.8; /* ลดความทึบเมื่อชี้เมาส์ */
}
</style>
