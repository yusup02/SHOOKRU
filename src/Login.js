
import './index.css';
import logo from './logo.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {

  console.log('Login:');


  //Здесь мы наблюдаем состояние хуков имени пользователя, пароля и ошибки, используя useState библиотеки из React.
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  //Функция handleSubmit вызвался при отправке формы.
  // Она сначала отменяет действие по умолчанию (обновление страницы) с помощью метода preventDefault().
  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');

    //Затем мы отправляем запрос POST на указанный адрес, используя fetch.
    // В телезапросе мы отправляем JSON, запрашиваем имя пользователя и пароль, которые были введены в форме.
    try {
    
const response = await fetch("https://fp-services.ru/installment/users/login", {
  method: "POST",
  body: JSON.stringify({
    Login: username,
    Password: password
  }),
  headers: {
    'Access-Control-Allow-Origin': 'null',
    "Content-type": "application/json"
  }

});
      

      //Если ответ сервера содержит код 200, то авторизация прошла успешно и мы перешли на страницу "sert.html".
      // В случае если мы обработаем сообщение об ошибке.
      if (response.ok) {
        // Авторизация прошла успешно, переходим на следующую страницу
        // window.location.href = './main.html';

        const data = await response.json();
        localStorage.setItem('userName', data.Data.Name); // сохраняет локально переданное знаение
        localStorage.setItem('token', data.Data.Token);
        console.log(data)
        navigate('https://yusup02.github.io/SHOOCRU_TEST//main', { replace: true });
      } else {
        // Обрабатываем ошибку авторизации
        const errorData = await response.json();
        setError(errorData.error);

        console.error('Ошибка авторизации:', errorData.Error);

        alert('Ошибка\n' + errorData.Error);

      }

      //Если возникла какая-либо ошибка при выполнении запроса,
      // то мы выводим сообщение об оплате в консоль и включает значение ошибки состояния.
    } catch (error) {
      console.error('Ошибка авторизации:', error);
      setError('Произошла ошибка при авторизации');

      alert('Произошла ошибка при авторизации');
    }
  }


  //Возвращаемые элементы JSX имеют формы input, button и div, которые имеют классы CSS.
  // Обратите внимание, что значение каждого входа связано с соответствующим состоянием хуком.
  // Если в состоянии хуке ошибка есть сообщение об этом, то мы выводим его на страницу.
  return (
<div> 
     <h3 className="text">SHOOKRU EDUCATION</h3>
    <form onSubmit={handleSubmit} className="container">
      <input
        className="inpu login"
        type="text"
        placeholder="Логин"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        required
      />
      <input
        className="inpu password"
        type="password"
        placeholder="Пароль"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        required
      />
      <div className="button">
        <button type="submit"

        >Войти</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
    </div>
  );
}

export default Login;
