import "./Product.css"
import { initMercadoPago, Wallet } from '@mercadopago/sdk-react'
import axios from 'axios';
import { useState } from "react";

const Product = () => {
    const [preferenceId, setPreferenceId] = useState(null)
    initMercadoPago('TEST-b6257b3c-3757-4f3b-90da-328098758586', {locale:"pt-BR"});

    const createPreference = async () => {
        console.log("createPreference")
        try {
            const response = await axios.post("http://localhost:3000/create_preference",{
                title: "Camisa",
                quantity: 1,
                price: 100,
            });
            console.log(response)
            const { id } = response.data;
            return id;
        } catch (error) {
            console.log(error)
        }
    };

    const handleBuy = async () => {
        const id = await createPreference();
        if(id){
            setPreferenceId(id);
        }
    }

    return(
        <div className='card-product-container'>
            <div className='card-product'>
                <div className='card'>
                    <h3>Camisa</h3>
                    <p className='price' >R$100</p>
                    <button onClick={handleBuy}>Comprar</button>
                    {preferenceId && <Wallet initialization={{ preferenceId: preferenceId }} />}
                </div>
            </div>
         </div>
    )
}

export default Product