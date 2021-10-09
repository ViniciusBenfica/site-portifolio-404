import router from "next/router"

import styles from "../../styles/script.module.scss"
import Bottom from '../../components/Bottom'
import { useState } from "react"

import {api} from "../../services/api"

import Header from "../../components/Header"
import { GetStaticPaths, GetStaticProps } from "next"

interface Script{
    name: string;
    resumo: string;
    price: string;
    images: Array<string>;
    characteristics: [];
    description: string;
    video: string;
    discord: string;
}

export default function script({data}: {data: Script}){

    const [fotoInicial, setFotoInicial] = useState(data.images[1])
    const [fotoSecundaria, setfotoSecundaria] = useState(data.images)

    return(
        <div>
            <Header></Header>

            <div className={styles.background}>

                <div><h1>DESCRIÇÃO</h1></div>
                <div onClick={() => {router.back()}} className={styles.return}>VOLTAR</div>

            </div>

            <div className={styles.item}>
                <div className={styles.video}>
                    <img className={styles.fotoInicial} src={fotoInicial} width={600} height={350}/>
                    <div className={styles.photos}>
                        {fotoSecundaria.map((item) => (
                            <img onClick={() => setFotoInicial(item)} src={item} width={140} height={80}/>
                        ))}
                    </div>
                </div>
                
                <div className={styles.productInfos}>
                    <h1 className={styles.scriptName}>{data.name}</h1>
                    <div className={styles.description}>{data.description}</div>
                    <h2 className={styles.scriptPrice}>{data.price}</h2>
                    <div onClick={() => router.push(data.discord)} className={styles.buttonBuy}>DISCORD</div>
                </div>
            </div>

            <div className={styles.moreDetails}>

                <div>MAIS DETALHES</div>

                <iframe width="830" height="470" src={data.video}></iframe>
                
                {data.characteristics.map((item) => (
                    <p>・{item}</p>
                ))}

                <div className={styles.backtoTop}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19">
                    <path id="Polígono_3" data-name="Polígono 3" d="M12,0,24,19H0Z" fill="#b4b4b4"/>
                    </svg>
                    <div onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>VOLTAR AO TOPO DA PÁGINA</div>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="19" viewBox="0 0 24 19">
                    <path id="Polígono_3" data-name="Polígono 3" d="M12,0,24,19H0Z" fill="#b4b4b4"/>
                    </svg>
                </div>
            </div>

            <Bottom></Bottom>
        </div>
    )
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get("/script")

    const paths = data.map((item) => {
        return {params: {script: item.name}}
    })

    return {
      paths,
      fallback: false,
    }
}
  
export const getStaticProps: GetStaticProps = async ({params}) => {
    const {data} = await api.get(`/script/${params.script}`)

    return{
        props: {data}
    }
}