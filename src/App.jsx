
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import './components/GlobalStyles/GlobalStyles.css'
import { publicRoutes } from './routes'


function App() {

  return (
    <>
      {/* <CourseList></CourseList> */}
      <BrowserRouter>
        <Routes>
              {publicRoutes.map((route, index) => {
                const Page = route.component
                // để biến thường nó bị lỗi.. nên viết hoa.
                return <Route key={index} path={route.path} element={<Page />}></Route>
              })}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
