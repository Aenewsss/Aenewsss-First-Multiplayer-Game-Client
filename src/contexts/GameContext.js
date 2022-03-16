import React, { useEffect, useReducer } from "react"
import io from 'socket.io-client'

const socket = io('http://localhost:4000', {
    autoConnect: false
})

const GameContext = React.createContext()

const reducer = (state, action) => {
    switch (action.type) {
        case 'CONNECTED':
            return {
                ...state,
                isConnected: action.payload
            }
        case 'PLAYERS':
            return {
                ...state,
                players: action.payload
            }
        case 'PLAYER':
            return {
                ...state,
                player: action.payload
            }
        case 'ROOMS':
            return {
                ...state,
                rooms: action.payload
            }
        case 'ROOM':
            return {
                ...state,
                room: state.rooms[state.players[action.payload].room]
            }
        case 'ADD_GLOBAL_MESSAGE':
            return {
                ...state,
                globalMessages: [...state.globalMessages, action.payload]
            }
        case 'ADD_PRIVATE_MESSAGE':
            return {
                ...state,
                privateMessages: [...state.privateMessages, action.payload]
            }
        case 'MATCH':
            return {
                ...state,
                match: action.payload
            }
        default:
            return state
    }
}

const initialState = {
    isConnected: false,
    player: {},
    room: {},
    rooms: {},
    players: {},
    globalMessages: [],
    privateMessages: [],
    match: {},
}

const GameProvider = (props) => {
    const [state, dispatch] = useReducer(reducer, initialState)

    useEffect(() => {
        socket.on('connect', () => {
            dispatch({ type: 'CONNECTED', payload: true })
        });
        socket.on('disconnect', () => {
            dispatch({ type: 'CONNECTED', payload: false })
        });
        socket.on('PlayersRefresh', (players) => {
            dispatch({ type: 'PLAYERS', payload: players })
            dispatch({ type: 'PLAYER', payload: players[socket.id] })
        });
        socket.on('receiveGlobalMessage', (player, message) => {
            dispatch({ type: 'ADD_GLOBAL_MESSAGE', payload: [player, message] })
        });
        socket.on('receivePrivateMessage', (player, message, match) => {
            dispatch({ type: 'ADD_PRIVATE_MESSAGE', payload: [match, player, message] })
        });
        socket.on('roomsRefresh', (rooms) => {
            dispatch({ type: 'ROOMS', payload: rooms })
            dispatch({ type: 'ROOM', payload: socket.id })
        });
        socket.on('matchRefresh', (match) => {
            console.log('context', match)
            if (match !== null && (match.status == 'END' || match.start == 'LEAVE')) match = null
            dispatch({ type: 'MATCH', payload: match })
        });
        socket.on('removeChatMessages', (match) => {
            console.log(match)
            dispatch({ type: 'REMOVE_CHAT_MESSAGES', payload: match })
        })
        socket.open()
    }, [])

    return (
        <GameContext.Provider value={state}>
            {props.children}
        </GameContext.Provider>
    )
}

const sendGlobalMessage = (message) => { socket.emit('sendGlobalMessage', message) }

const sendPrivateMessage = (message) => { socket.emit('sendPrivateMessage', message) }

const createRoom = () => { socket.emit('createRoom') }

const leaveRoom = () => { socket.emit('leaveRoom') }

const joinRoom = (roomId) => { socket.emit('joinRoom', roomId) }

const startMatch = (roomId) => { socket.emit('startMatch', roomId) }

const toScore = (roomId) => { socket.emit('toScore', roomId) }

const wrongButton = (number) => { number=Number(number); socket.emit('wrongButton', number) }

const setPlayerName = (username) => { socket.emit('setPlayerName', username) }

const setStart = (roomId) => { socket.emit('setStart', roomId) }

const setStop = (roomId,values) => { socket.emit('setStop', roomId, values) }

const setPreStop = (roomId,values) => { socket.emit('setPreStop', roomId, values) }

const sendPoints = (roomId, values, type) => { socket.emit('sendPoints', roomId, values, type)}

const playAgain = (roomId) => { socket.emit('playAgain', roomId)}

export {
    GameContext,
    GameProvider,
    sendGlobalMessage,
    sendPrivateMessage,
    createRoom,
    leaveRoom,
    joinRoom,
    startMatch,
    toScore,
    wrongButton,
    setPlayerName,
    setStart,
    setStop,
    setPreStop,
    sendPoints,
    playAgain
}
