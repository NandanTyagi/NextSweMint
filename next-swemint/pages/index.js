// import Head from 'next/head'
import Image from 'next/image'
import Layout from '../components/Layout'
import NextHead from '../components/NextHead'
import styles from '../styles/Home.module.css'

export function Home() {
  return (
    <>
    <NextHead title={'IPANEKO'}/>
    <Layout/>   
    </>
  )
}

export default Home;