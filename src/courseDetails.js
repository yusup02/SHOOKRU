import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Payments from './payments';

function CurseDetails() {
    var userName = localStorage.getItem('userName');
    const token = localStorage.getItem('token');
    const { courseUID } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState({});
    const [student, setStudent] = useState([]);
    const [error, setError] = useState(
        {
            isOpen: false,
            errorText: ''
        });
    const [paymentsData, setPaymentData] = useState(
        {
            isOpen: false,
            data: []
        });
    const [name, setName] = useState('');

    function showPaymentsModal(payments) {
        console.log(payments);

        setPaymentData(
            {
                isOpen: true,
                data: payments
            }
        );
    }

    function hidePaymentsModal() {
        setPaymentData(
            {
                isOpen: false,
                data: []
            }
        );
    }


    function handleGoBack() {
        navigate('/main'); // Переход на страницу "main"
    }

    function handleClick(event) {
        navigate('/');
    }

    useEffect(() => {
        getRates();
    }, []);

    function getDateTime(dateString) {
        const formattedDate = new Date(dateString).toLocaleString();
        return formattedDate
    }

    function getLocalizetBoolean(bool) {
        if (bool == true) {
            return "Да"
        } else {
            return "Нет"
        }
    }

    function studentStatus(isEnrolled, isCancelled) {
        if (isEnrolled == true && isCancelled == true) {
            return "Зачислен"
        }

        if (isEnrolled == false && isCancelled == true) {
            return "Отменен"
        }

        if (isEnrolled == false && isCancelled == true) {
            return "isEnrolled = false, isCancelled = true"
        }

        if (isEnrolled == true && isCancelled == false) {
            return "isEnrolled = true, isCancelled = false"
        }
    }

    async function getRates() {
        console.log(courseUID);

        try {
            const response = await fetch(`https://fp-services.ru/installment/courses/get?course_uid=${courseUID}`, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            if (response.ok) {
                const responseData = await response.json();

                console.log(responseData.Data);

                setData(responseData.Data);

                setStudent(responseData.Data.Students)
            } else {
                const errorData = await response.json();
                console.error('CurseDetails error', errorData);
                setError({
                    isOpen: true,
                    errorText: errorData,
                });
            }
        } catch (error) {
            console.error('Ошибка:', error);
        }

    };


    return (
        <div className='main'>

            <Payments paymentsData={paymentsData} cancel={hidePaymentsModal} />
            {/* Шапка сайта */}
            <div className='header'>
                <div className='header-title'>
                    <div className='logo'></div>
                    <h3 className='header-text'>SHOOKRU EDUCATION</h3>
                    <button className='button-back' onClick={handleGoBack}>Назад</button>
                </div>
                <div className='header-inner'>
                    <h5 className='Name'>{userName}</h5>
                    <button className='header-button' type="button" onClick={handleClick}>Выйти</button>
                </div>
            </div>



            <div className='detail-content'>
                <div className='spans-title'>
                    <div className='spans'>
                    <b>Название</b>
                    <p>{data.Name}</p>
                    </div>
                    
                    <div className='spans'>
                    <b>Цена</b>
                    <p>{data.Price} ₽</p>
                    </div>
                    
                    <div className='spans'>
                    <b>Длительность</b>
                    <p>{data.Duration}</p>
                    </div>
                    
                    <div className='spans'>
                        <b>Описание</b>
                    <p>{data.Description}</p>
                    </div>
                    
                    <div className='spans'>
                    <b>Создан</b>
                    <p>{getDateTime(data.CreatedAt)}</p>
                    </div>
                </div>

                <div className='spans-title'>
                <div className='spans-2'>
                    <b>Ссылка на курс</b>
                    <p><a href={data.SourceLink}>{data.SourceLink}</a></p>
                    </div>
                    
                    <div className='spans-2'>
                    <b>Ссылка на рассрочку по курсу</b>
                    <p><a href={data.InstallmentLink}>{data.InstallmentLink}</a></p>
                    </div>
                </div>

                <table className='table'>
                    <thead className='table_thead'>
                        <tr>
                            <th className='table_th'>Имя студента</th>
                            <th className='table_th'>Дата начала</th>
                            <th className='table_th'>Полученная сумма</th>
                            <th className='table_th'>Статус</th>
                            <th className='table_th'>Платежи</th>
                        </tr>
                    </thead>

                    {student !== null && (
                        <tbody>
                            {
                                student.map((сource, index) => (
                                    <tr key={index}>
                                        <td className='table_td'>{сource.Name}</td>
                                        <td className='table_td'>{getDateTime(data.CreatedAt)}</td>
                                        <td className='table_td'>{сource.SumNeed} ₽</td>
                                        <td className='table_td'>{studentStatus(сource.IsEnrolled, сource.IsCancelled)}</td>
                                        <td className='table_td'>{сource.Payments.length} плат.
                                            <button className='button-look' type="button" onClick={() => showPaymentsModal(сource.Payments)}>Посмотреть</button></td>

                                    </tr>

                                ))
                            }
                        </tbody>
                    )}

                </table>
            </div>

        </div>
    );
}

export default CurseDetails;