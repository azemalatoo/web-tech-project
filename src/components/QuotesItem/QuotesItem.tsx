import React from 'react';
import { Link } from "react-router-dom";
interface Props {
    author: string,
    text: string,
    id?: string,
    onDelete: (id: string) => void;
}
const QuotesItem: React.FC<Props> = ({ author, text, id, onDelete }) => {
    return (
        <div className="card mb-5">
            <div className="card-body">
                <h5 className="card-title">"{text}"</h5>
                <p className="card-text">Author: {author}</p>
                <Link to={'/edit-quote/' + id} className="btn btn-success me-3">
                    Edit
                </Link>
                <button className="btn btn-danger ms-2" onClick={() => onDelete(id!)}>Delete</button>
            </div>
        </div>
    );
};

export default QuotesItem;