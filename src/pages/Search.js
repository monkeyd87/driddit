
import Card from '../components/Card'
import { useEffect,useState,useRef,} from 'react';

import { useParams,useOutletContext } from 'react-router-dom';

function Search(){
    const isLoading = useRef(false)
    const {query} = useParams()
    const afterEl = useRef('');
    const [post, setPost] = useState([])
    const isNSFW = useOutletContext()


  
    const load = async(afterElement)=>{
      isLoading.current = true
      console.log('loading')
      try{
        const response = await fetch(`https://www.reddit.com/search.json?q=${query}${isNSFW?'&include_over_18=1':''}&after=${afterElement}`)
        const data = await response.json()
        const {after, children} = data.data
        
        setPost(prev=>[...prev,...children])
        afterEl.current = after


      }catch{
        console.log('error loading data')
      }
        
      
     isLoading.current= false
    }

    const  handleScroll=()=> {
      if (
        window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 3000 &&
        !isLoading.current
      ) {
        // Load more posts when the user scrolls near the bottom
        load(afterEl.current);
      }
    };
    
    
   
   
    
    useEffect(()=>{
        setPost([])
        afterEl.current =''
        load(afterEl.current)
  
      window.addEventListener('scroll',handleScroll)
      console.log('mounted')
  
      return () => {
        window.removeEventListener('scroll', handleScroll);
        console.log('unmounted')
      };
      
    },[isNSFW,query])

    return(
        <div className='d-flex align-items-center  flex-column containerEl' style={{backgroundColor:'black',height:'100%',marginTop:'50px'}}>
        {post.filter(data=>data.data.post_hint === 'image').map((data,index)=>{
          return <Card key={data.data.url+`${index}`}src={data.data.url} author={data.data.author} thumbnail={data.data.thumbnail} text={data.data.title} header={data.data.subreddit_name_prefixed}/>
        })}
      </div>
    )
}

export default Search