import { connect } from 'react-redux';

import styles from './FirstContainer.css'
import MenuNavTop from '../menus/MenuNavTop'

class FirstContainer extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        console.log("Component mounted with props :", this.props)
    }

    render () {
        let {factory, counter, onIncrement, onDecrement} = this.props
        return (
            <div className={"wrapper"}>
                <div>
                    <MenuNavTop factory={factory}/>
                </div>
                <h2>HOME</h2>
                <div>
                    <h3 className={styles.title1}>COUNTER 1 : {counter}</h3>
                    <button onClick={() => onIncrement()}>+</button>
                    <button onClick={() => onDecrement()}>-</button>
                </div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        counter: state.counter
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        dispatch,
        onIncrement:() => {
            dispatch({
                type:`INCREMENT`,
            })
        },
        onDecrement:() => {
            dispatch({
                type:`DECREMENT`,
            })
        }
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(FirstContainer)
