import React, { Component } from 'react';
import 'bootstrap-webpack';

/* global styles for app */
import 'style!./styles/app.scss';

/* application components */
import { Header } from 'components/Header';
import { Footer } from 'components/Footer';

export class App extends Component {
    static propTypes = {
        children: React.PropTypes.any,
    }

    render() {
        return (
            <section>
                <Header/>
                <div className="container" style={{"marginTop": 50, "paddingBottom": 250}}>
                    {this.props.children}
                </div>
                <div>
                    <Footer />
                </div>
            </section>
        );
    }
}
