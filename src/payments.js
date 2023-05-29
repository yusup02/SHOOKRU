import './index.css';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import React, { useEffect } from 'react';

function payments({ paymentsData, cancel }) {

    function getDateTime(dateString) {
        const formattedDate = new Date(dateString).toLocaleString();
        return formattedDate
    }

    return (
        <div>
            {paymentsData.isOpen && (
                <div className="modal">
                    <button className='modal-cancellation' onClick={cancel}>
                        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,700,0,0" />
                    </button>
                    <div className="payments">
                        <table className='table'>
                            <thead className='table_thead'>
                                <tr>
                                    <th className='table_th'>Дата платежа</th>
                                    <th className='table_th'>Сумма</th>
                                    <th className='table_th'>Статус</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paymentsData.data.map((payment, index) => (
                                    <tr  className='payments-tr-value' key={index}>
                                        <td className='table_td'>{getDateTime(payment.DatePaid)}</td>
                                        <td className='table_td'>{payment.SumPaid} ₽</td>
                                        <td className='table_td'>{payment.PaymentState}</td>
                                    </tr>
                                ))
                                }
                            </tbody>
                        </table>
                    </div>
                    <div class="overlay"> </div>
                </div>
            )}
        </div>






    )
}

export default payments;