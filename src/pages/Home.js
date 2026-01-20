import Card from '../components/Card'
import { useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useOutletContext } from 'react-router-dom';

function Home() {
  const afterEl = useRef('');
  const isloading = useRef(false)
  const [post, setPost] = useState([]);
  const isNSFW = useOutletContext()
  const  [count , setCount] = useState(0)

  const load = async(afterElement) => {
    isloading.current= true
    

        try{
          const response = await fetch(`/api?after=`+afterEl.current )
          const data = await response.json()
          
          const { after, children } = data.data;
          afterEl.current = after;
          console.log(afterEl.current)
          
          setPost(prev => [...prev, ...children]);
        
    
        }catch{
          console.log('error fetching formData')
        }
        setCount(prev=>prev+1)
        isloading.current = false
        console.log(count)

      

  };

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 3000 &&
      !isloading.current
    ) {
      // Load more posts when the user scrolls near the bottom
      load(afterEl.current);
    }
  };

  

  useEffect(() => {
    setPost([])
    afterEl.current = ''
    load( afterEl.current);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      console.log('unmounted');
    };
  }, [isNSFW]);

  return (
    <div className='d-flex align-items-center  flex-column containerEl' style={{backgroundColor:'black',height:'100%',marginTop:'50px'}}>
    {post.filter(data=>data.data.post_hint === 'image').map((data,index)=>{
      return <Card key={data.data.url+`${index}`}src={data.data.url} author={data.data.author} thumbnail={data.data.thumbnail} text={data.data.title} header={data.data.subreddit_name_prefixed}/>
    })}
  </div>
  );
}

export default Home;