import React from 'react'
import './Curtain.scss'
import Video from '../video/Video';
import { useCurtain } from '../../contexts/CurtainContext'

const Curtain: React.FC = () => {
    const { isOpen, setIsOpen } = useCurtain()

    const handleWheel = (event: React.WheelEvent<HTMLDivElement>) => {
        if (event.deltaY > 0) {
            setIsOpen(true);
        } else if (event.deltaY < 0 && window.scrollY === 0) {
            setIsOpen(false);
        }
    };

    return (
        <>
            <div className={`stage ${isOpen ? 'open' : ''}`} id="stage" onWheel={handleWheel}>
                <div className="content">
                    <Video isCurtainOpen={isOpen} />
                </div>
                <div className="curtain left">
                    <div className="fabric"></div>
                    <div className="pleats"></div>
                </div>
                <div className="curtain right">
                    <div className="fabric"></div>
                    <div className="pleats"></div>
                </div>
                <div className="center-shadow"></div>
            </div>
        </>
    )
}

export default Curtain
