//this function capitalizes the first letter of each word
const capWord = (string) => {
    if (string == '') {
      return '';
    }
    let stringArr = string.split(' ');
    console.log(stringArr);
    for (let i = 0; i < stringArr.length; i++) {
      stringArr[i] = stringArr[i][0].toUpperCase() + stringArr[i].substr(1);
    }
    return stringArr.join(' ');
  };
  
  //validate inputs for document name, type, and contents
  const validateDocumentInputs = (name, type, contents) => {
    let validationError = [];
    if (name === '') {
      validationError.push('Enter a document name');
    }
    if (type ==='') {
      validationError.push('Select a valid type');
    }
    if (contents === '') {
      validationError.push('Enter document contents');
    }
  
    return validationError;
  };
  
  //this function is called by the create trip button on the homepage
  //call the POST /api/trips route with JSON containing the trip name, start date, and end date
  const createDocument = async (event) => {
    event.preventDefault();
  
    let name = document.querySelector('#document-name').value.trim();
    name = capWord(name);
    const type = document.querySelector('#document-type').value.trim();
    const contents = document.querySelector('#document-contents').value.trim();
    const urlPieces = window.location.href.split("/");
    const destination_id = urlPieces[urlPieces.length-1]
  
    const validationResult = validateDocumentInputs(name, type, contents);
    if (validationResult.length === 0) {
      const jsonBody = JSON.stringify({ name, type, contents, destination_id });
      const response = await fetch('/api/documents', {
        method: 'POST',
        body: jsonBody,
        headers: { 'Content-Type': 'application/json' },
      });
      console.log(response)
      if (response.ok) {
        window.open('','_parent',''); 
        window.close();
      } else {
        alert('Error creating document');
      }
    } else {
      alert(validationResult.join('\n'));
    }
  };
  
  //add event listener for the create trip 
  document.querySelector('.document-form').addEventListener('submit', createDocument);
  