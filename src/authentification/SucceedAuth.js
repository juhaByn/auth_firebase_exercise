const SucceedAuth = ({text='succed'}) =>(
    <div className='w-full flex flex-col justify-center items-center'>
        <span className="material-symbols-outlined text-blue-700 text-6xl">
            verified_user
        </span>
        <p className='font-bold'>{text}</p>
    </div>
);

export default SucceedAuth;