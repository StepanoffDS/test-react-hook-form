import {
	Controller,
	SubmitErrorHandler,
	SubmitHandler,
	useForm,
} from 'react-hook-form'
import './App.css'

interface IMyForm {
	name: string
	age: number
}

function App() {
	const {
		register,
		handleSubmit,
		clearErrors,
		reset,
		setValue,
		watch,
		control,
		formState: { errors },
	} = useForm<IMyForm>({
		defaultValues: {},
	})

	const submitHandler: SubmitHandler<IMyForm> = (data) => {
		console.log(data)
	}

	const errorHandler: SubmitErrorHandler<IMyForm> = (data) => {
		console.log(data)
	}

	const isName = (value: string) => {
		return value.length > 3
	}

	return (
		<>
			<form
				className='form'
				onSubmit={handleSubmit(submitHandler, errorHandler)}
			>
				<input
					type='text'
					{...register('name', { required: true, validate: isName })}
					aria-invalid={errors.name ? 'true' : 'false'}
				/>
				<Controller
					name='age'
					control={control}
					render={({ field }) => <input {...field} type='number' />}
				/>
				<button type='submit'>Submit</button>
				<button type='button' onClick={() => reset()}>
					Clear Form
				</button>
				<button type='button' onClick={() => clearErrors()}>
					Clear Errors
				</button>
				<button type='button' onClick={() => setValue('name', 'John')}>
					Set Name
				</button>
			</form>
			{watch('name')}
			<br />
			{watch('age')}
		</>
	)
}

export default App
