"use client"

import React, { useState } from 'react'
import NumberInput from './NumberInput'

const letterGradeToGPA = new Map([
    ['A', 4], ['B', 3], ['C', 2], ['D', 1], ['F', 0]
])

// Future GPA

function calcFutureGPA( currGrades, currCredits, futureGrades, futureCredits ) {
    var currCreditSum = 0, futureCreditSum = 0, GPASum = 0

    for( let i = 0; i < currGrades.length; i++ ) {
        GPASum += letterGradeToGPA.get( currGrades[i] ) * currCredits[i]
        currCreditSum += currCredits[i]
    }
    for( let i = 0; i < futureGrades.length; i++ ) {
        GPASum += letterGradeToGPA.get( futureGrades[i] ) * futureCredits[i]
        futureCreditSum += futureCredits[i]
    }

    return GPASum / ( currCreditSum + futureCreditSum )
}

function FutureGPAComponent() {
    return (
        <section>
            <h1>Future GPA</h1>
            { /* TESTING calcFutureGPA */ }
            <p>Calculation: { calcFutureGPA( ['A', 'A'], [3, 3], ['A', 'A'], [3, 3] ).toFixed(2) }</p>
        </section>
    )
}

// Desired GPA

function calcDesiredGPA( currGrades, currCredits, desiredGPA, remainingCredits ) {
    if( desiredGPA > 4 || desiredGPA < 0 ) {
        return "Valid GPA range is between 0 and 4"
    }

    var currCreditSum = 0, GPASum = 0

    for( let i = 0; i < currGrades.length; i++ ) {
        GPASum += letterGradeToGPA.get( currGrades[i] ) * currCredits[i]
        currCreditSum += currCredits[i]
    }
    
    if( GPASum / currCreditSum >= desiredGPA ) {
        return "Desired GPA met!"
    }
    if( desiredGPA == 4 ) {
        return "Perfect 4.00 is no longer possible"
    }

    var extraCreditSum = 0
    while( GPASum / ( currCreditSum + extraCreditSum ) < desiredGPA && extraCreditSum < remainingCredits ) {
        let extraCredit = Math.min( 4, remainingCredits - extraCreditSum )
        extraCreditSum += extraCredit
        GPASum += 4 * extraCredit
    }

    if( extraCreditSum == remainingCredits && GPASum / ( currCreditSum + extraCreditSum ) < desiredGPA ) {
        return "Not enough credits remaining to achieve desired GPA"
    }

    return `A in ${extraCreditSum} credits`
}

function DesiredGPAComponent() {
    const [number, setNumber] = useState('')
    const onNumberChange = (newNumber) => {
        setNumber(newNumber)
    }

    return (
        <section>
            <h1>Desired GPA</h1>
            { /* TESTING calcDesiredGPA */ }
            <NumberInput number = {number} onNumberChange = {onNumberChange} />
            <p>Calculation: { calcDesiredGPA( ['A', 'A'], [3, 3], number, 3 ) }</p>
        </section>
    )
}

// What-If Analysis

export default function WhatIfAnalysis() {
    return (
        <section>
            <h1>What-If Analysis</h1>
            <FutureGPAComponent />
            <DesiredGPAComponent />
        </section>
    )
}