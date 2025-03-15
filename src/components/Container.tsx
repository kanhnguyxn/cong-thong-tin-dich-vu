import { ReactNode } from 'react';

interface ContainerProps {
    className?: string;                         // Class CSS 
    title?: string;                             // Tiêu đề 
    titleClassName?: string;                    // Class CSS cho tiêu đề
    subTitle?: string;                            // Tiêu đề
    subTitleClassName?: string;                   // Class CSS cho tiêu đề 
    content: string | ReactNode;                   // Nội dung
}

export function Container(props: ContainerProps) {
    const {
        className, title, titleClassName, subTitle, subTitleClassName,  content,
    } = props;
    
    const isReactNode = typeof content !== 'string';
    
    return(
        <div 
            className={`bg-white rounded-md p-4 text-center ${className || ''} flex flex-col`}
            style={isReactNode ? { boxShadow: '0 0 10px 10px rgba(0, 0, 0, 0.35)' } : undefined}
        >
            {title && <h1 className={`text-[var(--color-orange)] text-lg md:text-xl lg:text-2xl font-bold mb-2 ${titleClassName || ''}`}>{title}</h1>}
            {subTitle && <h2 className={`text-[var(--color-blue)] uppercase font-bold mb-4 text-sm md:text-lg lg:text-xl ${subTitleClassName || ''}`}>{subTitle}</h2>}
           
            <div>
                {content}
            </div>
            
        </div>
    )
}