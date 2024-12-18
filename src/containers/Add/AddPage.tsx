import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { INewQuote } from "../../types";
import axiosApi from "../../axiosApi";
import Spinner from "../../components/Spinner/Spinner";
import { CATEGORIES } from "../../constants";
import './AddPage.css'; // Make sure you have a separate CSS file for this component

const AddPage = () => {
    const [quote, setQuote] = useState<INewQuote>({
        author: '',
        text: '',
        category: '',
        id: '',
    });

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<string | null>(null);

    const quoteChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;

        setQuote((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const onFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (quote.text && quote.author && quote.category) {
            const selectedCategory = CATEGORIES.find((category) => category.id === quote.category);
            const data: INewQuote = {
                author: quote.author,
                text: quote.text,
                category: selectedCategory?.id!,
                id: quote.id,
            };

            try {
                await axiosApi.post('/quotes.json', data);
                setMessage("Quote added successfully!");
                setTimeout(() => navigate('/'), 1500);
            } catch (error) {
                setMessage("An error occurred. Please try again.");
            } finally {
                setLoading(false);
            }
        } else {
            setMessage("Please fill in all fields.");
            setLoading(false);
        }
    };

    let form = (
        <form onSubmit={onFormSubmit} className="quote-form">
            <div className="form-group">
                <label htmlFor="category" className="form-label">Category:</label>
                <select
                    id="category"
                    name="category"
                    className="form-control"
                    value={quote.category}
                    onChange={quoteChange}
                >
                    <option value="">Select a category</option>
                    {CATEGORIES.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.title}
                        </option>
                    ))}
                </select>
            </div>

            <div className="form-group">
                <label htmlFor="author" className="form-label">Author:</label>
                <input
                    id="author"
                    type="text"
                    name="author"
                    className="form-control"
                    value={quote.author}
                    onChange={quoteChange}
                />
            </div>

            <div className="form-group">
                <label htmlFor="text" className="form-label">Quote:</label>
                <textarea
                    id="text"
                    name="text"
                    className="form-control"
                    value={quote.text}
                    onChange={quoteChange}
                />
            </div>

            <button
                type="submit"
                className="btn btn-primary"
            >
                Save
            </button>
        </form>
    );

    if (loading) {
        form = <Spinner />;
    }

    return (
        <div className="container">
            <h2 className="text-center add-quote-header">Add New Quote</h2>
            {message && (
                <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-danger'}`}>
                    {message}
                </div>
            )}
            <div className="d-flex flex-column align-items-center">
                {form}
            </div>
        </div>
    );
};

export default AddPage;
