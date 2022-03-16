import { Fragment, React, useState } from 'react'
import { Button } from 'react-bootstrap'
import '../../styles/privateChat.scss'

const PrivateChat = (props) => {

    const [privateMessageToSend, setPrivateMessageToSend] = useState('')

    const { privateMessages, player, sendPrivateMessage, match } = props

    if (privateMessages && privateMessages.length) {
        if (document.getElementById('chat-messages') !== null) {
            document.getElementById('chat-messages').scrollTo(0, document.getElementById('chat-messages').scrollHeight)
            setTimeout(() => {
                document.getElementById('chat-messages').scrollTo(0, document.getElementById('chat-messages').scrollHeight)
            }, 1);
        }
    }

    function enterKey(e) {
        let key = e.code
        if (key === 'Enter') {
            document.getElementById('sendMessage').click();
        }
    }

    return (
        <Fragment>
            {
                match &&
                <div className='Chat' style={{width: '100%'}}>
                    <h1>Room Chat</h1>
                    <div className='chat-messages' id='chat-messages'>
                        {
                            privateMessages.map(message =>
                                message[1] == player.room &&
                                <div className='messages'>
                                    {
                                        message[2] == 'null'
                                            ?
                                            <span className='alerts'>{message[0]}</span>
                                            :
                                            message[2] == player.name
                                                ?
                                                <div className='sendPlayer'>
                                                    <span>{message[0]}</span>
                                                </div>
                                                :
                                                <div className='receivePlayer'>
                                                    <span className='player-name'>{message[2]}</span>
                                                    <span>{message[0]}</span>
                                                </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className='send-message'>
                        <input className='form-control' id='input' type="text" placeholder='Insert your message' value={privateMessageToSend} onKeyUp={e => enterKey(e)} onChange={(e) => setPrivateMessageToSend(e.target.value)} />
                        <Button variant='secondary' id='sendMessage' disabled={!privateMessageToSend.trim()} onClick={() => {sendPrivateMessage(privateMessageToSend);setPrivateMessageToSend('')}} >{'>'}</Button>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default PrivateChat;    