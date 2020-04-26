import React from 'react';
import './Error.css';

const Error = () => {
    return <div className={'error'}><i className="fa fas fa-bug"></i> <i> Произошла ошибка при загрузке данных
        =( <hr/> Повторите позже.</i></div>;
};

export default Error;
