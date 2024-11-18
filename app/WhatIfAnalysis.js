function calcFutureGPA( currGrades, currCredits, futureGrades, futureCredits ) {
    const letterGradeToGPA = new Map([
        ['A', 4], ['B', 3], ['C', 2], ['D', 1], ['F', 0]
    ])

    let n1 = currGrades.length, n2 = futureGrades.length
    let currCreditSum = 0, futureCreditSum = 0
    let gradeSum = 0

    for( let i = 0; i < n1; i++ ) {
        gradeSum += letterGradeToGPA.get( currGrades[i] ) * currCredits[i];
        currCreditSum += currCredits[i];
    }
    for( let i = 0; i < n2; i++ ) {
        gradeSum += letterGradeToGPA.get( futureGrades[i] ) * futureCredits[i];
        futureCreditSum += futureCredits[i];
    }

    return gradeSum / ( currCreditSum + futureCreditSum )
}

function FutureGPAComponent() {
    return (
        <section>
            <h1>Future GPA</h1>
            <p>{ calcFutureGPA( ['A', 'A'], [3, 3], ['A', 'A'], [3, 3] ).toFixed(2) }</p>
        </section>
    )
}

function DesiredGPAComponent() {
    return (
        <section>
            <h1>Desired GPA</h1>
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