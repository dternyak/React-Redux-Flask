import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

/* application components */
import { Header } from '../../components/Header';
import { Footer } from '../../components/Footer';

/* global styles for app */
import './styles/app.scss';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: React.PropTypes.node,
    };

    render() {
        // http://www.material-ui.com/#/customization/themes
        const muiTheme = getMuiTheme({
            fontFamily: 'Roboto, sans-serif',
            palette: {
              primary1Color: '#073764',
              primary2Color: '#073764',
              primary3Color: '#073764',
              accent1Color: '#073764',
              accent2Color: '#073764',
              accent3Color: '#073764',
            },
        });

        return (
            <MuiThemeProvider muiTheme={muiTheme}>
                <section>
                    <Header />
                    <div
                      className="container"
                      style={{ marginTop: 10, paddingBottom: 250 }}
                    >
                        {this.props.children}
                    </div>
                    <div>
                        <Footer />
                    </div>
                </section>
            </MuiThemeProvider>
        );
    }
}

export { App };
