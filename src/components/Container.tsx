import { ReactNode } from 'react';

interface ContainerProps {
    className?: string;                         // Class CSS 
    content: string | ReactNode;                   // Nội dung
}

export function Container(props: ContainerProps) {
    const {
        className,  content,
    } = props;
    
    const isReactNode = typeof content !== 'string';
    
    return(
        <div 
            className={`bg-white rounded-2xl p-4 text-center ${className || ''} flex flex-col`}
            style={isReactNode ? { boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.35)' } : undefined}
        >  
            <div>
                {content}
            </div>
            
        </div>
    )
}