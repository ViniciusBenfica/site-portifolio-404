import router from "next/router"

import styles from "../../styles/script.module.scss"
import Bottom from '../../components/Bottom'
import close from "../../public/close.png"
import Image from "next/image"

import { useEffect, useState } from "react"

import {api} from "../../services/api"

import Header from "../../components/Header"
import { GetStaticPaths, GetStaticProps } from "next"

interface Script{
    id: number;
    name: string;
    price: string;
    thumbnail: string;
    image1: string
    image2: string
    image3: string
    image4: string
    resume: string;
    discord: string;
    description: string;
    characteristics: string
    video: string;
}

export default function script({data}: {data: Script}){
    const [fotoInicial, setFotoInicial] = useState<string>(data.image1)
    const [QRCode, setQRCode] = useState<string>("")
    const [seeQRCode, setSeeQRCode] = useState<string>("none")

    useEffect(() => {
        if(QRCode){
            setSeeQRCode("flex")
        }
    },[QRCode])

    async function buyScript(): Promise<void>{
        try{
            const {data} = await api.post("http://localhost:8001/user/buy",
            {data:{}},
            {headers: {Authorization: `Bearer ${localStorage.getItem('tokenJWT')}` }})
            setQRCode(data)
        }catch(Error){
            localStorage.setItem("tokenJWT","");
            router.push('/identification')
            alert('A sessao expirou')
        }
    }

    return(
        <div>
            <Header></Header>

            <div style={{display: seeQRCode}} className={styles.payment}>
                <div><img src={QRCode} width={245} height={245}/></div>
                <div>
                    <img className={styles.buttonClose} onClick={() => setSeeQRCode("none")} src="https://cdn-icons-png.flaticon.com/512/106/106830.png" width={30} height={30}></img>
                    <div className={styles.paymentTitle}>PAGAMENTO</div>
                    <p>Escaneie o qrcode para efetuar o pagamento e receber o download do script.</p>
                    <p>Valor: {data.price}</p>
                    <div className={styles.paymentScript}>Compra: Cam System</div>
                </div>
                
            </div>
            <div className={styles.background}>
                <div><h1>DESCRIÇÃO</h1></div>
            </div>
            <div className={styles.item}>
                <div className={styles.video}>
                    <img className={styles.fotoInicial} src={fotoInicial} width={600} height={350}/>
                    <div className={styles.photos}>
                        <img onClick={() => setFotoInicial(data.image1)} src={data.image1} width={140} height={80}/>
                        <img onClick={() => setFotoInicial(data.image2)} src={data.image2} width={140} height={80}/>
                        <img onClick={() => setFotoInicial(data.image3)} src={data.image3} width={140} height={80}/>
                        <img onClick={() => setFotoInicial(data.image4)} src={data.image4} width={140} height={80}/>
                    </div>
                </div>
                <div className={styles.productInfos}>
                    <h1 className={styles.scriptName}>{data.name}</h1>
                    <div className={styles.description}>{data.description}</div>
                    <div className={styles.scriptPrice}>{data.price}</div>
                    <div onClick={() => buyScript()} className={styles.buttonBuy}>COMPRAR</div>
                </div>
            </div>

            <div className={styles.moreDetails}>

                <div>MAIS DETALHES</div>

                <iframe src={data.video}></iframe>

                <div className={styles.characteristics}>
                    {(data.characteristics).split(";").map((item) => (
                        <p>- {item}</p>
                    ))}
                </div>
                
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

    const paths = data.map((item: any) => {
        return {params: {script: item.name}}
    })

    return {
      paths,
      fallback: false,
    }
}
  
export const getStaticProps: GetStaticProps = async ({params}) => {
    const {data} = await api.get(`/script/name/${params.script}`)
    return{
        props: {data}
    }
}