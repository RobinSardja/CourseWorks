"use client"

import { useState } from "react"

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
    const [gradeInput, setGradeInput] = useState('A')
    const [creditInput, setCreditInput] = useState(4)

    return (
        <section>
            <h1>Future GPA</h1>
            <h2>Future classes</h2>
            <ul>
                { futureClasses.map( (classInfo, index) => (
                    <li key = {index}>
                        Grade: { classInfo[0] }, Credits: { classInfo[1] }
                    </li>
                ))}
            </ul>
            <select
                className = "h-8 w-64 outline"
                value = {gradeInput}
                onChange = {(e) => setGradeInput( e.target.value )}
            >
                <option value = 'A'>A</option>
                <option value = 'B'>B</option>
                <option value = 'C'>C</option>
                <option value = 'D'>D</option>
                <option value = 'F'>F</option>
            </select>
            <br />
            <select
                className = "h-8 w-64 outline"
                value = {creditInput}
                onChange = {(e) => setCreditInput( parseInt(e.target.value) )}
            >
                <option value = '4'>4</option>
                <option value = '3'>3</option>
                <option value = '2'>2</option>
                <option value = '1'>1</option>
            </select>
            <br />
            <button
                className = "h-8 w-64 outline"
                onClick = { () => {
                    setGrades( [...grades, gradeInput ] )
                    setCredits( [...credits, creditInput] )
                    setFutureClasses( [...futureClasses, [gradeInput, creditInput] ] )
                }}
            >Add class</button>
            <br />
            <button
                className = "h-8 w-64 outline"
                onClick = { () => {
                    setGrades([])
                    setCredits([])
                    setFutureClasses([])
                }}
            >Reset future classes list</button>
            <p>Calculation: { calcFutureGPA( ['A', 'F'], [3, 3], grades, credits ).toFixed(2) }</p>
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
            <input
                className = "h-8 w-64 outline"
                type = "number"
                value = {desiredGPA}
                onChange = { (e) => setDesiredGPA(e.target.value) }
                placeholder = "Enter desired GPA (0 - 4)"
                min = "0"
                max = "4"
                step = "0.5"
            />
            <br />
            <input
                className = "h-8 w-64"
                type = "range"
                value = {desiredGPA}
                onChange = { (e) => setDesiredGPA(e.target.value) }
                min = "0"
                max = "4"
                step = "0.01"
            />
            <p>Calculation: { calcDesiredGPA( ['A', 'F'], [3, 3], desiredGPA, 30 ) }</p>
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