import { React } from 'react'
import '../styles/playerList.scss'

const PlayerList = (props) => {
    return (
        <div className='player-list'>
            <h4>You are connected as:<span>{props.player.name}</span></h4>
            <br />
            <h5>List of players connected:</h5>
            <h6>
                {
                    Object.keys(props.players).map((key) => (
                        props.player.name == props.players[key].name
                            ?
                            <div key={'none'}></div>
                            :
                            <div key={key}>{props.players[key].name}</div>
                    ))
                }
            </h6>
        </div>
    )
}

export default PlayerList;    