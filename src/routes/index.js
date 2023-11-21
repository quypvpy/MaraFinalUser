import { CatePage, LoginPage, RegisterPage } from "../features/Courses"
import { CourseDetail } from "../features/Courses/pages/CourseDetail"
import { CourseList } from "../features/Courses/pages/CourseList"
import { StudentPage } from "../features/Courses/pages/StudentPage"

// public routes
const publicRoutes = [

    { path: '/', component: CourseList },
    { path: '/updateCourse?/*', component: CourseDetail },
    { path: '/categories?/*', component: CatePage },
    { path: '/dang-nhap', component: LoginPage },
    { path: '/dang-ki', component: RegisterPage },
    { path: '/student', component: StudentPage },

    
 
]
export { publicRoutes }