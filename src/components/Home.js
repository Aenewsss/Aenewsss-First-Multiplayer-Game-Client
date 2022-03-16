import { React, useContext, Fragment } from 'react'
import { GameContext, sendGlobalMessage } from '../contexts/GameContext'
import GlobalChat from './chat/GlobalChat'
import PlayerList from './PlayerList'
import Title from './Title'
import Room from './Room'
import GameStart from '../screens/Game/GameScreen'
import LoginScreen from '../screens/Index/LoginScreen'
import '../stylesheets/index.scss'

const Game = () => {
    const { isConnected,players,globalMessages,
            privateMessages, player, match,rooms,room
          } = useContext(GameContext)

    console.log(match)

    return (
        <Fragment>
            {!isConnected && <div>Conectando</div>}
            {
                match && match.status && player.room ?
                    <GameStart player={player} players={players} match={match} rooms={rooms} room={room} privateMessages={privateMessages} />
                    :
                    <div>
                        <Title />
                        <hr />
                        <div className='main'>
                            <PlayerList players={players} player={player} />
                            <GlobalChat sendGlobalMessage={sendGlobalMessage} globalMessages={globalMessages} player={player} />
                            <Room />
                        </div>
                    </div>
            }
        </Fragment>
    )
}

export default Game;