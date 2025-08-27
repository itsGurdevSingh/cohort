import React from 'react'
import './Sidebar.css'

const Sidebar = () => {
  return (
    <div className="sidebar">
        
        <div className="heading">Chats</div>

        <ul className='chats-wraper'>
            <li className='chats'>chat 1</li>
            <li className='chats'>chat 2</li>
            <li className='chats'>chat 3</li>
            
        </ul>
    </div>
  )
}

export default Sidebar