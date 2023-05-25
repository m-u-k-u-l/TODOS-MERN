import './App.css';
import Home from './components/todos/Home';
import TodoView from './components/todos/TodoView';
import TodoEdit from './components/todos/TodoEdit';
import About from './components/about/About';
import AppDescription from './components/app-description/AppDescription';
import Layout from './components/layout/Layout';
import NotFoundPage from './components/notFoundPage/NotFoundPage';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path='/' element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/app-desc" element={<AppDescription />} />
          <Route path="/edit/:id" element={<TodoEdit />} />
          <Route path="/view/:id" element={<TodoView />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
