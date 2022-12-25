const ReadMode = ({onClick, data}) => (
    <div className='flex items-center '>
        <p>{data}</p>
        <button type='submit' className='text-gray-500 w-8' onClick={onClick}>
        <span className="material-symbols-outlined">edit</span>
        </button>
    </div>
);

export default ReadMode;