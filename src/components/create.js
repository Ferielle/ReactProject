import React from 'react';
import { Button, date_de_debut, Form } from 'semantic-ui-react';
import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Create = () => {
  const navigate = useNavigate();
  const [titre, setTitre] = useState('');
  const [description, setDescription] = useState('');
  const [date_de_debut, setDateDeDebut] = useState('');
  const [date_de_fin, setDateDeFin] = useState('');
  const [lieu, setLieu] = useState('');
  const [errors, setErrors] = useState({}); // Ajout de l'état des erreurs

  const postData = () => {
    axios
      .post(`http://localhost:8000/api/evenement/new`, {
        titre,
        description,
        date_de_fin,
        date_de_debut,
        lieu,
      })
      .then(() => {
        navigate('/read');
      })
      .catch((error) => {
        if (error.response && error.response.data && error.response.data.errors) {
          setErrors(error.response.data.errors);
          alert(errors.g)
        }
      });
  };

  return (
    <Form className="create-form">
      <Form.Field>
        <label>Titre</label>
        <input
          placeholder="titre"
          onChange={(e) => setTitre(e.target.value)}
          className={errors.titre ? 'error' : ''} // Ajout de la classe d'erreur si nécessaire
        />
        {errors.titre && <div className="error-message">{errors.titre.join(', ')}</div>}
      </Form.Field>
      <Form.Field>
        <label>Description</label>
        <input
          placeholder="description"
          onChange={(e) => setDescription(e.target.value)}
          className={errors.description ? 'error' : ''}
        />
        {errors.description && (
          <div className="error-message">{errors.description.join(', ')}</div>
        )}
      </Form.Field>
      <Form.Field>
        <label>Date de début</label>
        <input
          placeholder="dd-mm-aaaa"
          onChange={(e) => setDateDeDebut(e.target.value)}
          className={errors.date_de_debut ? 'error' : ''}
        />
        {errors.date_de_debut && (
          <div className="error-message">{errors.date_de_debut.join(', ')}</div>
        )}
      </Form.Field>
      <Form.Field>
        <label>Date de fin</label>
        <input
          placeholder="dd-mm-aaaa"
          onChange={(e) => setDateDeFin(e.target.value)}
          className={errors.date_de_fin ? 'error' : ''}
        />
        {errors.date_de_fin && (
          <div className="error-message">{errors.date_de_fin.join(', ')}</div>
        )}
      </Form.Field>
      <Form.Field>
        <label>Lieu</label>
        <input
          placeholder="lieu"
          onChange={(e) => setLieu(e.target.value)}
          className={errors.lieu ? 'error' : ''}
        />
        {errors.lieu && <div className="error-message">{errors.lieu.join(', ')}</div>}
      </Form.Field>
      <Button onClick={postData} type="submit">
        Submit
      </Button>
    </Form>
  );
};

export default Create;
