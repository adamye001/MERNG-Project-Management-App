export default function Spinner() {
	return (
		<div className='d-flex justify-content-center'>
			<div
				className='spinner-border text-primary'
				role='status'
			>
				<span className='sr-only'></span>
			</div>
		</div>
	);
}
