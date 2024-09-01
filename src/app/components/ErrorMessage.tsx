// src/components/ErrorMessage.tsx
import React from 'react';

interface ErrorMessageProps {
    message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
    <div className="text-red-500 text-center mt-4">
        <p>{message}</p>
    </div>
);

export default ErrorMessage;
