import movies from 'videos'

import { useRef, useEffect, useState } from 'react'
import { LinearCopy } from "gl-react";
import { Surface } from "gl-react-dom";
import GLTransition from "react-gl-transition";
import useAnimationFrame from 'use-animation-frame';
import GLTransitions from "gl-transitions";
import images from "./images";

const Slideshow = ({ slides, duration }) => {
  const fromRef = useRef()
  const toRef = useRef()

  const [videoTime, setVideoTime] = useState(0)
  const [videoDuration, setVideoDuration] = useState(0)
  useAnimationFrame(() => {
    setVideoTime(Math.floor(fromRef.current.currentTime * 1000))
    setVideoDuration(Math.floor(fromRef.current.duration * 1000))
  })

  const [videoKeyTuple, setVideoKeyTuple] = useState(["0", "1"])
  useEffect(() => {
    if(fromRef.current.currentTime === fromRef.current.duration) {
      setVideoKeyTuple(["1", "2"])
    }
  }, [videoTime])

  useEffect(() => {
    fromRef.current.play()
    fromRef.current.currentTime = 586 
    if(videoKeyTuple[0] === "0") {
    }
    toRef.current.play()
  }, [])

  useEffect(() => {
    if(videoKeyTuple[0] === "1") {
      fromRef.current.play()
      fromRef.current.currentTime = 4
      toRef.current.play()
    }
  }, [videoKeyTuple, fromRef.current])

  const transitionStartTime = videoDuration >= duration ? videoDuration - duration : 0
  
  // console.log('videoDuration')
  // console.log(videoDuration)
  // console.log('transitionStartTime')
  // console.log(transitionStartTime)
  // const index = Math.floor(time / duration);
  const from = <video key={videoKeyTuple[0]} ref={fromRef} controls autoPlay muted src={movies.videos[videoKeyTuple[0]].sources[0]}></video>
  const to = <video key={videoKeyTuple[1]} ref={toRef} controls autoPlay muted src={movies.videos[videoKeyTuple[1] === "1" ? videoKeyTuple[1] : 0  ].sources[0]}></video>
  const transition = GLTransitions[0];
  const progress = (videoTime > transitionStartTime ? videoTime - transitionStartTime : 0) / duration;
  // console.log('progress')
  // console.log(progress)
  return <GLTransition
    from={from}
    to={to}
    progress={progress}
    transition={transition}
  />
};

export default () => (
  <Surface width={600} height={400}>
    <Slideshow slides={images} duration={4000} />
  </Surface>
);


// function Counter() {
//   const [time, setTime] = useState(0);
//   useAnimationFrame(e => setTime(e.time), []);
//   return <div>Running for:<br />{time.toFixed(3) * 1000}ms</div>;
// };



// function Counter({updateInterval = 1000 / 25}) {
//   const fromRef = useRef()
//   const toRef = useRef()
//   const intervalRef = useRef(0)

//   const From = <video ref={fromRef} controls autoPlay muted src={movies.videos[0].sources[0]}></video>
//   const To = <video ref={toRef} controls autoPlay muted src={movies.videos[1].sources[0]}></video>

//   const [videoTime, setVideoTime] = useState(0)
//   const [videoDuration, setVideoDuration] = useState(0)
//   const handle = useAnimationFrame(({time, delta}) => {
//     intervalRef.current += Math.floor(delta * 1000)
//     // console.log(intervalRef)

//     setVideoTime(fromRef.current.currentTime)
//     setVideoDuration(fromRef.current.duration)
//     if(intervalRef.current >= updateInterval) {
//       intervalRef.current = 0
//       // setVideoTime(fromRef.current.currentTime)
//       // setVideoDuration(fromRef.current.duration)
//     }
//   }, [])
//   return (
//     <div>
//       <div>Running for:<br />{videoTime}ms</div>;
//       {From}
//       {To}
//     </div>
//   )
// };