export default function NumberInput({ number, onNumberChange }) {
    // Handle the change in input
    const handleChange = (event) => {
        // Pass the updated value to the parent through the callback function
        onNumberChange(event.target.value);
    };

    return (
        <div>
            <label htmlFor="numberInput">Enter a number: </label>
            <input
                type="number"
                id="numberInput"
                value={number} // Use the number prop to control the input value
                onChange={handleChange} // Call the callback on input change
                placeholder="Enter a number"
            />
        </div>
    );
}