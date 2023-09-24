import loader from '@/styles/ui/loader.module.scss'

const Loader = () => {
    return (
        <div className={loader.loading}>
            <span className={loader.spinner}></span>
        </div>
    )
}

export default Loader