import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useComponentDidMount, useComponentDidUpdate } from '../utils/lifecycle_hook';
import * as dataActions from '../actions/data';


const ProtectedView = (props) => {
    const data = useSelector(state => state.data);
    const token = useSelector(state => state.auth.token);
    const loaded = data.loaded;
    const email = data.data ? data.data.email : "";
    const dispatch = useDispatch();

    useComponentDidMount(() => {
        dispatch(() => dataActions.fetchProtectedData(token, dispatch));
    });

    return (
        <div>
            {!loaded
                ? <h1>Loading data...</h1>
                :
                <div>
                    <h1>Welcome back,
                        {props.userName}!</h1>
                    <h1>{email}</h1>
                </div>
            }
        </div>
    );
}

export default ProtectedView;

// ProtectedView.propTypes = {
//     fetchProtectedData: React.PropTypes.func,
//     loaded: React.PropTypes.bool,
//     userName: React.PropTypes.string,
//     data: React.PropTypes.any,
//     token: React.PropTypes.string,
// };
