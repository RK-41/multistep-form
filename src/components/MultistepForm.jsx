/* eslint-disable no-unused-vars */
import { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const personalDetailsSchema = Yup.object({
	firstName: Yup.string().required('First Name is required'),
	lastName: Yup.string().required('Last Name is required'),
	email: Yup.string()
		.email('Invalid email address')
		.required('Email is required'),
});

const addressSchema = Yup.object({
	addressLine1: Yup.string().required('Address Line 1 is required'),
	city: Yup.string().required('City is required'),
	pinCode: Yup.string()
		.matches(/^[0-9]{6}$/, 'PIN Code must be a 6-digit number')
		.required('PIN Code is required'),
});

const paymentDetailsSchema = Yup.object({
	cardNumber: Yup.string()
		.matches(/^[0-9]{12}$/, 'Card Number must be a 12-digit number')
		.required('Card Number is required'),
	expirationDate: Yup.string()
		.matches(
			/^(0[1-9]|1[0-2])\/([0-9]{2})$/,
			'Expiration Date must be in mm/yy format'
		)
		.required('Expiration Date is required'),
	cvv: Yup.string()
		.matches(/^[0-9]{3}$/, 'CVV must be a 3-digit number')
		.required('CVV is required'),
});

const MultiStepForm = () => {
	const [step, setStep] = useState(0);
	const [formData, setFormData] = useState({
		firstName: '',
		lastName: '',
		email: '',
		addressLine1: '',
		city: '',
		pinCode: '',
		cardNumber: '',
		expirationDate: '',
		cvv: '',
	});
	const [submitted, setSubmitted] = useState(false);

	const handleNext = (values) => {
		setFormData({ ...formData, ...values });
		setStep(step + 1);
	};

	const handleBack = () => {
		setStep(step - 1);
	};

	const handleSubmit = (values) => {
		setFormData({ ...formData, ...values });
		setSubmitted(true);
	};

	const resetForm = () => {
		setFormData({
			firstName: '',
			lastName: '',
			email: '',
			addressLine1: '',
			city: '',
			pinCode: '',
			cardNumber: '',
			expirationDate: '',
			cvv: '',
		});
		setStep(0);
		setSubmitted(false);
	};

	const steps = [
		{
			label: 'Personal Details',
			validationSchema: personalDetailsSchema,
			content: (
				<>
					<div className='form-group'>
						<label htmlFor='firstName'>First Name</label>
						<Field
							name='firstName'
							type='text'
							id='firstName'
							className='form-control'
							placeholder='Enter your first name'
						/>
						<ErrorMessage
							name='firstName'
							component='div'
							className='error-message'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='lastName'>Last Name</label>
						<Field
							name='lastName'
							type='text'
							id='lastName'
							className='form-control'
							placeholder='Enter your last name'
						/>
						<ErrorMessage
							name='lastName'
							component='div'
							className='error-message'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='email'>Email</label>
						<Field
							name='email'
							type='email'
							id='email'
							className='form-control'
							placeholder='Enter your email address'
						/>
						<ErrorMessage
							name='email'
							component='div'
							className='error-message'
						/>
					</div>
				</>
			),
		},
		{
			label: 'Address',
			validationSchema: addressSchema,
			content: (
				<>
					<div className='form-group'>
						<label htmlFor='addressLine1'>Address Line 1</label>
						<Field
							name='addressLine1'
							type='text'
							id='addressLine1'
							className='form-control'
							placeholder='Enter your address'
						/>
						<ErrorMessage
							name='addressLine1'
							component='div'
							className='error-message'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='city'>City</label>
						<Field
							name='city'
							type='text'
							id='city'
							className='form-control'
							placeholder='Enter your city'
						/>
						<ErrorMessage
							name='city'
							component='div'
							className='error-message'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='pinCode'>PIN Code</label>
						<Field
							name='pinCode'
							type='text'
							id='pinCode'
							className='form-control'
							placeholder='Enter your PIN code'
						/>
						<ErrorMessage
							name='pinCode'
							component='div'
							className='error-message'
						/>
					</div>
				</>
			),
		},
		{
			label: 'Payment Details',
			validationSchema: paymentDetailsSchema,
			content: (
				<>
					<div className='form-group'>
						<label htmlFor='cardNumber'>Card Number</label>
						<Field
							name='cardNumber'
							type='text'
							id='cardNumber'
							className='form-control'
							placeholder='Enter your 12-digit card number'
						/>
						<ErrorMessage
							name='cardNumber'
							component='div'
							className='error-message'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='expirationDate'>Expiration Date</label>
						<Field
							name='expirationDate'
							type='text'
							id='expirationDate'
							className='form-control'
							placeholder='MM/YY'
						/>
						<ErrorMessage
							name='expirationDate'
							component='div'
							className='error-message'
						/>
					</div>
					<div className='form-group'>
						<label htmlFor='cvv'>CVV</label>
						<Field
							name='cvv'
							type='text'
							id='cvv'
							className='form-control'
							placeholder='Enter your 3-digit CVV'
						/>
						<ErrorMessage
							name='cvv'
							component='div'
							className='error-message'
						/>
					</div>
				</>
			),
		},
	];

	return (
		<div>
			<h1>Multistep Form</h1>
			<div className='step-indicator'>
				{steps.map((_, index) => (
					<div
						key={index}
						className={`step ${index <= step ? 'active' : ''}`}
					></div>
				))}
			</div>
			{!submitted ? (
				<Formik
					initialValues={formData}
					validationSchema={steps[step].validationSchema}
					onSubmit={step === steps.length - 1 ? handleSubmit : handleNext}
				>
					{({ values }) => (
						<Form className='form-container'>
							<h2>{steps[step].label}</h2>
							{steps[step].content}
							<div className='button-container'>
								{step > 0 && (
									<button type='button' className='btn' onClick={handleBack}>
										Back
									</button>
								)}
								<button type='submit' className='btn'>
									{step === steps.length - 1 ? 'Submit' : 'Next'}
								</button>
							</div>
						</Form>
					)}
				</Formik>
			) : (
				<div className='form-result'>
					<h2>Form Submitted Successfully!</h2>
					<div>
						<p>
							<strong>First Name:</strong> {formData.firstName}
						</p>
						<p>
							<strong>Last Name:</strong> {formData.lastName}
						</p>
						<p>
							<strong>Email:</strong> {formData.email}
						</p>
						<p>
							<strong>Address Line 1:</strong> {formData.addressLine1}
						</p>
						<p>
							<strong>City:</strong> {formData.city}
						</p>
						<p>
							<strong>PIN Code:</strong> {formData.pinCode}
						</p>
						<p>
							<strong>Card Number:</strong> {formData.cardNumber}
						</p>
						<p>
							<strong>Expiration Date:</strong> {formData.expirationDate}
						</p>
						<p>
							<strong>CVV:</strong> {formData.cvv}
						</p>
					</div>
					<button className='btn submit-another-form-btn' onClick={resetForm}>
						Submit Another Form
					</button>
				</div>
			)}
		</div>
	);
};

export default MultiStepForm;
