function FutureGPA() {
    return (
        <section>
            <h1>Future GPA</h1>
        </section>
    )
}

function DesiredGPA() {
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
            <FutureGPA />
            <DesiredGPA />
        </section>
    );
}