import React, { Component } from 'react'

import { getLast } from './utils.js'


export default class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            infoSensor: null
        }
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            this.getLastInfo(5)
        }, 2000);
    }


    getLastInfo = (num) => {
        getLast(num)
            .then(({ data }) => {
                this.setState({ infoSensor: data })
            })
    }

    getEnvironmentInfo = () => {        
        if (this.state.infoSensor && this.state.infoSensor.length > 0) {
            return this.state.infoSensor.map((info) => {
                var read = JSON.parse(info.data);
                if (read.xdk2mam[0].sensor == 'Environmental') 
                    return <h4>Pressure: {read.xdk2mam[0].data[0].Pressure} -
                                Temperature: {read.xdk2mam[0].data[1].Temp} -
                                Humidity: {read.xdk2mam[0].data[2].Humidity} -
                                Device: {read.device} -
                                Timestamp: {read.timestamp}</h4>
            })
        }
    }

    render() {
        return (
            <React.Fragment>
                {this.getEnvironmentInfo()}
            </React.Fragment>
        )
    }
}
