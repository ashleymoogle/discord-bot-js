import React from 'react'
import { Link, browserHistory } from 'react-router-dom'
import styles from "./MenuNavTop.css"

class MenuNavTop extends React.Component {
    constructor (props) {
        super(props)
    }

    componentDidMount() {
        console.log("Component MenuNavTop mounted with props :", this.props)
    }

    render () {
        let {factory} = this.props
        return (
            <div>
                <header>
                    <ul className={styles.list}>
                        <li className={styles.item}><Link to="/">HOME</Link></li>
                        <li className={styles.item} onClick={() => browserHistory.push('/test')}>TEST</li>
                    </ul>
                </header>
            </div>
        )
    }
}

export default MenuNavTop
