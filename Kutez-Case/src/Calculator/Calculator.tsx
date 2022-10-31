import React from 'react';
import CalculatorForm from "./Form";

export default function Calculator() {
    return (
        <div className="calculator-wrapper">
            <div className="calculator">
                <h2>Shipping Time Calculator</h2>
                <CalculatorForm/>
            </div>
        </div>
    )
}
