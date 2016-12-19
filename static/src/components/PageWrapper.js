import React, { Component, PropTypes } from 'react';

/* application components */
import Header from './Header';

class PageWrapper extends Component { // eslint-disable-line react/prefer-stateless-function
    static propTypes = {
        children: PropTypes.node,
    };

    render() {
      return (
        <div>
          <div
            className="container"
            style={{ marginTop: 10, paddingBottom: 250 }}
          >
            {this.props.children}
          </div>
        </div>
      );
    }
}

export { PageWrapper };
