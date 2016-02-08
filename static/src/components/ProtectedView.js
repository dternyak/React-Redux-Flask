import React from 'react';
import {connect} from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

function mapStateToProps(state) {
    return {
        data: state.data,
        token: state.auth.token,
        loaded: state.data.loaded,
        isFetching: state.data.isFetching
    }
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ProtectedView extends React.Component {

    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        let token = this.props.token;
        this.props.fetchProtectedData(token);
    }

    render() {
        return (
            <div>

                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        <h1>Welcome back,
                            {this.props.userName}!</h1>
                        <h1>{this.props.data.data.email}</h1>
                    </div>
                }
            </div>
        );
    }
}



