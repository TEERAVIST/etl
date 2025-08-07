<template>
  <!-- Sidebar Container: เปลี่ยนขนาดด้วย class is-collapsed -->
  <aside :class="['sidebar', { 'is-collapsed': isCollapsed }]">
    <!-- Sidebar Header -->
    <div class="sidebar-header">
      <span v-if="!isCollapsed" class="header-text">ETL Web Administrator</span>
      <button @click="toggleSidebar" class="sidebar-toggle-btn">
        <!-- Icon ลูกศรจะเปลี่ยนทิศทางตามสถานะ isCollapsed -->
        <i :class="isCollapsed ? 'fa-solid fa-chevron-right' : 'fa-solid fa-chevron-left'"></i>
      </button>
    </div>

    <!-- Sidebar Navigation -->
    <nav class="sidebar-nav">
      <ul class="main-menu">
        <li v-for="item in menuItems" :key="item.name">
          <!-- เมนูหลัก -->
          <!-- ใช้ router-link สำหรับเมนูหลักที่มี link หรือไม่มี subItems -->
          <router-link
            v-if="!item.subItems && item.link"
            :to="item.link"
            :class="['menu-item', { 'is-active': activeItem === item.name }]"
            @click="handleMenuItemClick(item)"
          >
            <i :class="['menu-icon', item.icon]"></i>
            <span v-if="!isCollapsed" class="menu-text">{{ item.name }}</span>
          </router-link>

          <!-- สำหรับเมนูหลักที่มี subItems (ยังคงใช้ div เพื่อจัดการการยุบ-ขยาย) -->
          <div
            v-else
            :class="['menu-item', { 'is-active': activeItem === item.name }]"
            @click="handleMenuItemClick(item)"
          >
            <i :class="['menu-icon', item.icon]"></i>
            <span v-if="!isCollapsed" class="menu-text">{{ item.name }}</span>
            <!-- Icon ลูกศรสำหรับเมนูที่ยุบได้ -->
            <i
              v-if="!isCollapsed && item.subItems"
              :class="[
                'sub-menu-arrow',
                { 'fa-chevron-up': item.isExpanded, 'fa-chevron-down': !item.isExpanded },
              ]"
            ></i>
          </div>

          <!-- เมนูย่อย (แสดงเมื่อ isExpanded เป็น true) -->
          <ul v-if="item.subItems && item.isExpanded" class="sub-menu">
            <li v-for="subItem in item.subItems" :key="subItem.name">
              <!-- ใช้ router-link สำหรับเมนูย่อย -->
              <router-link
                :to="subItem.link"
                :class="['sub-menu-item', { 'is-active': activeItem === subItem.name }]"
                @click.prevent="handleSubMenuItemClick(subItem)"
              >
                <span v-if="!isCollapsed">{{ subItem.name }}</span>
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router' // <--- Import useRoute เพื่อเข้าถึง route ปัจจุบัน

const route = useRoute() // <--- เรียกใช้ useRoute
const isCollapsed = ref(false)
const activeItem = ref('') // เปลี่ยนเป็น string ว่าง เพื่อให้ activeItem อัปเดตตาม route

const menuItems = ref([
  // เพิ่ม 'link' property สำหรับเมนูที่ต้องการ navigate
  { name: 'Dashboard', icon: 'fa-solid fa-table-columns', link: '/' },
  { name: 'Activity Log', icon: 'fa-solid fa-server', link: '/activity_log' },
  { name: 'Job', icon: 'fa-solid fa-folder', link: '/job' },
  { name: 'Batch', icon: 'fa-solid fa-rotate', link: '/batch' },
  {
    name: 'File Management',
    icon: 'fa-solid fa-file',
    isExpanded: false,
    subItems: [
      { name: 'Import File', link: '/import_file' }, // <--- กำหนด link
      { name: 'Upload File', link: '/upload_file' },
    ],
  },
  {
    name: 'Data Management',
    icon: 'fa-solid fa-gear',
    isExpanded: true,
    subItems: [
      { name: 'การจัดการข้อมูลประเทศ', link: '/data_management/country' },
      { name: 'การจัดการข้อมูล FTA', link: '/data_management/fta' },
      { name: 'การสร้างกลุ่มประเทศ', link: '/data_management/country_group' },
      { name: 'การสร้างกลุ่มสินค้า', link: '/data_management/product_group' },
    ],
  },
])

