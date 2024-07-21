export function handleFormSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formProps = Object.fromEntries(formData);
    localStorage.setItem('formSubmission', JSON.stringify(formProps));
    displayFormData(formProps);
}

function displayFormData(data) {
    const formOutput = document.getElementById('form-output');
    formOutput.innerHTML = `
        <h3>Form Submission</h3>
        <p>Name: ${data.name}</p>
        <p>Email: ${data.email}</p>
        <p>Message: ${data.message}</p>
    `;
}
