
import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ReactComponent as Cancel } from './cancel.svg';
import React, { useEffect } from 'react';

function Create({ opening, cancel, success }) {
  const token = localStorage.getItem('token');
  const [newCource, setNewCource] = useState({
    Name: '',
    ShortID: uniqueId(),
    Price: 0,
    Duration: '',
    SourceLink: "",
    Description: '',
    detailsButton: true, // флаг указывает на наличие кнопки "Подробнее"
  });

  async function createCource() {
    try {
      const response = await fetch("https://fp-services.ru/installment/courses/create", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(newCource) // Отправляем данные нового курса
      });

      if (response.ok) {
        const data = await response.json();

        console.log(data);
        // Обновляем список курсов после успешного создания
        success()
      } else {
        const errorData = await response.json();
        console.error('Ошибка создания курса:', errorData);
      }
    } catch (error) {
      console.error('Ошибка:', error);
    }
  }

  function uniqueId() {
    const letters = 'abcdefghijklmnopqrstuvwxyz'; // набор букв, из которого будет производиться выбор
    let id = '';
    let length = 5;

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * letters.length);
      const randomLetter = letters.charAt(randomIndex);
      id += randomLetter;
    }

    return id;
  }

  function handleSaveClick() {
    createCource();
    setNewCource({
      Name: '',
      ShortID: uniqueId(),
      Price: 0,
      Duration: '',
      Description: '',
      detailsButton: true, 
    });
  }

  function handleInputChange(event) {
    const { name, value } = event.target;
    console.log(typeof name, typeof value);
    setNewCource((prevCource) => ({
      ...prevCource,
      [name]: value
    }));
  }

  function handlePriceInputChange(event) {
    const { name, value } = event.target;
    console.log(typeof name, typeof value);

    setNewCource((prevCource) => ({
      ...prevCource,
      [name]: parseFloat(value)
    }));
  }

  return (
    <div>
      {opening && (
        <div className="modal">
          <button className='modal-cancellation' onClick={cancel}>
          
          </button>
          <div className="create">
            <input
              type="text"
              name="Name"
              value={newCource.Name}
              onChange={handleInputChange}
              placeholder="Название"
            />
            <input
              type="number"
              name="Price"
              value={newCource.Price}
              onChange={handlePriceInputChange}
              placeholder="Цена"
            />
            <input
              type="text"
              name="Duration"
              value={newCource.Duration}
              onChange={handleInputChange}
              placeholder="Продолжительность"
            />
            <input className='create'
              type="text"
              name="SourceLink"
              value={newCource.SourceLink}
              onChange={handleInputChange}
              placeholder="Cсылка"
            />
            <input className='create-description'
              type="text"
              name="Description"
              value={newCource.Description}
              onChange={handleInputChange}
              placeholder="Описание"
            />
            <div className='create-button'>
              <button onClick={handleSaveClick}>Создать</button>
            </div>
          </div>
          <div class="overlay"> </div>
        </div>
      )}
    </div>
  );
}

export default Create;