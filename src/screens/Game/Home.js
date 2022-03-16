import { React, useEffect } from 'react'
import Home from '../../components/Home'
import { GameProvider } from '../../contexts/GameContext';
import '../../stylesheets/index.css'

const GameScreen = () => {
    useEffect(() => {
        document.title = 'Game'
    })

    return (
        <GameProvider>
            <Home />
        </GameProvider>
    )
}

export default GameScreen;