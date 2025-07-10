import React, { useState, useRef } from 'react'
import './assets/ruleta.css'
import Ruleta_Americana from './assets/Ruleta_Americana'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Popconfirm, Row, Col, Card } from 'antd';
import img_ruleta from './assets/ruleta.png';
import useRuletaAmericana from './assets/useRuleta';
export const Ruleta = ({ jugador }) => {


    const { girar, apostar, resultado, apuestas } = useRuletaAmericana();

    const [rotacion, setRotacion] = useState(0);
    const ruletaRef = useRef(null);

    const [currentApuesta, setCurrentApuesta] = useState(0);
    const [montoJugador, setMontoJugador] = useState(jugador.getMonto());
    const [numGanador, setNumGanador] = useState(null);
    const [showCard, setShowCard] = useState(false);
    const ruleta = {
        ceros: [
            { value: '00', color: 'verde' },
            { value: '0', color: 'verde' },
        ],
        docenas: [
            {
                numeros: [
                    { value: 3, color: 'rojo' },
                    { value: 2, color: 'negro' },
                    { value: 1, color: 'rojo' },
                    { value: 6, color: 'negro' },

                    { value: 5, color: 'rojo' },
                    { value: 4, color: 'negro' },
                    { value: 9, color: 'rojo' },
                    { value: 8, color: 'negro' },

                    { value: 7, color: 'rojo' },
                    { value: 12, color: 'rojo' },
                    { value: 11, color: 'negro' },
                    { value: 10, color: 'negro' },
                ],
                apuesta: [
                    { text: '1 - 18', value: 'bajo', color: 'verde', tipo: 'rango' },
                    { text: 'EVEN', value: 'par', color: 'verde', tipo: 'paridad' },
                ],
                label: '1st 12'
            },
            {
                numeros: [
                    { value: 15, color: 'negro' },
                    { value: 14, color: 'rojo' },
                    { value: 13, color: 'negro' },
                    { value: 18, color: 'rojo' },
                    { value: 17, color: 'negro' },
                    { value: 16, color: 'rojo' },
                    { value: 21, color: 'rojo' },
                    { value: 20, color: 'negro' },
                    { value: 19, color: 'rojo' },
                    { value: 24, color: 'negro' },
                    { value: 23, color: 'rojo' },
                    { value: 22, color: 'negro' },
                ],
                apuesta: [
                    { text: 'ROJO', value: 'rojo', color: 'rojo', tipo: 'color' },
                    { text: 'NEGRO', value: 'negro', color: 'negro', tipo: 'color' },
                ],
                label: '2nd 12'
            },
            {
                numeros: [
                    { value: 27, color: 'rojo' },
                    { value: 26, color: 'negro' },
                    { value: 25, color: 'rojo' },
                    { value: 30, color: 'rojo' },
                    { value: 29, color: 'negro' },
                    { value: 28, color: 'negro' },
                    { value: 33, color: 'negro' },
                    { value: 32, color: 'rojo' },
                    { value: 31, color: 'negro' },
                    { value: 36, color: 'rojo' },
                    { value: 35, color: 'negro' },
                    { value: 34, color: 'rojo' },
                ],
                apuesta: [
                    { value: 'impar', color: 'verde', tipo: 'paridad', text: 'IMPAR' },
                    { value: 'alto', color: 'verde', tipo: 'alto_bajo', text: '19 - 36' },
                ],
                label: '3rd 12'
            }
        ]
    };

    const handleGirarRuleta = () => {
        const vueltas = 15; // cuántas vueltas completas
        const gradosExtra = Math.floor(Math.random() * 360); // para simular que cae en un número aleatorio
        const nuevoAngulo = rotacion + vueltas * 360 + gradosExtra;
        const segundos = 4;
        setRotacion(nuevoAngulo);

        if (ruletaRef.current) {
            ruletaRef.current.style.transition = `transform ${segundos}s ease-in-out`;
            ruletaRef.current.style.transform = `rotate(${nuevoAngulo}deg)`;
        }


        //Despues de los segundos de vuelta obtener resultado
        setTimeout(() => {
            const _resultadoNum = girar();
            setNumGanador(_resultadoNum);
            const _resultado = resultado(_resultadoNum);


            for (const resultado_apuesta of Object.values(_resultado.resultados)) {

                console.log(resultado_apuesta);
                if (resultado_apuesta && resultado_apuesta.ganado) {
                    jugador.recibirGanancias(resultado_apuesta.monto);
                }

            }

            setMontoJugador(jugador.getMonto());
            setShowCard(true);
        }, segundos * 1000);

    };
    //A todos los que sean celdas les voy a poner un evento onClick que me va a permitir hacer una apuesta
    const handleOnClickApuestaNumero = (numero, monto) => {
        apostar('numero', numero, jugador.apostar(monto));
        setMontoJugador(jugador.getMonto())
    };

    const handleOnClickApuestaDocena = (num_docena, monto) => {
        apostar('docena', num_docena, jugador.apostar(monto));
        console.log('Apuesta en docena:', num_docena, 'Monto:', monto);
        setMontoJugador(jugador.getMonto())
    }

    const handleOnClickApuestaExterna = (tipo, valor, monto) => {
        apostar(tipo, valor, jugador.apostar(monto));
        setMontoJugador(jugador.getMonto())
    };

    return (
        <>
            <Row>
                <Col className="ruleta" span={18}>
                    <div className="docena-ceros">
                        <div>
                            {ruleta.ceros.map((celda, i) => (
                                <div
                                    key={i}
                                    className={`celda ${celda.color}`}
                                    onClick={() => handleOnClickApuestaNumero(celda.value)}
                                >
                                    {celda.value}
                                </div>
                            ))}
                        </div>
                    </div>

                    {ruleta.docenas.map((docena, i) => (
                        <div key={i} className="docena">
                            <div className="docena-numeros">
                                {[0, 1, 2, 3].map(fila => (
                                    <div key={fila}>
                                        {docena.numeros.slice(fila * 3, fila * 3 + 3).map((celda, j) => (
                                            <Popconfirm
                                                okText="Apostar"

                                                title={
                                                    <>
                                                        <div
                                                            style={{
                                                                display: 'flex',
                                                                alignItems: 'center',
                                                                justifyContent: 'space-between',
                                                                width: '100%',
                                                                gap: '20px'
                                                            }}
                                                        >
                                                            <Button shape='circle'
                                                                onClick={() => setCurrentApuesta(currentApuesta - 25)}
                                                                icon={<MinusOutlined />}
                                                            ></Button>
                                                            <span>{currentApuesta}</span>
                                                            <Button shape='circle'
                                                                onClick={() => setCurrentApuesta(currentApuesta + 25)}
                                                                icon={<PlusOutlined />}
                                                            ></Button>
                                                        </div>
                                                    </>
                                                }
                                                onConfirm={() => handleOnClickApuestaNumero(celda.value, currentApuesta)}
                                            >
                                                <div
                                                    key={j}
                                                    className={`celda ${celda.color}`}
                                                >
                                                    {celda.value}
                                                </div>
                                            </Popconfirm>
                                        ))}
                                    </div>
                                ))}
                            </div>

                            <Popconfirm
                                okText="Apostar"

                                title={
                                    <>
                                        <div
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                width: '100%',
                                                gap: '20px'
                                            }}
                                        >
                                            <Button shape='circle'
                                                onClick={() => setCurrentApuesta(currentApuesta - 25)}
                                                icon={<MinusOutlined />}
                                            ></Button>
                                            <span>{currentApuesta}</span>
                                            <Button shape='circle'
                                                onClick={() => setCurrentApuesta(currentApuesta + 25)}
                                                icon={<PlusOutlined />}
                                            ></Button>
                                        </div>
                                    </>
                                }
                                onConfirm={() => handleOnClickApuestaDocena(i + 1, currentApuesta)}
                            >

                                <div className="apuesta-docena">
                                    <span>{docena.label}</span>
                                </div>
                            </Popconfirm>



                            <div style={{ display: 'flex', width: '100%' }}>
                                {docena.apuesta.map((apuesta, k) => (
                                    <Popconfirm
                                        okText="Apostar"

                                        title={
                                            <>
                                                <div
                                                    style={{
                                                        display: 'flex',
                                                        alignItems: 'center',
                                                        justifyContent: 'space-between',
                                                        width: '100%',
                                                        gap: '20px'
                                                    }}
                                                >
                                                    <Button shape='circle'
                                                        onClick={() => setCurrentApuesta(currentApuesta - 25)}
                                                        icon={<MinusOutlined />}
                                                    ></Button>
                                                    <span>{currentApuesta}</span>
                                                    <Button shape='circle'
                                                        onClick={() => setCurrentApuesta(currentApuesta + 25)}
                                                        icon={<PlusOutlined />}
                                                    ></Button>
                                                </div>
                                            </>
                                        }
                                        onConfirm={() => handleOnClickApuestaExterna(apuesta.tipo, apuesta.value, currentApuesta)}
                                    >
                                        <div
                                            key={k}
                                            className={`celda ${apuesta.color}`}
                                            style={{
                                                width: '50%',
                                                display: 'flex',
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                fontSize: '1.2rem',
                                                fontWeight: 'bold'
                                            }}>
                                            <span>{apuesta.text}</span>
                                        </div>
                                    </Popconfirm>
                                ))}
                            </div>
                        </div>
                    ))}
                </Col>
                <Col className="info-visual" span={6}>
                    <Row>
                        <Col
                            style={{
                                marginTop: '20px',
                            }}
                        >
                            <span
                                style={{
                                    backgroundColor: 'black',
                                    padding: '25px',
                                    fontFamily: 'Arial, sans-serif',
                                    borderRadius: '25px',
                                    fontSize: '20px',
                                    fontWeight: 'bold',
                                    color: 'white'
                                }}
                            >${montoJugador}</span>

                        </Col>
                        <Col style={{ position: 'relative', display: 'inline-block' }}>
                            {showCard && numGanador && (
                                <Card
                                    onClick={() => setShowCard(false)}
                                    style={{
                                        position: 'absolute',
                                        top: '50%',
                                        left: '50%',
                                        transform: 'translate(-50%, -50%)',
                                        zIndex: 10,
                                        backgroundColor: 'black',
                                        padding: '25px',
                                        fontFamily: 'Arial, sans-serif',
                                        borderRadius: '25px',
                                        fontSize: '20px',
                                        textAlign: 'center',
                                        fontWeight: 'bold',
                                        color: 'white'
                                    }}
                                >
                                    {numGanador.valor} - {numGanador.color}
                                </Card>
                            )}
                            <img
                                ref={ruletaRef}
                                src={img_ruleta}
                                alt="Ruleta"
                                className="ruleta-img"
                                style={{ display: 'block' }}
                            />
                        </Col>


                        <Button
                            type="default"
                            style={{
                                marginTop: '20px',
                                marginLeft: '20px',
                                width: '100%',
                            }}
                            onClick={handleGirarRuleta}
                        >
                            Girar
                        </Button>
                    </Row>

                    <div>
                        {apuestas && Object.entries(apuestas).map(([tipo, data]) => (
                            <div key={tipo} style={{ color: 'white', margin: '10px 0' }}>
                                {tipo === 'numero' ? (
                                    data.map((ap, i) => (
                                        <div key={i}>{ap.valor} - ${ap.monto}</div>
                                    ))
                                ) : (
                                    data.apuestas?.map((ap, i) => (
                                        <div key={i}>{ap.valor} - ${ap.monto}</div>
                                    ))
                                )}
                            </div>
                        ))}

                    </div>

                </Col >
            </Row >

        </>
    )
}
