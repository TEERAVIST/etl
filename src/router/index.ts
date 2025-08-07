import { createRouter, createWebHistory } from 'vue-router'
import ImportFileContent from '../components/ImportFileContent.vue' // Import Component ของคุณ

const routes = [
  {
    path: '/', // Path เริ่มต้น หรือหน้า Dashboard
    name: 'Home',
    // component: () => import('../components/DashboardContent.vue') // ถ้ามีหน้า Dashboard
    redirect: '/import_file', // ชั่วคราวให้ redirect ไปที่ /import_file เพื่อทดสอบ
  },
  {
    path: '/import_file', // Endpoint สำหรับหน้า Import File
    name: 'ImportFile',
    component: ImportFileContent, // Component ที่จะแสดงผลเมื่อเข้าถึง Path นี้
  },
  {
    path: '/upload_file',
    name: 'UploadFile',
    component: () => import('../components/UploadFileContent.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(), // ใช้ History API สำหรับ URL ที่สะอาด
  routes,
})

export default router
