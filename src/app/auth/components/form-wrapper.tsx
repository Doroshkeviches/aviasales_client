import { ReactNode, FormEvent } from 'react';

interface FormWrapperProps {
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    children: ReactNode;
}

export default function FormWrapper({ onSubmit, children }: FormWrapperProps) {
    return (
        <form onSubmit={onSubmit}
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px 20px',
                textAlign: 'center',
                gap: '10px'
            }}>
            {children}
        </form>
    )
}
