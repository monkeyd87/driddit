import Card from '../components/Card'
import { useEffect,useState,useRef} from 'react';
import { useParams } from 'react-router-dom';
function Home(){
    const {query} = useParams()
    const afterEl = useRef('');
    const [subreddit, setSubreddit] = useState(query?`https://www.reddit.com/search.json?q=${query}&include_over_18=1&after=`:'https://www.reddit.com/user/digitalmonkey87/m/redditApp.json?after=')
    const [data, setData] = useState([])


  
    const load = (reddit,afterElement)=>{
      fetch(reddit+afterElement)
      .then(res=>res.json())
      .then(res=>{
        const {after,children} = res.data
        setData(prev=>[...prev,...children])
        afterEl.current = after

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

          
          
       
      }
    }
    
    const handleQuery =(query)=>{
      afterEl.current = ''
      setData([])
      setSubreddit(`https://www.reddit.com/search.json?q=${query}&include_over_18=1&after=`)
    } 
  
    useEffect(()=>{
      load(subreddit,afterEl.current)
  
      window.addEventListener('scroll',handleScroll)
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        console.log('unmounted')
      };
      
    },[subreddit])

    return(
        <div className='d-flex align-items-center  flex-column containerEl align-items-even' style={{backgroundColor:'black',height:'100%',marginTop:'50px'}}>
        {data.filter(data=>data.data.post_hint === 'image').map((data,index)=>{
          return <Card key={data.data.url+`${index}`}src={data.data.url} text={data.data.title} author={data.data.author} header={data.data.subreddit_name_prefixed} thumbnail={data.data.thumbnail}/>
        })}
      </div>
    )
}

export default Home