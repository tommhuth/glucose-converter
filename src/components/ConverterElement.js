import "./styles/converter-element.scss"

import React, { useState } from "react"
import cn from "classnames"
import MeasureType from "../const/MeasureType"

export default function ConverterElement({
    inited = false, 
    max = 100,
    onChange = () => { },
    onBlur = () => { },
    onAdditionChange = () => { },
    value,
    type
}) {
    let [x, setX] = useState(0)
    let [isMoving, setIsMoving] = useState(false)

    return (
        <div
            className={cn("converter-element", {
                "converter-element--inited": inited,
                "converter-element--other": type === MeasureType.MG_DL,
                "converter-element--default": type === MeasureType.MMOL_L
            })}
            onTouchStart={e => setX(e.changedTouches[0].pageX)}
            onTouchMove={e => {
                let dx = (e.changedTouches[0].pageX - x) / window.innerWidth * max

                onAdditionChange(dx)
                setIsMoving(true)
            }}
            onTouchCancel={() => {
                onAdditionChange(0)
                onChange(value)
                onBlur(value)
                setIsMoving(false)
            }}
            onTouchEnd={() => {
                onAdditionChange(0)
                onChange(value)
                onBlur(value)
                setIsMoving(false)
            }}
        >
            <span className="converter-element__input-wrapper">
                <input
                    type="text"
                    inputMode={type === MeasureType.MMOL_L ? "decimal" : "numeric"}
                    id={type}
                    disabled={isMoving}
                    className="converter-element__input"
                    value={parseFloat(value) > 0 ? value : 0}
                    onChange={e => onChange((e.target.value))}
                    onBlur={e => onBlur((e.target.value))}
                />
            </span>
            <label
                htmlFor={type}
                className="converter-element__unit"
            >
                {type}
            </label>
        </div>
    )
} 