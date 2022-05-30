import React from 'react';

const BooksList = ({book}) => {
    const {title, author} = book;
    return <>
        <span>{title} </span>
        <span>{author}</span>
    </>
};

export default BooksList;