import store from '/@/store'
import {createRouter, createWebHistory} from 'vue-router'
import {ElMessage} from 'element-plus'
import Portal from '/@/layout/Portal.vue'
import Index from '/@/views/Index.vue'
import Login from '/@/views/Login.vue'
import Register from '/@/views/Register.vue'
import CourseList from '/@/views/Course-List.vue'
import Admin from '/@/layout/Admin.vue'
import AdminIndex from '/@/views/admin/Index.vue'
import NotFound from '/@/views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Portal',
        component: Portal,
        children: [
            {
                path: '/',
                name: 'Index',
                component: Index
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/courses',
                name: 'Course-List',
                component: CourseList
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '/',
                name: 'Admin-Index',
                component: AdminIndex
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFound
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth) {
        if (!store.state.auth) {
            router.push({name: 'Login'})
            return false
        }
        if (to.meta.role !== store.state.auth.role) {
            ElMessage.error("没有访问权限")
        }
    }
})

export default router