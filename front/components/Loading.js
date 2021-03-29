import React, { useEffect, useRef, useState } from "react";
import { useSpring, useTransition, animated } from "react-spring";
import { styled } from "styled-components";
// [
//     ({ style }) => <animated.div style={{ ...style }} text="a">a</animated.div>,
//     ({ style }) => <animated.div style={{ ...style }}>b</animated.div>,
//     ({ style }) => <animated.div style={{ ...style }}>c</animated.div>,
//   ]

const Loading = () => {
  const [items, setItems] = useState([
    {
      key: 1,
      text: "잠",
    },
    {
      key: 2,
      text: "시",
    },
    {
      key: 3,
      text: "만",
    },
  ]);

  const [index, setIndex] = useState(0);

  const transitions = useTransition(items[index], (item) => item.key, {
    from: { transform: "translate3d(0,30px,0)" },
    enter: { transform: "translate3d(0,40px,0)" },
    leave: { transform: "translate3d(0,100px,0)" },
    config: { duration: 40 },
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((state) => (state + 1) % items.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const Letter = styled.span`
    transform: translateY(0);
    .hh {
      transition: 1s;
      transform: translateY(100px);
      transition-delay: 0.3s;
    }
  `;

  const letterRef = useRef();
  letterRef.current.class;

  return (
    <>
      {/* {console.log(transitions[1])}
      {transitions.map(({ item, props, key }) => (
        <animated.div key={key} style={props}>
          {console.log(item)}
          <span>{item.text}</span>
        </animated.div>
      ))} */}
      <Letter ref={letterRef}>안</Letter>
      <Letter>녕</Letter>
      <Letter>하</Letter>
      <Letter>세</Letter>
    </>
  );
};

export default Loading;
