import "./styles/converter.scss"

import React, { useState, useEffect } from "react"
import DropIcon from "./DropIcon"
import MeasureType from "../const/MeasureType"
import ConverterElement from "./ConverterElement"

export default function Converter() {
    let [defaultValue, setDefaultValue] = useState(4.2)
    let [otherValue, setOtherValue] = useState(71)
    let [defaultValueAddition, setDefaultValueAddition] = useState(0)
    let [otherValueAddition, setOtherValueAddition] = useState(0)
    let [reversed, setReversed] = useState(false)
    let [inited, setInited] = useState(false)
    let defaultElement = (
        <ConverterElement
            inited={inited}
            max={6}
            value={(parseFloat(defaultValue) + defaultValueAddition).toFixed(1).replace(".0", "")}
            type={MeasureType.MMOL_L}
            onBlur={value => setOtherValue(parseFloat(value) * 17)}
            onChange={value => setDefaultValue(parseFloat(value))}
            onAdditionChange={value => setDefaultValueAddition(value)}
        />
    )
    let otherElement = (
        <ConverterElement
            inited={inited}
            max={120}
            value={(otherValue + otherValueAddition).toFixed(0)}
            type={MeasureType.MG_DL}
            onBlur={value => setDefaultValue(parseFloat(value) / 17)}
            onChange={value => setOtherValue(parseFloat(value))}
            onAdditionChange={value => setOtherValueAddition(value)}
        />
    )

    useEffect(() => {
        setTimeout(() => setInited(true), 750)
    }, [])

    return (
        <div className="converter">
            <div className="converter__settings">
                <button
                    className="converter__settings__reverse"
                    type="button"
                    onClick={() => setReversed(prev => !prev)}
                >
                    <span className="visually-hidden">Reverse</span>
                    <DropIcon />
                </button>
            </div>

            {reversed ? <>{otherElement}{defaultElement}</> : <>{defaultElement}{otherElement}</>}
        </div>
    )
} 