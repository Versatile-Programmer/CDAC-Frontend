import React, { useState } from 'react';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authTokenState } from '../recoil/atoms/authState';
import fetchUser from '../utils/fetchUser';
import { API_BASE_URL } from '../config/env.config';

function PurchaseDetailsForm() {

    const domainId = useParams().domainId;
    const webmasterId = fetchUser().id

    const authToken = useRecoilValue(authTokenState)
    const navigate = useNavigate


    const [formData, setFormData] = useState({
        domainExpiryDate: '',
        finalPeriod: '',
        dateOfPurchase: '',
        purchaseType: '',
        proofOfWork: null, // This will be Base64 string
    });

    const purchaseTypes = ['NEW_REGISTRATION', 'RENEWAL'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const [,base64Enc] = reader.result.split(',')
                setFormData((prev) => ({
                    ...prev,
                    proofOfWork: base64Enc, // base64 string
                }));
            };
            reader.readAsDataURL(file); // This reads file as base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            domainExpiryDate: formData.domainExpiryDate,
            finalPeriod: formData.finalPeriod,
            dateOfPurchase: formData.dateOfPurchase,
            purchaseType: formData.purchaseType,
            proofOfWorkBase64Encoded: formData.proofOfWork, // Base64 field
            domainId:domainId,
            webMasterId:webmasterId,
        };

        const url = `${API_BASE_URL}/purchase/${formData.purchaseType === 'NEW_REGISTRATION'?
            'registerDomain':'renewDomain'}`
        try {
            const response = await axios.post(url, payload, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${authToken}`
                },
            });
            alert('Purchase details submitted successfully!');
            setTimeout(() => {
                navigate('/dasboard')
                
            }, 1000);
            
            
        } catch (error) {
            console.error('Error submitting purchase details:', error);
            alert('Submission failed!');
        }
    };

    return (
        <MainLayout>
            <form onSubmit={handleSubmit} className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow-md space-y-6">
                <div>
                    <label className="block font-semibold">Date of Purchase</label>
                    <input
                        type="datetime-local"
                        name="dateOfPurchase"
                        value={formData.dateOfPurchase}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Domain Expiry Date</label>
                    <input
                        type="datetime-local"
                        name="domainExpiryDate"
                        value={formData.domainExpiryDate}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Final Period (in years)</label>
                    <input
                        type="number"
                        name="finalPeriod"
                        value={formData.finalPeriod}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    />
                </div>

                <div>
                    <label className="block font-semibold">Purchase Type</label>
                    <select
                        name="purchaseType"
                        value={formData.purchaseType}
                        onChange={handleChange}
                        required
                        className="w-full border rounded px-3 py-2"
                    >
                        <option value="">-- Select Purchase Type --</option>
                        {purchaseTypes.map((type) => (
                            <option key={type} value={type}>
                                {type.replace('_', ' ')}
                            </option>
                        ))}
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">Upload Proof of Work</label>
                    <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileChange}
                        required
                        className="w-full"
                    />
                </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
                >
                    Submit Purchase Details
                </button>
            </form>
        </MainLayout>
    );
};

export default PurchaseDetailsForm;
