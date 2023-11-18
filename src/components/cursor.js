import React, {useEffect, useState} from 'react';
// import React, {Component} from 'react';


// class Cursor extends Component {
//   state = {
//     left: -50,
//     top: -50,
//   };
//   componentDidMount() {
//     document.addEventListener('mousemove', (e) => {
//       this.setState({
//         left: e.clientX,
//         top: e.clientY,
//       });
//     });
//   }
//   render() {
//     return (
//       <div
//         style={{ left: this.state.left, top: this.state.top }}
//         className='cursor'
//       >
//         {/* <div id="vertical"><hr id="line-v"/></div> */}
//         {/* <div id="horizontal"><hr id="line-h"/></div> */}
//         <div id="cross">+</div>
//       </div>
//     );
//   }
// }

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({left: -50, top: -50});


  useEffect(() => {
    console.log('mouse mounted');
    const handleMouseMove = (e) => {
      setCursorPosition({
        left: e.clientX,
        top: e.clientY,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      console.log('unmounting');
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div
      style={{left: cursorPosition.left, top: cursorPosition.top}}
      className='cursor'
    >
      {/* <div id="vertical"><hr id="line-v"/></div> */}
      {/* <div id="horizontal"><hr id="line-h"/></div> */}
      <div id="cross">+</div>
    </div>
  );
};


export default Cursor;
