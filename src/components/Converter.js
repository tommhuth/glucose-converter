import "./styles/converter.scss"

import React, { useState, useEffect } from "react"
import DropIcon from "./DropIcon"
import MeasureType from "../const/MeasureType"
import cn from "classnames"

export default function Converter() {
    let [defaultValue, setDefaultValue] = useState(4.1)
    let [otherValue, setOtherValue] = useState(70)
    let [reversed, setReversed] = useState(false)
    let [inited, setInited] = useState(false)
    let defaultElement = (
        <div
            className={cn("converter__section", "converter__section--default", {
                "converter__section--inited": inited
            })}
        >
            <span className="converter__section__input-wrapper">
                <input
                    type="text"
                    inputMode="decimal"
                    id={MeasureType.MMOL_L}
                    className="converter__section__input-wrapper__input"
                    value={typeof defaultValue === "string" ? defaultValue : defaultValue.toFixed(1)}
                    onChange={e => setDefaultValue((e.target.value))}
                    onBlur={(e) => {
                        setOtherValue(parseFloat(e.target.value) * 17)
                    }}
                />
            </span>
            <label
                htmlFor={MeasureType.MMOL_L}
                className="converter__section__unit"
            >
                {MeasureType.MMOL_L}
            </label>
        </div>
    )
    let otherElement = (
        <div
            className={cn("converter__section", "converter__section--other", {
                "converter__section--inited": inited
            })}
        >
            <span className="converter__section__input-wrapper">
                <input
                    type="text"
                    id={MeasureType.MG_DL}
                    inputMode="numeric"
                    className="converter__section__input-wrapper__input"
                    value={otherValue.toFixed(0)}
                    onChange={e => setOtherValue(parseFloat(e.target.value))}
                    onBlur={(e) => {
                        setDefaultValue(parseFloat(e.target.value) / 17)
                    }}
                />
            </span>
            <label
                htmlFor={MeasureType.MG_DL}
                className="converter__section__unit"
            >
                {MeasureType.MG_DL}
            </label>
        </div>
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