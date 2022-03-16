import { React, Fragment, useEffect, useState } from "react"
import '../../styles/login.scss'
import { Button, Image } from 'react-bootstrap'
import Title from "../../components/Title"
import { setPlayerName } from '../../contexts/GameContext'

const IndexScreen = () => {

    const [username, setUsername] = useState('')

    useEffect(() => {
        document.title = 'Gallows Game'
    })

    function enterKey(e) {
        let key = e.code
        if (key === 'Enter') {
            document.getElementById('username').click();
        }
    }

    return (
        <Fragment>
            <div className="title">
                <Title />
            </div>
            <div className="start">
                <label>Username:</label>
                <input value={username} placeholder='Insert your username here' onChange={(e) => { setUsername(e.target.value) }} onKeyUp={e => enterKey(e)} />
                <Button id='username' disabled={!username.trim()} variant="success" onClick={() => setPlayerName(username)} >
                    START
                </Button>
            </div>
        </Fragment>
    )
}

export default IndexScreen