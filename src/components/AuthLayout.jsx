// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { Blocks } from 'react-loader-spinner';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';

export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const authStatus = useSelector(state => state.auth.status);

    useEffect(() => {
        if (authentication && !authStatus) {
            // If authentication is required but user is not authenticated → Redirect to login
            navigate('/login');
        } else if (!authentication && authStatus) {
            // If authentication is not required but user is authenticated → Redirect to home
            navigate('/');
        }

        // Remove loader after navigation check
        setLoading(false);
    }, [authStatus, navigate, authentication]);

    // Render loader while checking auth status
    if (loading) return <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        visible={true}
    />;
    return <>{children}</>;
}

Protected.propTypes = {
    children: PropTypes.node,
    authentication: PropTypes.bool
};

