import { React, Fragment, useState } from "react"
import { Button, Form, Table } from "react-bootstrap"
import '../../styles/game.scss'
import { leaveRoom, sendPrivateMessage, setStart, setStop, setPreStop, sendPoints, playAgain } from '../../contexts/GameContext'
import PrivateChat from "../../components/chat/PrivateChat"

const GameStart = (props) => {

    const { player, players, room, rooms, privateMessages, match } = props

    const [name, setName] = useState(''), [food, setFood] = useState(''),
        [car, setCar] = useState(''), [animal, setAnimal] = useState(''),
        [brand, setBrand] = useState(''), [cep, setCep] = useState(''),
        [mse, setMse] = useState(''), [movie, setMovie] = useState('')

    const [checkedValues, setCheckedValues] = useState([])

    let playerOne, otherPlayer

    if (((players[rooms[player.room].player1] !== undefined) && (players[rooms[player.room].player2] !== undefined))) {
        otherPlayer = players[rooms[player.room].player1].name == player.name
            ? players[rooms[player.room].player2].name
            : players[rooms[player.room].player1].name
    }

    Object.keys(players).map(player => {
        if (room.player1 == player) return playerOne = player
    })

    let values = { name: name, animal: animal, food: food, car: car, cep: cep, mse: mse, brand: brand, movie: movie, }

    function handleSubmit(e) { e.preventDefault(); setStop(player.room, values) }

    if (match.start == 'prestop' && match.whoSetStop != player.id) { setPreStop(player.room, values) }

    function verifyCheckedValues(e, type) { e.preventDefault(); sendPoints(player.room, checkedValues, type); setCheckedValues([]) }

    function verifySameCheckedValues(value) {
        if (checkedValues.length === 0) setCheckedValues([...checkedValues, value])
        if (!checkedValues.includes(value)) return setCheckedValues([...checkedValues, value])
    }

    return (
        <Fragment>
            <div>
                <div className='game' id='game'>
                    <p id='show-letter'></p>
                    {
                        match.start === 0 &&
                        <div className='game-table'>
                            <form onSubmit={(e) => handleSubmit(e)}>
                                <table>
                                    <tr>
                                        <td>Nome</td>
                                        <td><input value={name} onChange={(e) => setName(e.target.value)} required /></td>
                                    </tr>
                                    <tr>
                                        <td>Animal</td>
                                        <td><input value={animal} onChange={(e) => setAnimal(e.target.value)} required /></td>
                                    </tr>
                                    <tr>
                                        <td>Comida</td>
                                        <td><input value={food} onChange={(e) => setFood(e.target.value)} required /></td>
                                    </tr>
                                    <tr>
                                        <td>CEP</td>
                                        <td><input value={cep} onChange={(e) => setCep(e.target.value)} required /></td>
                                    </tr>
                                    <tr>
                                        <td>MSE</td>
                                        <td><input value={mse} onChange={(e) => setMse(e.target.value)} required /></td>
                                    </tr>
                                    <tr>
                                        <td>CARRO</td>
                                        <td><input value={car} onChange={(e) => setCar(e.target.value)} required /></td>
                                    </tr>
                                    <tr>
                                        <td>MARCA</td>
                                        <td><input value={brand} onChange={(e) => setBrand(e.target.value)} required /></td>
                                    </tr>
                                    <tr>
                                        <td>FILME/SÉRIE</td>
                                        <td><input value={movie} onChange={(e) => setMovie(e.target.value)} required /></td>
                                    </tr>
                                </table>
                                <div style={{ textAlign: 'center' }}><Button variant='danger' type='submit'>STOP</Button></div>
                            </form>
                        </div>
                    }
                    {
                        match.start === 'stop' &&
                        <div>
                            {
                                (match.ready1 === false || match.ready2 === false) &&
                                <Fragment>
                                    <h3>Name</h3>
                                    <Form onSubmit={(e) => verifyCheckedValues(e, 'name')}>
                                        {
                                            <Fragment>
                                                <div className="responses">
                                                    <p>{match.values[room.player1].name}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player1].name} />
                                                </div>
                                                <div className="responses">
                                                    <p>{match.values[room.player2].name}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player2].name} />
                                                </div>
                                            </Fragment>
                                        }
                                        <div style={{ textAlign: 'center' }}>
                                            <Button type='submit' disabled={room.player1 === player.id ? match.ready1 : match.ready2}>SUBMIT</Button>
                                        </div>
                                    </Form>
                                </Fragment>
                            }
                            {
                                (match.next == 2 || match.next == 3) &&
                                <Fragment>
                                    <h3>Animal</h3>
                                    <Form onSubmit={(e) => verifyCheckedValues(e, 'animal')}>
                                        {
                                            <Fragment>
                                                <div className="responses">
                                                    <p>{match.values[room.player1].animal}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player1].animal} />
                                                </div>
                                                <div className="responses">
                                                    <p>{match.values[room.player2].animal}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player2].animal} />
                                                </div>
                                            </Fragment>
                                        }
                                        <div style={{ textAlign: 'center' }}>
                                            <Button type='submit' disabled={room.player1 === player.id ? (match.ready1 === 'animal') : (match.ready2 === 'animal')}>SUBMIT</Button>
                                        </div>
                                    </Form>
                                </Fragment>
                            }
                            {
                                (match.next == 4 || match.next == 5) &&
                                <Fragment>
                                    <h3>Food</h3>
                                    <Form onSubmit={(e) => verifyCheckedValues(e, 'food')}>
                                        {
                                            <Fragment>
                                                <div className="responses">
                                                    <p>{match.values[room.player1].food}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player1].food} />
                                                </div>
                                                <div className="responses">
                                                    <p>{match.values[room.player2].food}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player2].food} />
                                                </div>
                                            </Fragment>
                                        }
                                        <div style={{ textAlign: 'center' }}>
                                            <Button type='submit' disabled={room.player1 === player.id ? (match.ready1 === 'food') : (match.ready2 === 'food')}>SUBMIT</Button>
                                        </div>
                                    </Form>
                                </Fragment>
                            }
                            {
                                (match.next == 6 || match.next == 7) &&
                                <Fragment>
                                    <h3>Car</h3>
                                    <Form onSubmit={(e) => verifyCheckedValues(e, 'car')}>
                                        {
                                            <Fragment>
                                                <div className="responses">
                                                    <p>{match.values[room.player1].car}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player1].car} />
                                                </div>
                                                <div className="responses">
                                                    <p>{match.values[room.player2].car}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player2].car} />
                                                </div>
                                            </Fragment>
                                        }
                                        <div style={{ textAlign: 'center' }}>
                                            <Button type='submit' disabled={room.player1 === player.id ? (match.ready1 === 'car') : (match.ready2 === 'car')}>SUBMIT</Button>
                                        </div>
                                    </Form>
                                </Fragment>
                            }
                            {
                                (match.next == 8 || match.next == 9) &&
                                <Fragment>
                                    <h3>CEP</h3>
                                    <Form onSubmit={(e) => verifyCheckedValues(e, 'cep')}>
                                        {
                                            <Fragment>
                                                <div className="responses">
                                                    <p>{match.values[room.player1].cep}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player1].cep} />
                                                </div>
                                                <div className="responses">
                                                    <p>{match.values[room.player2].cep}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player2].cep} />
                                                </div>
                                            </Fragment>
                                        }
                                        <div style={{ textAlign: 'center' }}>
                                            <Button type='submit' disabled={room.player1 === player.id ? (match.ready1 === 'cep') : (match.ready2 === 'cep')}>SUBMIT</Button>
                                        </div>
                                    </Form>
                                </Fragment>
                            }
                            {
                                (match.next == 10 || match.next == 11) &&
                                <Fragment>
                                    <h3>MSE</h3>
                                    <Form onSubmit={(e) => verifyCheckedValues(e, 'mse')}>
                                        {
                                            <Fragment>
                                                <div className="responses">
                                                    <p>{match.values[room.player1].mse}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player1].mse} />
                                                </div>
                                                <div className="responses">
                                                    <p>{match.values[room.player2].mse}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player2].mse} />
                                                </div>
                                            </Fragment>
                                        }
                                        <div style={{ textAlign: 'center' }}>
                                            <Button type='submit' disabled={room.player1 === player.id ? (match.ready1 === 'mse') : (match.ready2 === 'mse')}>SUBMIT</Button>
                                        </div>
                                    </Form>
                                </Fragment>
                            }
                            {
                                (match.next == 12 || match.next == 13) &&
                                <Fragment>
                                    <h3>Brand</h3>
                                    <Form onSubmit={(e) => verifyCheckedValues(e, 'brand')}>
                                        {
                                            <Fragment>
                                                <div className="responses">
                                                    <p>{match.values[room.player1].brand}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player1].brand} />
                                                </div>
                                                <div className="responses">
                                                    <p>{match.values[room.player2].brand}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player2].brand} />
                                                </div>
                                            </Fragment>
                                        }
                                        <div style={{ textAlign: 'center' }}>
                                            <Button type='submit' disabled={room.player1 === player.id ? (match.ready1 === 'brand') : (match.ready2 === 'brand')}>SUBMIT</Button>
                                        </div>
                                    </Form>
                                </Fragment>
                            }
                            {
                                (match.next == 14 || match.next == 15) &&
                                <Fragment>
                                    <h3>Movie</h3>
                                    <Form onSubmit={(e) => verifyCheckedValues(e, 'movie')}>
                                        {
                                            <Fragment>
                                                <div className="responses">
                                                    <p>{match.values[room.player1].movie}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player1].movie} />
                                                </div>
                                                <div className="responses">
                                                    <p>{match.values[room.player2].movie}</p>
                                                    <input type='checkbox' onChange={(e) => verifySameCheckedValues(e.target.value)} value={match.values[room.player2].movie} />
                                                </div>
                                            </Fragment>
                                        }
                                        <div style={{ textAlign: 'center' }}>
                                            <Button type='submit' disabled={room.player1 === player.id ? (match.ready1 === 'movie') : (match.ready2 === 'movie')}>SUBMIT</Button>
                                        </div>
                                    </Form>
                                </Fragment>
                            }
                            {
                                (match.next == 16 || match.next == 17) &&
                                <div>
                                    <Button disabled={room.player1 === player.id ? (match.ready1 === 'again') : (match.ready2 === 'again')} variant='success' onClick={() => playAgain(player.room)}>Play again?</Button>
                                </div>
                            }
                        </div>
                    }
                </div>
                {
                    match.start != 'LEAVE' &&
                    <div className="game-chat-score">
                        <PrivateChat
                            sendPrivateMessage={sendPrivateMessage}
                            privateMessages={privateMessages}
                            player={player}
                            match={match}
                        />
                        <h4>Current score:</h4>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Player</th>
                                    <th id='second-head-table'>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    player.name == players[playerOne].name
                                        ?
                                        <Fragment>
                                            <tr>
                                                <td>You</td>
                                                <td align="center">{match.score1}</td>
                                            </tr>
                                            <tr>
                                                <td>{otherPlayer}</td>
                                                <td align="center">{match.score2}</td>
                                            </tr>
                                        </Fragment>
                                        :
                                        <Fragment>
                                            <tr>
                                                <td>You</td>
                                                <td align="center">{match.score2}</td>
                                            </tr>
                                            <tr>
                                                <td>{otherPlayer}</td>
                                                <td align="center">{match.score1}</td>
                                            </tr>
                                        </Fragment>
                                }
                            </tbody>
                        </Table>
                    </div>
                }
                <div className="leave-button">
                    <Button id='leave-game' variant='danger' onClick={leaveRoom} hidden={match.initial === 'END'}>Leave Match</Button>
                </div>
            </div >
            {
                match.start == 'END' &&
                <Fragment>
                    {
                        match.score1 >= 120 &&
                        <div className="match-end">
                            <span>{players[room.player1].name} WINS!</span>
                            <Button variant='danger' onClick={leaveRoom}>Leave Match</Button>
                            <Button variant='success' onClick={() => playAgain(player.room)}>or Play again?</Button>
                        </div>
                    }
                    {
                        match.score2 >= 120 &&
                        <div className="match-end">
                            <p>{players[room.player2].name} WINS!</p>
                            <Button variant='danger' onClick={leaveRoom}>Leave Match</Button>
                            <Button variant='success' onClick={() => playAgain(player.room)}>or Play again?</Button>
                        </div>
                    }
                </Fragment>
            }

            {
                match.start == 'LEAVE' &&
                <Fragment>
                    {
                        match.score1 > match.score2 
                            ?
                            < div className="match-end">
                                <span>The other player left</span>
                                <Button variant='danger' onClick={leaveRoom}>Leave Match</Button>
                            </div>
                            :
                            <div className="match-end">
                                <span>The other player left</span>
                                <Button variant='danger' onClick={leaveRoom}>Leave Match</Button>
                            </div>
                    }
                </Fragment>
            }
        </Fragment>

    )
}

export default GameStart