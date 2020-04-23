import React from 'react';

import './styles.css'

function DevItem({dev}) {
    
    return (
        <li className='dev-item'>
            <header>
                <figure>
                    <img src={dev.avatar_url} alt="Gustavo Henrique" />
                </figure>
                <div className="user-info">
                    <strong>{dev.name}</strong>
                    <p>{dev.techs.join(', ')}</p>
                </div>
            </header>
            <p>{dev.bio}</p>
            <a href={`https://github.com/${dev.github_username}`}>{dev.github_username}</a>
        </li>
    );
}

export default DevItem;