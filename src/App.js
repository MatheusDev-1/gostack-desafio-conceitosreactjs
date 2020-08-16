import React, {useState, useEffect} from "react";
import api from '../src/services/api';

import "./styles.css";

function App() {
  const [repository, setRepository] = useState([]);

  useEffect( () => {
    api.get("repositories").then(response => {
      setRepository(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const data = { 
                   url: "https://github.com/josepholiveira",
                   title: "Desafio ReactJS",
                   techs: ["React", "Node.js"],
                  }

    await api.post('repositories', data)

    setRepository([...repository, data])
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`)
    
    setRepository([])
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repository.map( repository => (
          <>
          <li key={repository.title}>{repository.title}</li>
          <button onClick={() => handleRemoveRepository(repository.id)}>Remover</button>
          </>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
