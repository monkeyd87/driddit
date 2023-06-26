
import Card from '../components/Card'
import { useEffect,useState,useRef} from 'react';
import { useParams } from 'react-router-dom';

function Search(){
    const {query} = useParams()
    const afterEl = useRef('');
    const [data, setData] = useState([])


  
    const load = (afterElement)=>{
      fetch(`https://www.reddit.com/search.json?q=${query}&include_over_18=1&after=`+afterElement)
      .then(res=>res.json())
      .then(res=>{
        const {after,children} = res.data
        setData(prev=>[...prev,...children])
        afterEl.current = after
        console.log(query)
        
      })
     
    }

    const  handleScroll=()=> {
      const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      const scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      const clientHeight = document.documentElement.clientHeight || window.innerHeight;
    
      if (scrollTop + clientHeight >= scrollHeight) {
        // User has reached the bottom of the page
        // Load the next page
  
        load(afterEl.current)

          
          
       
      }
    }
    
   
   
    
    useEffect(()=>{
        setData([])
        afterEl.current =''
        load(afterEl.current)
  
      window.addEventListener('scroll',handleScroll)
      console.log('mounted')
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        console.log('unmounted')
      };
      
    },[query])

    return(
        <div className='d-flex align-items-center  flex-column containerEl' style={{backgroundColor:'black',height:'100%',marginTop:'50px'}}>
        {data.filter(data=>data.data.post_hint === 'image').map((data,index)=>{
          return <Card key={data.data.url+`${index}`}src={data.data.url} author={data.data.author} thumbnail={data.data.thumbnail} text={data.data.title} header={data.data.subreddit_name_prefixed}/>
        })}
      </div>
    )
}

export default Search