import React from 'react';
import CamperItem from './camper_item';

const CamperList = (props) => {
    const camperItems = props.camperData.map((camper, index)=> {
        return (
            <CamperItem key={camper.username} camper={camper} index={index+1} />
            );
    });
    
    return (
        <tbody>
            {camperItems}
        </tbody>
        );
}

export default CamperList;