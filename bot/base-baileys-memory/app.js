const { createBot, createProvider, createFlow, addKeyword } = require('@bot-whatsapp/bot')

const QRPortalWeb = require('@bot-whatsapp/portal')
const BaileysProvider = require('@bot-whatsapp/provider/baileys')
const MockAdapter = require('@bot-whatsapp/database/mock')

const flowSecundario = addKeyword(['2', 'siguiente']).addAnswer(['📄 Aquí tenemos el flujo secundario'])

const flowDocs = addKeyword(['doc', 'documentacion', 'documentación']).addAnswer(
    [
        '📄 Aquí encontras las documentación recuerda que puedes mejorarla',
        'https://bot-whatsapp.netlify.app/',
        '\n*2* Para siguiente paso.',
    ],
    null,
    null,
    [flowSecundario]
)



const flowGracias = addKeyword(['gracias', 'Gracias','gracias gloria','ok' ,'ok muchas gracias','ok gracias']).addAnswer(
    [
        'Gracias a ti, te dejo mi tarjeta Digital visita nuestras redes sociales',
        '👉 *https://bit.ly/GloriaPerfumes-Cuautla',
    ],
    null,
    null,
    [flowSecundario]
)


const flowPrincipal = addKeyword(['hola', 'Hola', 'Gloria','Glow','oye','buenas', 'buenos','Hola buenas','Hola buenos','HOLA'])
    .addAnswer('🙌 Hola soy *Glow*, el asistente virtual de *Gloria Perfumes®*')
    
    .addAnswer(
        [
            'Como Puedo ayudarte?',

            'Te invito aver nuestras listas de Aromas',
            '👉 *https://bit.ly/Aromas-GloriaPerfumes',
            
        ],
        null,
        null,
        [flowDocs, flowGracias]
    )

const main = async () => {
    const adapterDB = new MockAdapter()
    const adapterFlow = createFlow([flowPrincipal])
    const adapterProvider = createProvider(BaileysProvider)

    createBot({
        flow: adapterFlow,
        provider: adapterProvider,
        database: adapterDB,
    })

    QRPortalWeb()
}

main()
