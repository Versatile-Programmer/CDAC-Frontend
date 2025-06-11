

import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import MainLayout from '../layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authTokenState } from '../recoil/atoms/authState';
import fetchUser from '../utils/fetchUser';
import { API_BASE_URL } from '../config/env.config';
import ConfirmationModal from '../components/modals/ConfirmationModal';
import { notifySuccess, notifyError } from '../utils/toastUtils';
import { FiCalendar, FiClock, FiFileText, FiList, FiSend, FiLoader } from 'react-icons/fi';

// Function to get current date/time in 'YYYY-MM-DDTHH:MM' format
const getCurrentDateTimeLocal = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
    return now.toISOString().slice(0, 16);
};

function PurchaseDetailsForm() {
    const { domainId } = useParams();
    const webmasterId = fetchUser()?.id;
    const authToken = useRecoilValue(authTokenState);
    const navigate = useNavigate();

    // State management
    const [formData, setFormData] = useState({
        domainExpiryDate: '',
        finalPeriod: '',
        dateOfPurchase: getCurrentDateTimeLocal(),
        purchaseType: '',
        proofOfWork: null,
    });
    const [loading, setLoading] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [error, setError] = useState(null);

    const fetchInitialData = useCallback(async () => {
        // ... (data fetching logic remains the same)
        if (!domainId || !authToken) {
            setError("Required information is missing to load this page.");
            setLoading(false);
            return;
        }
        try {
            const response = await axios.get(
                `${API_BASE_URL}/domain/purchase/domain/${domainId}`, {
                    headers: { 'Authorization': `Bearer ${authToken}` }
                }
            );
            const { desiredPeriod, renewal } = response.data;
            
            setFormData(prev => ({
                ...prev,
                finalPeriod: desiredPeriod || '',
                purchaseType: renewal ? 'RENEWAL' : 'NEW_REGISTRATION',
            }));
            setError(null);
        } catch (err) {
            console.error("Failed to fetch initial purchase data:", err);
            setError("Could not load initial domain data. Please try again.");
            notifyError("Could not load initial domain data.");
        } finally {
            setLoading(false);
        }
    }, [domainId, authToken]);

    useEffect(() => {
        fetchInitialData();
    }, [fetchInitialData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        // ... (file change logic remains the same)
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) { // 5MB limit
                notifyError("File size cannot exceed 5MB.");
                e.target.value = '';
                return;
            }
            const reader = new FileReader();
            reader.onloadend = () => {
                const [, base64Enc] = reader.result.split(',');
                setFormData(prev => ({ ...prev, proofOfWork: base64Enc }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!formData.dateOfPurchase || !formData.domainExpiryDate || !formData.proofOfWork) {
            notifyError("Please fill in all required fields.");
            return;
        }
        setIsModalOpen(true);
    };

    const handleConfirmSubmit = async () => {
        // ... (submission logic remains the same)
        setIsModalOpen(false);
        setIsSubmitting(true);

        const payload = {
            domainExpiryDate: formData.domainExpiryDate,
            finalPeriod: formData.finalPeriod,
            dateOfPurchase: formData.dateOfPurchase,
            purchaseType: formData.purchaseType,
            proofOfWorkBase64Encoded: formData.proofOfWork,
            domainId: domainId,
            webMasterId: webmasterId,
        };

        const url = `${API_BASE_URL}/purchase/${formData.purchaseType === 'NEW_REGISTRATION' ? 'registerDomain' : 'renewDomain'}`;
        
        try {
            await axios.post(url, payload, {
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authToken}` },
            });
            notifySuccess('Purchase details submitted successfully!');
            setTimeout(() => navigate('/dashboard'), 1500);
        } catch (err) {
            console.error('Error submitting purchase details:', err);
            const errorMsg = err.response?.data?.message || 'Submission failed! Please try again.';
            notifyError(errorMsg);
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderFormField = (label, name, type, icon, required = true, disabled = false, options = []) => (
        <div>
            <label htmlFor={name} className="block text-sm font-bold text-gray-700 mb-2">{label}</label>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                    {icon}
                </span>
                {type === 'select' ? (
                     <select
                        id={name} name={name} value={formData[name]} onChange={handleChange} required={required} disabled={disabled}
                        // --- THEME UPDATE: Changed focus ring to blue ---
                        className={`w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
                     >
                        <option value="">-- Select --</option>
                        {options.map(opt => <option key={opt.value} value={opt.value}>{opt.label}</option>)}
                     </select>
                ) : (
                    <input
                        id={name} type={type} name={name} value={formData[name]} onChange={handleChange} required={required} disabled={disabled}
                        // --- THEME UPDATE: Changed focus ring to blue ---
                        className={`w-full pl-10 p-3 border rounded-lg shadow-sm focus:ring-2 ${disabled ? 'bg-gray-200 cursor-not-allowed' : 'bg-white'} focus:ring-blue-500 focus:border-blue-500`}
                    />
                )}
            </div>
        </div>
    );
    
    if (loading) {
        return (
            <MainLayout>
                {/* --- THEME UPDATE: Changed spinner color to blue --- */}
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                    <FiLoader className="animate-spin text-5xl text-blue-600" />
                </div>
            </MainLayout>
        );
    }
    
    if (error) {
        return (
            <MainLayout>
                <div className="p-8 text-center bg-red-50 min-h-screen">
                    <p className="text-red-600 font-semibold">{error}</p>
                </div>
            </MainLayout>
        );
    }

    return (
        <MainLayout>
             <ConfirmationModal
                isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onConfirm={handleConfirmSubmit}
                title="Confirm Submission" message="Are you sure you want to submit these purchase details?" confirmText="Yes, Submit"
            />
            {/* --- THEME UPDATE: Changed background gradient to blue --- */}
            <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-200 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-8 md:p-12 space-y-8 border border-gray-200">
                    {/* --- THEME UPDATE: Changed title color to blue --- */}
                    <h2 className="text-3xl font-bold text-center text-blue-800">Domain Purchase Details</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {renderFormField("Purchase Type", "purchaseType", "select", <FiList/>, true, true, [
                            { value: 'NEW_REGISTRATION', label: 'New Registration'},
                            { value: 'RENEWAL', label: 'Renewal' }
                        ])}
                        
                        {renderFormField("Final Period (in years)", "finalPeriod", "number", <FiClock/>, true, false)}

                        {renderFormField("Date of Purchase", "dateOfPurchase", "datetime-local", <FiCalendar/>)}

                        {renderFormField("Domain Expiry Date", "domainExpiryDate", "datetime-local", <FiCalendar/>)}

                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">Upload Proof of Work</label>
                            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg">
                                <div className="space-y-1 text-center">
                                    <FiFileText className="mx-auto h-12 w-12 text-gray-400" />
                                    <div className="flex text-sm text-gray-600">
                                        {/* --- THEME UPDATE: Changed link color to blue --- */}
                                        <label htmlFor="file-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-700 focus-within:outline-none">
                                            <span>Upload a file</span>
                                            <input id="file-upload" name="proofOfWork" type="file" className="sr-only" onChange={handleFileChange} accept=".pdf,.jpg,.jpeg,.png" required />
                                        </label>
                                        <p className="pl-1">or drag and drop</p>
                                    </div>
                                    <p className="text-xs text-gray-500">PDF, PNG, JPG up to 5MB</p>
                                </div>
                            </div>
                            {formData.proofOfWork && <p className="text-sm text-green-600 mt-2 font-medium">File selected and ready for upload.</p>}
                        </div>

                        <div className="pt-4">
                            {/* --- THEME UPDATE: Changed button to solid blue --- */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-lg text-md font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-300 disabled:cursor-not-allowed transition-all duration-300"
                            >
                                {isSubmitting ? (
                                    <>
                                        <FiLoader className="animate-spin -ml-1 mr-3 h-5 w-5"/>
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <FiSend className="mr-2 h-5 w-5"/>
                                        Submit Purchase Details
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </MainLayout>
    );
}

export default PurchaseDetailsForm;