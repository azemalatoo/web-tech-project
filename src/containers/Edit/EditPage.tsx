import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { TNewQuote } from "../../types";
import axiosApi from "../../axiosApi";
import EditForm from "./EditForm";
import Spinner from "../../components/Spinner/Spinner";
import './EditPage.css'; // Import your CSS file for styling

const EditPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [quote, setQuote] = useState<TNewQuote | null>(null);

    const fetchData = useCallback(async (id: string) => {
        try {
            const response = await axiosApi.get<TNewQuote>(`/quotes/${id}.json`);
            setQuote(response.data);
        } finally {
        }
    }, []);

    useEffect(() => {
        if (id) {
            void fetchData(id);
        }
    }, [fetchData, id]);

    const updateQuote = async (data: TNewQuote) => {
            await axiosApi.put(`/quotes/${id}.json`, data);
            navigate('/');
    };

    return (
        <div className="edit-quote-container">
            {quote ? (
                <>
                    <h2 className="edit-quote-header">Edit Quote</h2>
                    <EditForm editPost={quote} onSubmit={updateQuote} />
                </>
            ) : (
                <div className="spinner-container">
                    <Spinner />
                </div>
            )}
        </div>
    );
};

export default EditPage;
