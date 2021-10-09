import styles from "../styles/index.module.scss"
import Header from "../components/Header"
import router from "next/router"

import Bottom from '../components/Bottom'

import { useState } from "react"
import { GetStaticProps } from "next"

import {api} from "../services/api"

interface Script{
    thumbnail: string;
    price: string;
    name: string;
    resume: string;
}

export default function index({data}: {data: Script[]}){
    
    const [scripts, setScripts] = useState(data)

    const filterScript = async (choiceValue) => {
        const {data} = await api.get(`/script/${choiceValue}`)
        setScripts(data)
    }

    return(
        <div>
            <Header></Header>
            <div className={styles.background}><h1>FIVEM STORE</h1></div>

            <div className={styles.body}>

                <div className={styles.divSelect}>
                    <div>
                        <span>CATEGORIA: </span>
                        <select className={styles.select}>
                            <option>SCRIPT</option>
                        </select>
                    </div>

                    <div>
                        <span>ORDERNAS POR: </span>
                        <select onChange={(e) => filterScript(e.target.value)} className={styles.select}>
                            <option value="forTime">MAIS RECENTE</option>
                            <option value="forAlphabetical">ALFABÉTICA</option>
                            <option value="forPrice">PREÇO</option>
                        </select>
                    </div>
                </div>
                <div className={styles.itens}>
                    {scripts.map((item, index) => (
                        <div key={index}>
                            <div className={styles.item}>
                                <div className={styles.imageProduct}><img src={item.thumbnail}/></div>
                                <div className={styles.nameScript}>{item.price}</div>
                                <div className={styles.resume}>{item.resume}</div>
                            </div>
                            <div className={styles.scriptDetails} onClick={() => router.push('/script/' + item.name )}>VER SCRIPT</div>
                        </div>
                    ))}
                </div>
            </div>
            <Bottom></Bottom>
        </div>
    )
}

export const getStaticProps: GetStaticProps = async () => {
    const {data} = await api.get("/script")
    
    return { props:{data}, revalidate: 60 }
}