import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShareFromSquare,faComment,faHeart,faPaperPlane } from '@fortawesome/free-regular-svg-icons'
import { faRepeat } from '@fortawesome/free-solid-svg-icons'
import { Overlay, OverlayTrigger, Tooltip } from 'react-bootstrap'

export default function Share(){
    return(
        <div className='d-flex  justify-content-between w-25'>
            <OverlayTrigger
            placement='top'
            overlay={<Tooltip>Share</Tooltip>}
            >
                <FontAwesomeIcon size='lg' icon={faPaperPlane}/>
            </OverlayTrigger>

            <OverlayTrigger
            placement='top'
            overlay={<Tooltip>Reply</Tooltip>}
            >
                <FontAwesomeIcon size='lg' icon={faComment}/>
            </OverlayTrigger>

            <OverlayTrigger
            placement='top'
            overlay={<Tooltip>Reblog</Tooltip>}
            >
                <FontAwesomeIcon size='lg' icon={faRepeat}/>

            </OverlayTrigger>

            <OverlayTrigger
            placement='top'
            overlay={<Tooltip>Like</Tooltip>}
            >
                <FontAwesomeIcon size='lg' icon={faHeart}/>

            </OverlayTrigger>

        </div>
    )
}