import { Fragment,useContext } from "react"
import { Button } from 'react-bootstrap'
import '../styles/room.scss'
import { createRoom, leaveRoom, joinRoom, startMatch, GameContext } from '../contexts/GameContext'

const Room = () => {
    const { player, rooms, room } = useContext(GameContext)

    return (
        <Fragment>
            {
                !player.room &&
                <div className='rooms'>
                    <Button onClick={createRoom}>Create Room</Button>
                    <h3>Rooms: </h3>
                    {
                        Object.keys(rooms).map(key =>
                            <div key={`room_${key}`}>
                                {rooms[key].name}
                                {
                                    rooms[key].player1 && rooms[key].player2 
                                        ?
                                        <span className='full-room'>2/2</span>
                                        :
                                        <Button className='button-join-room' onClick={() => joinRoom(key)}>Join</Button>
                                }
                            </div>
                        )}
                </div>
            }
            {
                player.room && room &&

                <div className="existing-room">
                    {
                        rooms[player.room] && rooms[player.room].player1 && rooms[player.room].player2
                            ?
                            <div>
                                <Button variant='success' onClick={() => startMatch(rooms[player.room].player1)}>
                                    Start Game
                                </Button>
                                <Button variant='danger' className="leave-room-button"onClick={leaveRoom}>
                                    or Leave Room
                                </Button>
                            </div>
                            :
                            <div>
                                <p>Waiting other player</p>
                                <Button onClick={leaveRoom}>Leave Room</Button>
                            </div>
                    }
                </div>
            }
        </Fragment>
    )
}

export default Room