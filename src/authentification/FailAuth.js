//fail login handler
const FailAuth = ({error='', text='error!'}) => {
    if(error.includes('user-not-found')){
        return(
        <span className='text-red-700 relative'>
            <span className="material-symbols-outlined absolute -right-6 bottom-0">dangerous</span>
            <span>{text}</span>
        </span>
        );
    }else if(error.includes('auth/wrong-password')){
        return(
        <span className='text-red-700 relative'>
            <span className="material-symbols-outlined absolute -right-6 bottom-0">dangerous</span>
            <span>{text}</span>
        </span>
        );
    }else if(error.includes('email-already-in-use')){
        return(
        <span className='text-red-700 relative'>
            <span className="material-symbols-outlined absolute -right-6 bottom-0">dangerous</span>
            <span>user already exist</span>
        </span>
        );
    }
}

export default FailAuth