import React from 'react';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {red100, red500, red700, blueA200, blueA400} from 'material-ui/styles/colors';

/* application components */
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
              primary1Color: red500,
              primary2Color: red700,
              primary3Color: red100,
              accent1Color: blueA400,
              accent2Color: blueA200,
            },
        });

        return (
          <MuiThemeProvider muiTheme={muiTheme}>
            <section>
              {this.props.children}
              <div>
                  <Footer />
              </div>
            </section>
          </MuiThemeProvider>
        );
    }
}

export { App };
