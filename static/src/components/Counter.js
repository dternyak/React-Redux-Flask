import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as CounterActions from '../actions/counter'


function mapStateToProps(state) {
    return {
        counter: state.counter
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(CounterActions, dispatch)
}

@connect(mapStateToProps, mapDispatchToProps)
export default class CounterView extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { increment, incrementIfOdd, incrementAsync, decrement, counter } = this.props

        return (
            <section>
                <div className="container">
                    <div className="row">
                        <div className="col-xs-12 col-sm-12 col-md-6 col-lg-6
                            col-md-offset-3 col-lg-offset-3">
                            <div style={{"marginTop": 50}}>
                                <p className="test">
                                    Clicked: {counter} times
                                    {' '}
                                </p>
                                <button type="button" className="btn btn-default" onClick={increment}>+</button>
                                {' '}
                                <button type="button" className="btn btn-default" onClick={decrement}>-</button>
                                {' '}
                                <button type="button" className="btn btn-default" onClick={incrementIfOdd}>Increment if
                                    odd
                                </button>
                                {' '}
                                <button type="button" className="btn btn-default" onClick={() => incrementAsync(1000)}>
                                    Increment async
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}
