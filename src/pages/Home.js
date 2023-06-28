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
          const response = await fetch(`https://www.reddit.com/user/digitalmonkey87/m/${!isNSFW?'inspiration':'redditApp'}.json?after=${afterElement}` )
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
    <div className='d-flex align-items-center col-sm-1 flex-column containerEl align-items-even' style={{ marginTop: '50px' }}>
      
      {post.filter(data => data.data.post_hint === 'image').map((data, index) => (
        <Card
          key={data.data.url + `${index}`}
          src={data.data.url}
          text={data.data.title}
          author={data.data.author}
          header={data.data.subreddit_name_prefixed}
          thumbnail={data.data.thumbnail}
        />
      ))}
    </div>
  );
}

export default Home;