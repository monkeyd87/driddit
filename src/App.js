import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import NavBar from './components/NavBar';
import Card from './components/Card'
import Root from './components/Root'
import Home from './pages/Home'
import Search from './pages/Search'
import Live from './pages/Live'
import Error from './pages/Error'
import { useEffect,useState,useRef} from 'react';
import { RouterProvider, createBrowserRouter, createRoutesFromElements, Route, createHashRouter  } from 'react-router-dom';

function App() {

// adding routes


const router = createBrowserRouter(createRoutesFromElements(
  <Route path='/'element={<Root/>} errorElement={<Error/>}>
    <Route path='/' element={<Home/>}/>
    <Route path ='search/:query' element={<Search/>}/>
    <Route path='live' element={<Live/>}/>
  </Route>
))

  const afterEl = useRef('');
  const [subreddit, setSubreddit] = useState('/api')
  const [data, setData] = useState([])
  const [formData, setFormData] = useState('')
  const [count, setCount] = useState(1)

  const load = (reddit,afterElement)=>{
    fetch(reddit+afterElement)
    .then(res=>res.json())
    .then(res=>{
      const {after,children} = res.data
      setData(prev=>[...prev,...children])
      afterEl.current = after
      console.log(res,afterEl.current,subreddit)
    })
   
  }

  const  handleScroll=()=> {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
    const clientHeight = document.documentElement.clientHeight || window.innerHeight;
  
    if (scrollTop + clientHeight >= scrollHeight) {
      // User has reached the bottom of the page
      // Load the next page

      load(subreddit,afterEl.current)
      console.log('hello world')
        
        
     
    }
  }
  
  const handleQuery =(query)=>{
    afterEl.current = ''
    setData([])
    setSubreddit(`https://www.reddit.com/search.json?q=${query}&include_over_18=1&after=`)
  } 

  // useEffect(()=>{
  //   load(subreddit,afterEl.current)

  //   window.addEventListener('scroll',handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //     console.log('unmounted')
  //   };
    
  // },[subreddit])

  // useEffect(()=>{
  //   window.addEventListener('scroll',handleScroll)

  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // },[])


  
  
 
  

  return (
    <>

   

      <RouterProvider  router={router}/>

    </>
  );
}

export default App;
