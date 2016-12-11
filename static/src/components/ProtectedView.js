import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actionCreators from '../actions/data';

import IssueFeed from './IssueFeed';

function mapStateToProps(state) {
    return {
        data: state.data,
        token: state.auth.token,
        loaded: state.data.loaded,
        isFetching: state.data.isFetching,
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch);
}

@connect(mapStateToProps, mapDispatchToProps)
export default class ProtectedView extends React.Component {
    componentDidMount() {
        this.fetchData();
    }


    fetchData() {
        const token = this.props.token;
        this.props.fetchIssuesData();
    }

    render() {
        let issues = this.props.data.data;

        return (
            <div>
                {!this.props.loaded
                    ? <h1>Loading data...</h1>
                    :
                    <div>
                        {JSON.stringify(this.props.data)}
                        {console.log('data.data', issues)}
                        <IssueFeed issues={issues} />
                    </div>
                }
            </div>
        );
    }
}

ProtectedView.propTypes = {
    fetchIssuesData: React.PropTypes.func,
    loaded: React.PropTypes.bool,
    userName: React.PropTypes.string,
    data: React.PropTypes.any,
    token: React.PropTypes.string,
};
