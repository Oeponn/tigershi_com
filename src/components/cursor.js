import React, {Component} from 'react';


class Cursor extends Component {
    state = {
        left: -50,
        top: -50,
    }
    componentDidMount() {
        document.addEventListener('mousemove', (e) => {
            // console.log("X: (", e.pageX, e.clientX, ") Y: (", e.pageY, e.clientY, ")")
            this.setState({
                left: e.clientX, 
                top: e.clientY,
            });
        });
    }
    render() {
        return (
            <div style={{left: this.state.left, top: this.state.top}} className='cursor'></div>
        )
    }
}
 
export default Cursor;