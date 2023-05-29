import './index.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import Create from './create';
import { useParams } from 'react-router-dom';
import { ReactComponent as DetailsIcon } from './details.svg';
import { ReactComponent as DeleteIcon } from './delete.svg';
import CourseCard from './courseCard';

function Main() {

    const token = localStorage.getItem('token');

    if (token == '') {
        return MainTokenExeption()
    } else {
        console.log('MainPage:');

        return MainPage()
    }

}


function MainTokenExeption() {
    const navigate = useNavigate();

    function handleClick(event) {
        navigate('https://yusup02.github.io/SHOOCRU_TEST/');
    }

    return (
        <div>
            <div>Сеанс истек, требуется заново войти</div>

            <button
                className="button"
                type="button"
                onSubmit={handleClick}

            >Войти</button>

        </div>
    );
}

function MainPage() {
    var userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const [rates, setRates] = useState([]);
    const [openingCreateModal, setStateForCreateModal] = useState(false); // Состояние модального окна

    const [error, setError] = useState(
        {
            isOpen: false,
            errorText: ''
        });


    const navigate = useNavigate();

    function handleClick(event) {
        localStorage.clear();
        navigate('/');
        console.log('Токен после удаления:', localStorage.getItem('token'));
    }



    useEffect(() => {
        getRates();
    }, []);


    const [isCreating, setIsCreating] = useState(false); // Флаг для отслеживания создания курса


    function handleClick(event) {
        navigate('/');
    }

    // function handleClickCurseDetails(courseUID) {
    //     const navigate = useNavigate();
    //     navigate(`/CurseDetails/${courseUID}`);
    // }


    function handleClickCurseDetails(courseUID) {
        navigate(`/сurseDetails/${courseUID}`);
    }

    // function handleClickCurseDetails(courseUID) {

    //     window.location.href = '/course-details/' + courseUID;
    //     }


    //Получаем список курсво
    async function getRates() {
        try {
            const response = await fetch("https://fp-services.ru/installment/courses/get-list", {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();

                console.log(data);

                setRates(data.Data);

            } else {
                const errorData = await response.json();
                console.error('Ошибка авторизации:', errorData);

                setError(
                    {
                        isOpen: true,
                        errorText: errorData
                    }

                )

            }
        } catch (error) {
            console.error('Ошибка:', error);
        }



    }


    function showCreateModal() {
        setStateForCreateModal(true)
    }

    function hideCreateModal() {
        setStateForCreateModal(false)
    }

    function createModalResultSucces() {
        hideCreateModal();
        getRates();

    }


    function handleCreateClick() {

        window.location.reload();
    }

    function deletePromtShow(courseUID) {
        if (window.confirm("Вы точно хотите удалить курс?") == true) {
            deleteCource(courseUID);
        }
    }


    async function deleteCource(courseUID) {
        try {
            const response = await fetch(`https://fp-services.ru/installment/courses/delete?course_uid=${courseUID}`, {
                method: "DELETE",
                headers: {
                    "Authorization": `Bearer ${token}`
                }, // Отправляем данные нового курса
            });

            if (response.ok) {
                const data = await response.json();

                console.log(data);

                getRates();


            } else {
                const errorData = await response.json();
                console.error('Ошибка создания курса:', errorData);
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }
    }

    //   function handleDeleteClick() {
    //     window.location.reload();

    // }



    //Обновление страницы при нажити на кнопку "Повторить в модалке"
    const handleClose = () => {
        window.location.reload();
    };


    //Создаем список курсов
    return (
        <div className='main'>

            <Create opening={openingCreateModal} cancel={hideCreateModal} success={createModalResultSucces} />

            {/* Шапка сайта */}
            <div className='header'>
                <div className='header-title'>
                    <div className='logo'></div>
                    <h3 className='header-text'>SHOOKRU EDUCATION</h3>
                </div>

                <div className='header-inner'>
                    <h5 className='Name'>{userName}</h5>
                    <button className='header-button' type="button" onClick={handleClick}>Выйти</button>
                </div>
            </div>

            {/* Кнопка после которой вызыается модалка курсов */}
            <div className="button-table">
                {!isCreating && (
                    <button type="button" onClick={showCreateModal}>Создать</button>
                )}
            </div>
            {/* <div>

            {rates.map((сource, index) => (
                <div>
                    <div>{сource.Price} ₽</div>
                    <div>Курс {index}</div>
                    <div>{сource.Name}</div>
                    <div>{сource.Duration}</div>
                    <div>{сource.Description}</div>
                </div>

            ))}
</div> */}

            {/* Таблица */}
            <table className='table'>
                <thead className='table_thead'>
                    <tr>
                        <th className='table_th'>Название</th>
                        <th className='table_th'>Стоимость</th>
                        <th className='table_th'>Продолжительность</th>
                        <th className='table_th'>Описание</th>
                        <th className='table_th'></th>
                    </tr>
                </thead>

                {rates.map((сource, index) => (
                    <tr key={index}>
                        <td className='table_td'>{сource.Name}</td>
                        <td className='table_td table_td_price'>{сource.Price} ₽</td>
                        <td className='table_td table_td_d'>{сource.Duration}</td>
                        <td className='table_td'>{сource.Description}</td>
                        <td className='table_td table_td_button'>
                            <button className='button-now' onClick={() => handleClickCurseDetails(сource.CourseUID)}>
                                <DetailsIcon className='now' />
                            </button>
                            <button className='button-delet' onClick={() => deletePromtShow(сource.CourseUID)}>
                                <DeleteIcon className='delet' />
                            </button>
                        </td>


                    </tr>

                ))}

            </table>     {/* конец таблицы */}

            <div>
                <Modal isOpen={error.isOpen} onRequestClose={handleClose} className="modal">
                    <h3 className='modal-error'> Ошибка</h3>
                    <p className='modal-text'>{error.errorText}</p>
                    <button className='modal-button' onClick={handleClose}>Повторить</button>
                </Modal>
            </div>


        </div>
    );

}

export default Main;





