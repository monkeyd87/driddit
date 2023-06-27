import {Card,Ratio} from 'react-bootstrap'
import { useEffect,useState } from 'react'
import Share from './Share'

function CardEl({src,text,header,post_hint,author,thumbnail}){
   
    
    return(


        <div className='  d-flex  justify-content-center col-sm-12 col-lg-5 m-1' style={{height:'max-content',position:'relative'}}>
            <div className='img-container  rounded 'style={{height:'80px',width:'80px',position:'sticky',top:'100px',margin:'10px',overflow:'hidden'}}>
                <img src={thumbnail} style={{height:'100%', width:'100%'}}/>

            </div>

            <Card className=' col-sm-12 m-4 border border-dark' bg='dark' text="light" style={{ width: '30rem' }}> 
                <Card.Header >{header}</Card.Header>
                <Card.Img src={src} loading=""/>
                <Card.Body>
                    <div className=''>
                        <Card.Text>
                            {text}
                        </Card.Text>
                    </div>

                </Card.Body>
                <Card.Footer className='d-flex justify-content-between'>
                    <div className=''>
                    <a target='_blank' href={`https://www.reddit.com/u/${author}`}>
                        <p>u/{author}</p>
                    </a>
                    </div>
                    <Share/>
                </Card.Footer>
            </Card>
        </div>
    )
}


export default CardEl