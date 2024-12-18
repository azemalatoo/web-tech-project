import React, { useState } from 'react';
import { INewQuote, TNewQuote } from "../../types";
import Spinner from "../../components/Spinner/Spinner";
import { CATEGORIES } from "../../constants";

interface Props {
    onSubmit?: (newQuote: INewQuote) => void,
    editPost?: TNewQuote,
}

const EditForm: React.FC<Props> = ({ editPost, onSubmit }) => {
    const [quote, setQuote] = useState<INewQuote>(editPost!);
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
        try {
            onSubmit!({
                ...quote,
            });
            setMessage("Quote updated successfully!");
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    let form = (
        <form onSubmit={onFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="category" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Category:</label>
                <select
                    id="category"
                    name="category"
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
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

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="author" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Author:</label>
                <input
                    id="author"
                    type="text"
                    name="author"
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}
                    value={quote.author}
                    onChange={quoteChange}
                />
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
                <label htmlFor="text" style={{ marginBottom: '5px', fontWeight: 'bold', color: '#555' }}>Quote:</label>
                <textarea
                    id="text"
                    name="text"
                    style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '5px', minHeight: '100px' }}
                    value={quote.text}
                    onChange={quoteChange}
                />
            </div>

            <button
                type="submit"
                style={{ padding: '10px 20px', backgroundColor: '#6200ea', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer', fontWeight: 'bold' }}
            >
                Save
            </button>
        </form>
    );

    if (loading) {
        form = <Spinner />;
    }

    return (
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px', fontFamily: 'Arial, sans-serif', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', borderRadius: '10px', backgroundColor: '#fff' }}>
            {message && (
                <div style={{ marginBottom: '15px', padding: '10px', backgroundColor: '#e0ffe0', color: '#008000', borderRadius: '5px', textAlign: 'center' }}>
                    {message}
                </div>
            )}
            {form}
        </div>
    );
};

export default EditForm;
