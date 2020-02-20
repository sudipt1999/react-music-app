import React from 'react'
import './music-player.styles.scss'
import MusicImage from '../../assets/musicimg.jpg'
import {ReactComponent as PlayButton} from '../../assets/play.svg'
import {ReactComponent as PauseButton} from '../../assets/pause.svg'
import {ReactComponent as StopButton} from '../../assets/stop.svg'

const link = "http://dl.tak3da.ir/download/1395/03/Marshmello%20-%20Alone%20[320].mp3"
class MusicPlayer extends React.Component {
    state = {
        play: false,
        stop: true,
        pause: false,
        progress: 0,
        audio: new Audio(link),
        duration: 0,
        time: 0,
        volume: 1.0
    }

    componentDidMount() {
        const {audio} = this.state
        audio.addEventListener('loadeddata', () => {
            this.setState({
                duration: audio.duration
            })
          })
        audio.addEventListener('timeupdate', ()=>{
            this.setState({
                time: audio.currentTime
            })
        })
    }
    

    onPlayButtonClicked = () => {
        const {audio} = this.state
        audio.play()
    }
    
    onPauseButtonClicked = () => {
        const {audio} = this.state
        audio.pause()
    }

    onStopButtonClicked = () => {
        const {audio} = this.state
        audio.currentTime = 0
        audio.pause()
    }

    onProgressChange = (e) => {
        const {audio, duration} = this.state
        audio.currentTime = duration * (e.target.value/100)
    }

    onVolumeChange = (e) => {
       
        const {audio} = this.state
        //alert(e.target.value, audio.volume)
        console.log("VOLUME "+(e.target.value/100))
        audio.volume = (e.target.value/100)
    }
    render(){
        let {duration,time, audio} = this.state
        console.log("",audio.volume)
        let progress = (time/duration)*100; 
        if(!progress){
            progress = 0;
        }
        //console.log(progress)
       // console.log(this.state.duration, " ", this.state.audio.currentTime," ",time)
        return (
            <div className="audio__player__div">
                <img className="audio__player__cover"  alt="music" src={MusicImage} />
                <div className="audio__player__controls">
                    <div className="audio__player__buttons">
                        <PlayButton className="audio__player__button play" onClick={this.onPlayButtonClicked} />
                        <StopButton className="audio__player__button stop" onClick={this.onStopButtonClicked} />
                        <PauseButton className="audio__player__button pause" onClick={this.onPauseButtonClicked} /> 
                    </div>
                    <div className="audio__player__progress">
                        <input name="progress" className="audio__player__progressbar" type="range" min={0} max={100} onChange={this.onProgressChange}value={progress} />
                        {/* <input name="volume" className="audio__player__progressbar" type="range" min={0} max={100} onChange={this.onVolumeChange}value={audio.volume*100}  /> */}
                    </div>
                </div>               
            </div>
        )
    }
}

export default MusicPlayer