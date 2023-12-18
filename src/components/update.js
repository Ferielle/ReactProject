import React, { useState, useEffect } from 'react';
import { Button, Form } from 'semantic-ui-react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Update() {
  const [id, setID] = useState(null);
  const [titre, settitre] = useState('');
  const [description, setdescription] = useState('');
  const [date_de_debut, setdate_de_debut] = useState('');
  const [date_de_fin, setdate_de_fin] = useState('');
  const [lieu, setlieu] = useState('');
  const navigate = useNavigate();

  const updateAPIData = () => {
    axios.put(`http://localhost:8000/api/evenement/${id}/edit`, {
        titre,
        description,
        date_de_fin,
        date_de_debut,
        lieu
    }).then(() => {
        navigate('/read');
    })
  };

  useEffect(() => {
    setID(localStorage.getItem('ID'));
    settitre(localStorage.getItem('titre'));
    setdescription(localStorage.getItem('description'));
    setdate_de_debut(localStorage.getItem('date_de_debut'));
    setdate_de_fin(localStorage.getItem('date_de_fin'));
    setlieu(localStorage.getItem('lieu'));
  }, []);

  return (
    <Form className="create-form">
      <Form.Field>
        <label>Titre</label>
        <input placeholder='titre' value={titre} onChange={(e) => settitre(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <input placeholder='description' value={description} onChange={(e) => setdescription(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Date de début</label>
        <input   placeholder='dd-mm-aaaa' value={date_de_debut} onChange={(e) => setdate_de_debut(e.target.value)} />
      </Form.Field> 
      <Form.Field>
        <label>Date de fin</label>
        <input   placeholder='dd-mm-aaaa' value={date_de_fin} onChange={(e) => setdate_de_fin(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Lieu</label>
        <input placeholder='lieu' value={lieu} onChange={(e) => setlieu(e.target.value)} />
      </Form.Field>
      <Button onClick={updateAPIData} type='submit'>Update</Button>
    </Form>
  );
}
