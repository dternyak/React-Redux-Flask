import React from 'react';

import Building from 'material-ui/svg-icons/action/account-balance';
import Cached from 'material-ui/svg-icons/action/cached';

export class Loading extends React.Component {

  render() {
    const style = {
      wrapper: {
        textAlign: 'center',
        position: 'relative',
        margin: '15px 0',
        padding: '30px 0',
      },
      building: {
        width: '12%',
        height: 'auto',
        margin: '0 auto',
      },
      text: {
        fontWeight: 'lighter',
        fontSize: '1.4em',
        textTransform: 'capitalize',
      }
    }

    return (
      <div className="row">
        <div style={style.wrapper} className="col-xs-12">
          <Building style={style.building} />
          <div style={style.text}>Loading...</div>
        </div>
      </div>
    );
  }
}

export default Loading;
