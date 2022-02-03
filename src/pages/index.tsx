import { GetStaticProps} from 'next';
import Head from 'next/head';
import Image from 'next/image'

import styles from './home.module.scss'
import avatar from '../../public/images/avatar.svg'
import { SubscribeButton } from '../components/SubscribeButton';
import { stripe } from '../services/stripe';

// Client-side: quando nao precisa de indexação. quando a pagina carreega atraves da soliticação do usuario. 
// Server-side: precisa de dados dinamicos do usuario que está acessando, do contexto da requisição
// Static Site Generation: utilizar para gerar html afim de compartilhar com todas as pessas. Pagians iguais pra todo mundo

// Conteudo (SSG)
// comentarios (client-side)

interface HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({ product }: HomeProps) { 
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>

      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>Hey, welcome</span>
          <h1>News about the <span>React</span> world.</h1>
          <p>
            Get acess to all the publications <br />
            <span>for {product.amount} month</span>
          </p>
          <SubscribeButton priceId={product.priceId} />
        </section>

        <Image src={avatar} alt="Girl codding" />
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KP8Z8GGTXL2WxJjgAqyNAIa')

  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 24 hours
  }
}