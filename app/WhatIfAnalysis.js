"use client"

import React, { useState } from 'react'

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
    const [grades, setGrades] = useState([])
    const [credits, setCredits] = useState([])
    const [futureClasses, setFutureClasses] = useState([])
    const [gradeInput, setGradeInput] = useState('')
    const [creditInput, setCreditInput] = useState('')

    const isValidGrade = (grade) => ['A', 'B', 'C', 'D', 'F'].includes( grade.toUpperCase() )
    const isValidCredits = (credits) => ['1', '2', '3', '4'].includes(credits)

    const handleAdd = () => {
        if( isValidGrade(gradeInput) && isValidCredits(creditInput) ) {
            setGrades( [...grades, gradeInput.toUpperCase() ] )
            setCredits( [...credits, parseInt(creditInput) ] )
            setFutureClasses( [...futureClasses, [gradeInput.toUpperCase(), parseInt(creditInput)] ] )
            setGradeInput('')
            setCreditInput('')
        } else {
            alert( "Please enter a valid grade (A, B, C, D, F) and credits (1-4)." )
        }
    }

    const handleReset = () => {
        setGrades([])
        setCredits([])
        setFutureClasses([])
    }

    return (
        <section>
            <h1>Future GPA</h1>
            { /* TESTING calcFutureGPA */ }
            <h2>Future classes</h2>
            <ul>
                { futureClasses.map( (classInfo, index) => (
                    <li key = {index}>
                        Grade: { classInfo[0] }, Credits: { classInfo[1] }
                    </li>
                ))}
            </ul>
            <input
                type = "text"
                value = {gradeInput}
                onChange = { (e) => setGradeInput(e.target.value) }
                placeholder = "Enter grade (A, B, C, D, F)"
                maxLength = "1"
            />
            <input
                type = "number"
                value = {creditInput}
                onChange = { (e) => setCreditInput(e.target.value) }
                placeholder = "Credit"
                min = "1"
                max = "4"
            />
            <button onClick = {handleAdd} >Add</button>
            <button onClick = {handleReset} >Reset</button>
            <p>Calculation: { calcFutureGPA( ['A', 'A'], [3, 3], grades, credits ).toFixed(2) }</p>
        </section>
    )
}

// Desired GPA

function calcDesiredGPA( currGrades, currCredits, desiredGPA, remainingCredits ) {
    if( !desiredGPA ) return "Please enter a desired GPA"

    desiredGPA = parseFloat(desiredGPA).toFixed(2)
    if( desiredGPA > 4 || desiredGPA < 0 ) return "Valid GPA range is between 0 and 4"

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

    return `A in ${extraCreditSum} additional credits will result in a rounded down GPA of ${ Math.floor( ( GPASum / ( currCreditSum + extraCreditSum ) ) * 100 ) / 100 }`
}

function DesiredGPAComponent() {
    const [desiredGPA, setDesiredGPA] = useState('')

    return (
        <section>
            <h1>Desired GPA</h1>
            { /* TESTING calcDesiredGPA */ }
            <input
                type = "number"
                value = {desiredGPA}
                onChange = { (e) => setDesiredGPA(e.target.value) }
                placeholder = "Enter a desired GPA"
            />
            <p>Calculation: { calcDesiredGPA( ['A', 'A'], [3, 3], desiredGPA, 3 ) }</p>
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