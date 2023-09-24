import { Layout } from '@/components'

import '@/styles/globals.scss'

const MyApp = ({ Component, pageProps }: any) => {

    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    )
}
export default MyApp