import React, { Component } from 'react';

/* global styles for app */
import './styles/app.scss';

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
                <div className="container" style={{"marginTop": 10, "paddingBottom": 250}}>
                    {this.props.children}
                </div>
                <div>
                    <Footer />
                </div>
            </section>
        );
    }
}
