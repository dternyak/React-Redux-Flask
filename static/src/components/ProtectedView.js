import React from 'react';
import { useSelector } from 'react-redux';
import { useComponentDidMount } from '../utils/lifecycle_hook';


const ProtectedView = (props) => {
    console.log('protectedView');
    const fetchData = () => {
        const token = useSelector(state => state.data.token);
        props.fetchProtectedData(token);
    }

    useComponentDidMount(() => {fetchData()});

    return (
        <div>
            {!useSelector(state => state.data.loaded)
                ? <h1>Loading data...</h1>
                :
                <div>
                    <h1>Welcome back,
                        {props.userName}!</h1>
                    <h1>{useSelector(state => state.data.data.email)}</h1>
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
