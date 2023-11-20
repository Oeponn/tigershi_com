import React, {useEffect, useState} from 'react';
import styles from './styles.module.scss';

const Cursor = () => {
  const [cursorPosition, setCursorPosition] = useState({left: -50, top: -50});
  const [mouseDown, setMouseDown] = useState(false);


  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursorPosition({
        left: e.clientX,
        top: e.clientY,
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mousedown', () => {
      setMouseDown(true);
    });

    document.addEventListener('mouseup', () => {
      setMouseDown(false);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const cursorClasses = [
    styles.cursor, mouseDown ? styles.mouseDown : null,
  ].join(' ');

  return (
    <div
      style={{left: cursorPosition.left, top: cursorPosition.top}}
      className={cursorClasses}
    >
      <div className={styles.cross}>+</div>
    </div>
  );
};


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
//         <div id="cross">+</div>
//       </div>
//     );
//   }
// }

export default Cursor;
