import Head from 'next/head'

export const NextHead = ({title}) => {
    return (
        <Head>
            <title>Swemint.io | {title}</title>
            <meta name="description" content="IPANEKO - Bringing decentralized harmony to the world." />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
    );
}

export default NextHead;