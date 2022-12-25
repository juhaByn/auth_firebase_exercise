const WriteMode = ({onSubmit, data, onInputChange}) => (
    <form className='flex items-center justify-center' onSubmit={onSubmit}>
        <input className='m-0' type='text' value={data} onChange={onInputChange}/>
        <button type='submit' className='text-gray-500 w-8'>
        <span className="material-symbols-outlined">done</span>
        </button>
    </form>
);

export default WriteMode;