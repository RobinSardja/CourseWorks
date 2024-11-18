const letterGradeToGPA = new Map([
    ['A', 4], ['B', 3], ['C', 2], ['D', 1], ['F', 0]
])

// Future GPA

function calcFutureGPA( currGrades, currCredits, futureGrades, futureCredits ) {
    const n1 = currGrades.length, n2 = futureGrades.length
    let currCreditSum = 0, futureCreditSum = 0, GPASum = 0

    for( let i = 0; i < n1; i++ ) {
        GPASum += letterGradeToGPA.get( currGrades[i] ) * currCredits[i];
        currCreditSum += currCredits[i];
    }
    for( let i = 0; i < n2; i++ ) {
        GPASum += letterGradeToGPA.get( futureGrades[i] ) * futureCredits[i];
        futureCreditSum += futureCredits[i];
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

function calcDesiredGPA( currGrades, currCredits, desiredGPA ) {
    desiredGPA = desiredGPA.toFixed(2)
    if( desiredGPA > 4 || desiredGPA < 0 ) {
        return "Valid GPA range is between 0 and 4"
    }

    const n1 = currGrades.length
    let currCreditSum = 0, GPASum = 0

    for( let i = 0; i < n1; i++ ) {
        GPASum += letterGradeToGPA.get( currGrades[i] ) * currCredits[i];
        currCreditSum += currCredits[i];
    }
    
    if( GPASum / currCreditSum >= desiredGPA ) {
        return "Desired GPA met!"
    }
    if( desiredGPA == 4 ) {
        return "Perfect 4.00 is not longer possible"
    }

    // TODO: determine best classes to take to achieve desired GPA
}

function DesiredGPAComponent() {
    return (
        <section>
            <h1>Desired GPA</h1>
            { /* TESTING calcDesiredGPA */ }
            <p>Calculation: { calcDesiredGPA( ['A', 'A'], [3, 3], 4 ) }</p>
        </section>
    )
}

export default function WhatIfAnalysis() {
    return (
        <section>
            <h1>What-If Analysis</h1>
            <FutureGPAComponent />
            <DesiredGPAComponent />
        </section>
    );
}