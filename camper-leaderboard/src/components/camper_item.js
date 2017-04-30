import React from 'react';

const CamperItem = ({index, camper, onCamperSelect}) => {
    const imageUrl = camper.img;
    const url = "https://www.freecodecamp.com/" + camper.username;
    return (
        <tr>
            <td className="data-padding">{index}</td>
            <td><a href={url} target="_blank"><img src={imageUrl} alt={camper.username} /><span className="username-span">{camper.username}</span></a></td>
            <td className="data-number-format">{camper.recent}</td>
            <td className="data-number-format">{camper.alltime}</td>
        </tr>
        );
}

export default CamperItem;