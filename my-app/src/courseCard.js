import './index.css';
import { useState } from 'react';
import React, { useEffect } from 'react';

function CourseCard({ сource, index }) {

    return (
        <div>

                <p>Курс {index}</p>
                    <p>{сource.Name}</p>
                    <p>{сource.Price} ₽</p>
                    <p>{сource.Duration}</p>
                    <p>{сource.Description}</p>
                    </div>
    );
}

export default CourseCard;