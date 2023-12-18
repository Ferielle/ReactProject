import React, { useEffect, useState } from 'react';
import { Button, Card, Icon, Input } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Api_URL = 'http://localhost:8000/api/';

export default function Read() {
  const [originalData, setOriginalData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);

  const handleButtonClick = (data) => {
    localStorage.setItem('ID', data.id);
    localStorage.setItem('titre', data.titre);
    localStorage.setItem('description', data.description);
    localStorage.setItem('date_de_debut', data.date_de_debut);
    localStorage.setItem('date_de_fin', data.date_de_fin);
    localStorage.setItem('lieu', data.lieu);

    console.log('Data stored in localStorage:', data);
  };

  const onDelete = (id) => {
    axios.delete(`${Api_URL}evenement/${id}`)
      .then(() => {
        getData();
      })
      .catch((error) => console.error('Delete Error:', error));
  };

  const getData = async () => {
    try {
      const response = await axios.get(`${Api_URL}evenement/`);
      setOriginalData(response.data);
      setSearchResults(response.data); // Initially set search results to original data
      console.log('Fetched Data:', response.data);
    } catch (error) {
      console.error('Fetch Error:', error);
    }
  };
  const resetSearch = () => {
    setSearchTerm('');
    setSearchResults(originalData);
  };

  const handleSearch = () => {
    // Check if searchTerm looks like a date
    const isDate = !isNaN(Date.parse(searchTerm));

    const filteredResults = originalData.filter((data) => {
      if (isDate) {
        return data.date_de_debut.includes(searchTerm) || data.date_de_fin.includes(searchTerm);
      } else {
        return data.lieu.includes(searchTerm);
      }
    });

    setSearchResults(filteredResults);
    console.log('Search Results:', filteredResults);
  };

  return (
    
    <div className="card-container">
      <div className="search-bar">
        <Input
          className="search-input"
          icon={<Icon name='search' link onClick={handleSearch} />}
          placeholder='Search...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button basic color='grey'  onClick={resetSearch}>
          Reset
        </Button>
        <Link to='/create'>
  <Button basic color='green'>
    Create
  </Button>
</Link>

      </div>
      <div className="custom-card-group">
        {searchResults.map((data) => (
          <Card key={data.id}>
            <Card.Content>
              <Card.Header>{data.titre}</Card.Header>
              <Card.Description>
                <p>{data.description}</p>
                <p>Date de début: {new Date(data.date_de_debut).toLocaleDateString()}</p>
                <p>Date de fin: {new Date(data.date_de_fin).toLocaleDateString()}</p>
                <p>Lieu: {data.lieu}</p>
              </Card.Description>
            </Card.Content>
            <Card.Content extra>
              <div className='ui two buttons'>
                <Button basic color='red' size='mini' onClick={() => onDelete(data.id)}>
                  Delete
                </Button>
                <Link to='/update'>
                  <Button basic color='blue' size='mini' onClick={() => handleButtonClick(data)}>
                    Update
                  </Button>
                </Link>
              </div>
            </Card.Content>
          </Card>
        ))}
      </div>
    </div>
  );
}