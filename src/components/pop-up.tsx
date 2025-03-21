import { ReactNode, useRef, useEffect } from "react";
import { Container } from "./Container";

type PopUpProps = {
    header?: string | ReactNode;
    content: string | ReactNode;
    footer?: string | ReactNode;
    showOverlay?: boolean;
    onClose: () => void;
};

export default function PopUp({ header, content, footer, showOverlay = true, onClose }: PopUpProps) {
    const popupRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    
    // Handle click outside to close popup
    const handleClickOutside = (event: MouseEvent) => {
        if (overlayRef.current && 
            popupRef.current && 
            !popupRef.current.contains(event.target as Node) && 
            overlayRef.current.contains(event.target as Node)) {
            onClose();
        }
    };
    
    useEffect(() => {
        if (showOverlay) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [showOverlay]);

    return (
        <>
            {showOverlay && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-40 flex items-center justify-center" 
                    ref={overlayRef}
                >
                    <div 
                        ref={popupRef} 
                        role="dialog" 
                        aria-modal="true" 
                        className="w-full z-50 max-w-md"
                    >
                        <Container
                            className="w-full my-8 px-4 sm:w-[95%] mx-auto md:w-full"
                            content={
                                <>
                                    {header && <div className="mb-4">{header}</div>}
                                    <div className="mb-4">{content}</div>
                                    {footer && <div className="mt-4">{footer}</div>}
                                </>
                            }
                        />
                    </div>
                </div>
            )}
        </>
    );
}
