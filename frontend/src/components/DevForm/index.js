import React, { useState } from 'react';
import './styles.css';

function DevForm({ onSubmit }) {

    const [nome, setNome] = useState('')
    const [github_username, setGithub_username] = useState('')
    const [cep, setCep] = useState('')

    async function handleAdd(e) {
        e.preventDefault();

        await onSubmit({
            nome,
            github_username,
            cep
        });

        setNome('');
        setGithub_username('');
        setCep('')
    }
    
    return (
        <form onSubmit={handleAdd} >
            <div className="input-block">
                <label htmlFor="username">Nome</label>
                <input
                    type="text"
                    id='username'
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required />

            </div>

            <div className="input-block">
                <label htmlFor="github_username">Github Username</label>
                <input
                    type="text"
                    id='github_username'
                    value={github_username}
                    onChange={e => setGithub_username(e.target.value)}
                    required />
            </div>

            <div className="input-block">
                <label htmlFor="cep">Cep</label>
                <input
                    type="text"
                    id='cep'
                    value={cep}
                    onChange={e => setCep(e.target.value)}
                    required />
            </div>

            <button type='submit' type='submit'>Salvar</button>
        </form>
    );
}

export default DevForm;