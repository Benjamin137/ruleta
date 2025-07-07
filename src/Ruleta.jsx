import React from 'react'
import './assets/ruleta.css'

export const Ruleta = () => {
    return (
        <>
            <div className="ruleta">
                <div className="docena-ceros">
                    <div>
                        <div class="celda verde">0</div>
                        <div class="celda verde">00</div>
                    </div>
                </div>
                <div className="docena">
                    <div className="docena-numeros">
                        <div>
                            <div className="celda rojo">3</div>
                            <div className="celda negro">2</div>
                            <div className="celda rojo">1</div>
                        </div>

                        <div>

                            <div className="celda negro">6</div>
                            <div className="celda rojo">5</div>
                            <div className="celda negro">4</div>
                        </div>
                        <div>

                            <div className="celda rojo">9</div>
                            <div className="celda negro">8</div>
                            <div className="celda rojo">7</div>
                        </div>
                        <div>

                            <div className="celda rojo">12</div>
                            <div className="celda negro">11</div>
                            <div className="celda negro">10</div>
                        </div>
                    </div>

                    <div className="apuesta-docena">
                        <span> 1st 12</span>
                    </div>

                </div>
                {/* <!-- Columna 2 --> */}
                <div className="docena">

                    <div className="docena-numeros">
                        <div>
                            <div className="celda negro">15</div>
                            <div className="celda rojo">14</div>
                            <div className="celda negro">13</div>
                        </div>
                        <div>

                            <div className="celda rojo">18</div>
                            <div className="celda negro">17</div>
                            <div className="celda rojo">16</div>
                        </div>
                        <div>

                            <div className="celda rojo">21</div>
                            <div className="celda negro">20</div>
                            <div className="celda rojo">19</div>
                        </div>
                        <div>
                            <div className="celda negro">24</div>
                            <div className="celda rojo">23</div>
                            <div className="celda negro">22</div>
                        </div>
                    </div>
                    <div className="apuesta-docena">
                        <span> 2st 12</span>
                    </div>
                    

                </div>

                {/* <!-- Columna 1 --> */}

                <div className="docena">

                    <div className="docena-numeros">
                        <div>
                            <div className="celda rojo">27</div>
                            <div className="celda negro">26</div>
                            <div className="celda rojo">25</div>
                        </div>
                        <div>

                            <div className="celda rojo">30</div>
                            <div className="celda negro">29</div>

                            <div className="celda negro">28</div>
                        </div>
                        <div>
                            <div className="celda negro">33</div>
                            <div className="celda rojo">32</div>
                            <div className="celda negro">31</div>
                        </div>
                        <div>

                            <div className="celda rojo">36</div>
                            <div className="celda negro">35</div>
                            <div className="celda rojo">34</div>
                        </div>
                    </div>
                    <div className="apuesta-docena">
                        <span> 3st 12</span>
                    </div>

                </div>

            </div >
        </>
    )
}
