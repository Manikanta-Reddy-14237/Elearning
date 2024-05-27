import React from 'react';
import { Navigate } from "react-router-dom";
import CheckTokenValidity from './tokenvalidity';

const Protected = ({ element, allowedRoles }) => {
    const { isValid, role } = CheckTokenValidity();

    if (!isValid || !allowedRoles.includes(role)) {
        return <Navigate to="/" replace />;
    }

    return element;
};

export default Protected;
