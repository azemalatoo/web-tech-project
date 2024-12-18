import React, { useCallback, useEffect, useState } from 'react';
import { IApiQuote, IQuote } from '../../types';
import axiosApi from '../../axiosApi';
import { useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../../constants';
import './QuotesPage.css';

const QuotesPage = () => {
    const [quotes, setQuotes] = useState<IQuote[]>([]);
    const [category, setCategory] = useState<string | null>(null);
    const [showDialog, setShowDialog] = useState(false);
    const [quoteToDelete, setQuoteToDelete] = useState<string | null>(null);
    const navigate = useNavigate();

    const fetchData = useCallback(async (category?: string) => {
        try {
            let url = '/quotes.json';

            if (category !== 'all') {
                url = `/quotes.json?orderBy="category"&equalTo="${category}"`;
            }

            const response = await axiosApi.get<IApiQuote>(url);
            if (response.data) {
                const quotes = Object.keys(response.data).map((key) => {
                    return {
                        ...response.data[key],
                        id: key,
                    };
                });
                setQuotes(quotes);
            }
        } finally {
        }
    }, []);

    const onDelete = useCallback(async () => {
        if (quoteToDelete) {
            try {
                await axiosApi.delete(`/quotes/${quoteToDelete}.json`);
                void fetchData(category!);
                setShowDialog(false);
                setQuoteToDelete(null);
            } catch (error) {
                alert('Error deleting quote');
            }
        }
    }, [category, fetchData, quoteToDelete]);

    const confirmDelete = useCallback((id: string) => {
        setQuoteToDelete(id);
        setShowDialog(true);
    }, []);

    const cancelDelete = useCallback(() => {
        setShowDialog(false);
        setQuoteToDelete(null);
    }, []);

    const getCategoryQuotes = useCallback((category: string) => {
        setCategory(category);
        void fetchData(category);
    }, [fetchData]);

    const onUpdate = useCallback((id: string) => {
        navigate(`/edit-quote/${id}`);
    }, [navigate]);

    useEffect(() => {
        void fetchData();
    }, [fetchData]);

    return (
        <div className="quotes-container">
            <h2 className="quotes-header">Quotes</h2>
            <div className="category-buttons">
                <button
                    className={`category-button ${category === 'all' ? 'active' : ''}`}
                    onClick={() => getCategoryQuotes('all')}
                >
                    All
                </button>
                {CATEGORIES.map((categoryItem) => (
                    <button
                        key={categoryItem.id}
                        className={`category-button ${category === categoryItem.id ? 'active' : ''}`}
                        onClick={() => getCategoryQuotes(categoryItem.id)}
                    >
                        {categoryItem.title}
                    </button>
                ))}
            </div>

            {quotes.length > 0 ? (
                <div className="quotes-grid">
                    {quotes.map((quote) => (
                        <div key={quote.id} className="quote-card">
                            <p className="quote-text">"{quote.text}"</p>
                            <p className="quote-author">- {quote.author}</p>
                            <button
                                className="delete-button"
                                onClick={() => confirmDelete(quote.id!)}
                            >
                                Delete
                            </button>
                            <button
                                className="update-button"
                                onClick={() => onUpdate(quote.id!)}
                            >
                                Update
                            </button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="no-quotes">
                    <p>No quotes available</p>
                </div>
            )}

            {showDialog && (
                <div className="confirmation-modal">
                    <div className="modal-overlay" onClick={cancelDelete}></div>
                    <div className="modal-content">
                        <h3>Delete Quote</h3>
                        <p>Are you sure you want to delete this quote?</p>
                        <div className="modal-buttons">
                            <button className="modal-button confirm" onClick={onDelete}>Yes</button>
                            <button className="modal-button cancel" onClick={cancelDelete}>No</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default QuotesPage;
