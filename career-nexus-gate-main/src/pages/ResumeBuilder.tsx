import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Mail, Phone, Building2, Upload } from 'lucide-react';

const countryPhoneRules: Record<string, { code: string; length: number }> = {
    india: { code: '+91', length: 10 },
    usa: { code: '+1', length: 10 },
    uk: { code: '+44', length: 10 },
};

export default function ResumeBuilder() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
    });

    const [formErrors, setFormErrors] = useState<Record<string, string>>({});
    const [country, setCountry] = useState<'india' | 'usa' | 'uk'>('usa');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [attachment, setAttachment] = useState<File | null>(null);

    const fileInputRef = useRef<HTMLInputElement>(null);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const validateField = (field: string, value: string): string => {
        let error = '';
        switch (field) {
            case 'email':
                if (!value) error = 'Email is required';
                else if (!emailRegex.test(value)) error = 'Enter a valid email address';
                break;
            case 'phone':
                const { length } = countryPhoneRules[country];
                if (value && !/^\d*$/.test(value)) error = 'Only numbers allowed';
                else if (value && value.length !== length) error = `Must be ${length} digits`;
                break;
            case 'name':
                if (!value.trim()) error = 'Name is required';
                break;
        }
        return error;
    };

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (formErrors[field]) {
            setFormErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
        }
    };

    const handleSubmit = async (e: React.MouseEvent) => {
        e.preventDefault();

        const errors: Record<string, string> = {};
        Object.keys(formData).forEach((key) => {
            const error = validateField(key, formData[key as keyof typeof formData] || '');
            if (error) errors[key] = error;
        });

        if (!attachment) {
            errors['attachment'] = 'Please upload your resume';
        }

        setFormErrors(errors);

        if (Object.keys(errors).length > 0) return;

        try {
            setIsSubmitting(true);

            const formDataToSend = new FormData();
            formDataToSend.append('name', formData.name);
            formDataToSend.append('email', formData.email);
            formDataToSend.append('phone', formData.phone);
            formDataToSend.append('country_code', countryPhoneRules[country].code);

            if (attachment) {
                formDataToSend.append('resume', attachment);
            }

            // Logic: If on localhost, point to live site. If live, point to local file.
            // REPLACE 'syntrionixtechnologies.com' with your actual domain if different.
            const endpoint = window.location.hostname === 'localhost'
                ? 'https://syntrionixtechnologies.com/resume-builder.php' // Assumed endpoint
                : '/resume-builder.php';

            const res = await fetch(endpoint, {
                method: 'POST',
                body: formDataToSend,
            });

            // Handle non-JSON responses (like 404 or 500 errors from PHP)
            if (!res.ok) throw new Error('Network response was not ok');

            const result = await res.json();

            if (result.status !== 'success') {
                throw new Error(result.message || 'Server failed to submit resume');
            }

            setSubmitted(true);

            setTimeout(() => {
                setSubmitted(false);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                });
                setAttachment(null);
                if (fileInputRef.current) {
                    fileInputRef.current.value = '';
                }
            }, 3000);

        } catch (err) {
            console.error(err);
            alert('Failed to submit resume.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-950">
            {/* 🎉 SUCCESS OVERLAY */}
            {submitted && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20
                          rounded-3xl p-10 max-w-md w-full text-center
                          shadow-2xl animate-bounce">

                        <div className="text-5xl mb-4">🎉</div>
                        <h2 className="text-3xl font-bold text-white mb-2">Thank You!</h2>
                        <p className="text-gray-300 mb-4">Your resume has been submitted successfully.</p>
                        <p className="text-sm text-gray-400">Closing...</p>
                    </div>
                </div>
            )}

            {/* Hero Section */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Animated Grid Background */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute inset-0" style={{
                        backgroundImage: 'linear-gradient(rgba(78, 137, 232, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(149, 184, 240, 0.5) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}></div>
                </div>

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-slate-900/50 to-cyan-900/20"></div>

                {/* Floating Orbs */}
                <div className="absolute top-20 right-20 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-20 left-20 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

                <div className="relative z-10 w-full py-20 px-4 sm:px-6 lg:px-8">
                    <div className="max-w-7xl mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                            {/* Left Content */}
                            <div className="space-y-8">
                                <div>
                                    <h1 className="text-6xl lg:text-7xl font-bold leading-tight mb-4">
                                        <span className="block text-white">Build Your</span>
                                        <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent">
                                            Resume
                                        </span>
                                    </h1>
                                    <div className="h-1 w-32 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                                </div>

                                <p className="text-xl text-gray-300 leading-relaxed">
                                    Looking for a professional resume? Upload your resume and let our experts craft a polished, job-ready profile for you.
                                </p>

                            </div>

                            {/* Right Form Card */}
                            <div className="relative">
                                {/* Glow Effects */}
                                <div className="absolute -top-8 -right-8 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl"></div>
                                <div className="absolute -bottom-8 -left-8 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl"></div>

                                {/* Glass Card */}
                                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl hover:border-white/30 transition-all duration-300 overflow-hidden">

                                    {/* Form Header */}
                                    <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border-b border-white/10 p-8">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-lg">
                                                <Upload className="w-6 h-6 text-white" />
                                            </div>
                                            <h3 className="text-2xl font-bold text-white">Submit Resume</h3>
                                        </div>
                                        <p className="text-gray-300">Upload your resume to get started.</p>
                                    </div>

                                    {/* Form Fields */}
                                    <div className="p-8 space-y-6">

                                        {/* Name and Email Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="name" className="text-white text-sm font-medium">
                                                    Full Name <span className="text-red-400">*</span>
                                                </Label>
                                                <Input
                                                    id="name"
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                                    placeholder="John Doe"
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 h-12"
                                                />
                                                {formErrors.name && (
                                                    <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                                                )}
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="email" className="text-white text-sm font-medium">
                                                    Email Address <span className="text-red-400">*</span>
                                                </Label>
                                                <Input
                                                    id="email"
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                                    placeholder="john@example.com"
                                                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 h-12"
                                                />
                                                {formErrors.email && (
                                                    <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* Country and Phone Row */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <Label htmlFor="country" className="text-white text-sm font-medium">
                                                    Country Code
                                                </Label>
                                                <Select
                                                    value={country}
                                                    onValueChange={(val) => setCountry(val as typeof country)}
                                                >
                                                    <SelectTrigger className="bg-white/5 border-white/10 text-white focus:border-blue-400 focus:ring-blue-400/20 h-12">
                                                        <SelectValue placeholder="Select country" />
                                                    </SelectTrigger>
                                                    <SelectContent className="bg-slate-800 border-white/10 text-white">
                                                        <SelectItem value="usa" className="focus:bg-white/10">
                                                            🇺🇸 USA (+1)
                                                        </SelectItem>
                                                        <SelectItem value="india" className="focus:bg-white/10">
                                                            🇮🇳 India (+91)
                                                        </SelectItem>
                                                        <SelectItem value="uk" className="focus:bg-white/10">
                                                            🇬🇧 UK (+44)
                                                        </SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor="phone" className="text-white text-sm font-medium">
                                                    Phone Number
                                                </Label>
                                                <div className="flex gap-2">
                                                    <span className="inline-flex items-center px-4 rounded-lg bg-white/5 border border-white/10 text-gray-300 text-sm font-medium h-12">
                                                        {countryPhoneRules[country].code}
                                                    </span>
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={formData.phone}
                                                        onChange={(e) => handleInputChange('phone', e.target.value)}
                                                        placeholder="1234567890"
                                                        maxLength={countryPhoneRules[country].length}
                                                        className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-gray-500 focus:border-blue-400 focus:ring-blue-400/20 h-12"
                                                    />
                                                </div>
                                                {formErrors.phone && (
                                                    <p className="text-red-400 text-xs mt-1">{formErrors.phone}</p>
                                                )}
                                            </div>
                                        </div>

                                        {/* File Attachment */}
                                        <div className="space-y-2">
                                            <Label htmlFor="attachment" className="text-white text-sm font-medium">
                                                Resume (PDF / DOC) <span className="text-red-400">*</span>
                                            </Label>
                                            <Input
                                                id="attachment"
                                                type="file"
                                                ref={fileInputRef}
                                                accept=".pdf,.doc,.docx"
                                                onChange={(e) => setAttachment(e.target.files?.[0] || null)}
                                                className="bg-white/5 border-white/10 text-white h-12 file:bg-white/10 file:border-0 file:rounded-lg file:text-white file:px-4 file:py-2 file:mr-4 file:hover:bg-white/20 file:transition-colors"
                                            />
                                            {formErrors.attachment && (
                                                <p className="text-red-400 text-xs mt-1">{formErrors.attachment}</p>
                                            )}
                                        </div>

                                        {/* Submit Button */}
                                        <Button
                                            onClick={handleSubmit}
                                            disabled={isSubmitting}
                                            className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 hover:from-blue-600 hover:to-cyan-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isSubmitting ? (
                                                <span className="flex items-center justify-center gap-2">
                                                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                                                    </svg>
                                                    Sending...
                                                </span>
                                            ) : (
                                                'Submit Resume'
                                            )}
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
