// polyfill
import "../assets/styles/app.scss"

import "core-js/stable" 

import { Workbox } from "workbox-window"
import React from "react"
import ReactDOM from "react-dom" 
import Converter from "./components/Converter"
import Config from "./Config"

ReactDOM.render(
    <>
        <h1 className="visually-hidden">Blood glucose unit converter</h1>
        <p className="visually-hidden">Convert between <em>mmol/L</em> and <em>mg/dL</em>.</p>
        <p className="visually-hidden">The international standard way of measuring blood glucose levels is in terms of a molar concentration, measured in mmol/L (millimoles per litre; or millimolar, abbreviated mM). In the United States, Germany and other countries mass concentration is measured in mg/dL (milligrams per decilitre). <a href="https://en.wikipedia.org/wiki/Blood_sugar_level">See Wikipedia article</a></p>
        
        <Converter />
    </>,
    document.getElementById("root")
)

if (Config.REGISTER_SERVICEWORKER) {
    let worker = new Workbox("/serviceworker.js")
       
    worker.addEventListener("installed", e => {
        console.log("Service worker " + (e.isUpdate ? "updated" : "installed"))
    })
    worker.register()
}