// ใช้ watch เพื่ออัปเดต activeItem เมื่อ route เปลี่ยน
import { watchEffect } from 'vue'
watchEffect(() => {
  // ค้นหาเมนูหลักที่ตรงกับ route ปัจจุบัน
  const foundMainItem = menuItems.value.find((item) => item.link === route.path)
  if (foundMainItem) {
    activeItem.value = foundMainItem.name
    // ตรวจสอบให้เมนูหลักที่มี subItems เปิดอยู่ถ้า subItem ของมันถูกเลือก
    if (foundMainItem.subItems && !foundMainItem.isExpanded) {
      foundMainItem.isExpanded = true
    }
    return
  }

  // ค้นหาเมนูย่อยที่ตรงกับ route ปัจจุบัน
  for (const item of menuItems.value) {
    if (item.subItems) {
      const foundSubItem = item.subItems.find((subItem) => subItem.link === route.path)
      if (foundSubItem) {
        activeItem.value = foundSubItem.name
        item.isExpanded = true // เปิดเมนูหลักของเมนูย่อยที่ถูกเลือก
        return
      }
    }
  }
  // ถ้าไม่พบ ให้ activeItem เป็นค่าว่าง หรือค่าเริ่มต้นอื่นๆ
  activeItem.value = ''
})

function toggleSidebar() {
  isCollapsed.value = !isCollapsed.value
}

function handleMenuItemClick(item: {
  name: string
  subItems?: any[]
  isExpanded?: boolean
  link?: string
}) {
  // ถ้าเมนูหลักมี subItems ให้จัดการการยุบ-ขยายเท่านั้น
  if (item.subItems) {
    item.isExpanded = !item.isExpanded
  } else if (item.link) {
    // ถ้าไม่มี subItems และมี link ให้ activeItem เป็นชื่อเมนูนั้น
    activeItem.value = item.name
  }
}

function handleSubMenuItemClick(subItem: { name: string; link: string }) {
  activeItem.value = subItem.name
}
</script>

<style scoped>
/*
  CSS styles remain the same as before.
  No changes needed here.
*/
.sidebar {
  width: 250px;
  background-color: #fff; /* พื้นหลังสีขาว */
  color: #333;
  min-height: 100vh;
  transition: width 0.3s ease;
  overflow: hidden;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
  grid-area: sidebar; /* <--- เพิ่มบรรทัดนี้ */
}

.sidebar.is-collapsed {
  width: 60px; /* ความกว้างเมื่อยุบ */
}

.sidebar-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  height: 60px;
  border-bottom: 1px solid #ddd;
  background-color: #fff;
}

.header-text {
  font-weight: bold;
  color: #000;
  white-space: nowrap;
  overflow: hidden;
}

.sidebar-toggle-btn {
  background: none;
  border: none;
  font-size: 1.2rem;
  cursor: pointer;
  color: #333;
}

.sidebar-nav {
  padding-top: 1rem;
}

.main-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

/* Base style for both menu-item and router-link */
.menu-item,
.router-link-active.menu-item {
  display: flex;
  align-items: center;
  padding: 12px 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  text-decoration: none; /* Remove underline from router-link */
  color: #333; /* Default text color */
}

.menu-item:hover,
.router-link-active.menu-item:hover {
  background-color: #f0f0f0;
}

.menu-item.is-active,
.router-link-active.menu-item.is-active {
  background-color: #e0e7ff; /* สีไฮไลท์อ่อน */
  color: #3f51b5; /* สีน้ำเงิน */
}

.menu-item.is-active .menu-icon,
.menu-item.is-active .sub-menu-arrow,
.router-link-active.menu-item.is-active .menu-icon,
.router-link-active.menu-item.is-active .sub-menu-arrow {
  color: #3f51b5;
}

.menu-icon {
  width: 30px;
  font-size: 1.2rem;
  text-align: center;
  color: #666;
}

.menu-text {
  margin-left: 1rem;
  white-space: nowrap;
}

.sub-menu-arrow {
  margin-left: auto;
  font-size: 0.8rem;
  color: #666;
  transition: transform 0.3s ease;
}

.sub-menu {
  list-style-type: none;
  padding: 0;
  margin: 0;
  background-color: #fafafa;
}

/* Base style for both sub-menu-item and router-link */
.sub-menu-item,
.router-link-active.sub-menu-item {
  display: block;
  padding: 8px 1rem 8px 3.5rem; /* Indent sub-menu items */
  text-decoration: none;
  color: #666;
  white-space: nowrap;
}

.sub-menu-item:hover,
.router-link-active.sub-menu-item:hover {
  background-color: #f0f0f0;
}

.sub-menu-item.is-active,
.router-link-active.sub-menu-item.is-active {
  background-color: #e0e7ff;
  color: #3f51b5;
}
</style>
