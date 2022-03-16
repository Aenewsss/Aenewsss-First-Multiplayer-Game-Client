import { Fragment, React, useState } from 'react'
import { Button } from 'react-bootstrap'
import '../../styles/globalChat.scss'

const GlobalChat = (props) => {

    const [globalMessageToSend, setGlobalMessageToSend] = useState('')

    const { globalMessages, player, sendGlobalMessage, match } = props

    if (globalMessages && globalMessages.length) {
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
            setGlobalMessageToSend('');
        }
    }

    return (
        <Fragment>
            {
                !match &&
                <div className='Chat'>
                    <h1>Global Chat</h1>
                    <div className='chat-messages' id='chat-messages'>
                        {
                            globalMessages.map(message =>
                                <div className='messages'>
                                    {
                                        message[1] == 'connected' || message[1] == 'leave'
                                            ?
                                            <span className='alerts'>{message[0]} {message[1]}</span>
                                            :
                                            message[0] == player.name
                                                ?
                                                <div className='sendPlayer'>
                                                    <span> {message[1]} </span>
                                                </div>
                                                :
                                                <div className='receivePlayer'>
                                                    <span className='player-name'>{message[0]}</span>
                                                    <span>{message[1]}</span>
                                                </div>
                                    }
                                </div>
                            )
                        }
                    </div>
                    <div className='send-message'>
                        <input className='form-control' id='input' type="text" placeholder='Insert your message' value={globalMessageToSend} onKeyUp={e => enterKey(e)} onChange={(e) => setGlobalMessageToSend(e.target.value)} />
                        <Button variant='secondary' id='sendMessage' disabled={!globalMessageToSend.trim()} onClick={() => { sendGlobalMessage(globalMessageToSend); setGlobalMessageToSend('') }} >Send</Button>
                    </div>
                </div>
            }
        </Fragment>
    )
}

export default GlobalChat;    