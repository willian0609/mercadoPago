import express from 'express';
import cors from 'cors';
import { MercadoPagoConfig, Preference } from 'mercadopago';

const client = new MercadoPagoConfig({accessToken: "TEST-5986572233352832-052817-b75357a3cffd49179b235f308e4c5765-200476954"});

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Servidor aqui");
});

app.post("/create_preference", async (req, res) => {
    try {
        console.log(req)
        const body = {
            items: [
                {
                    title: req.body.title,
                    quantity: Number(req.body.quantity),
                    unit_price: Number(req.body.price),
                    currency_id: "BRL",       
                },
            ],
            back_urls: {
                success: "http://localhost:3000/sucesso",
                failure: "http://localhost:3000/erro",
                pending: "http://localhost:3000/erro"
            },
            auto_return: "approved",
        }; 
        const preference = new Preference(client);
        const result = await preference.create({body});

        res.json({
            id: result.id,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            error: "Erro ao criar preferencia",
        });
    }
});

app.listen(port, () => {
    console.log(`O servidor está funcionando na porta ${port}`);
});
