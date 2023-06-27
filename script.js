const inputs = document.querySelectorAll("input");
let passwordConfirm;

inputs.forEach(input => input.addEventListener("input",(e)=>{
   const inputID = e.target.id;
   const inputUnit = document.querySelector("#" + inputID);
/*
   console.log(inputID);
   console.log(inputUnit.value);
   console.log(inputUnit.validity.valid);
   console.log(inputUnit.checkValidity());
   console.log(inputUnit.validationMessage);
*/
   //validate confirm password field
   if (inputID === "password2") {
      const password1 = document.querySelector("#password1");
      const password2 = document.querySelector("#password2");
      if (password1.value === password2.value) passwordConfirm = true;
      else passwordConfirm = false;
   }

   if (inputUnit.validity.valid === false || (inputID === "password2" && passwordConfirm === false)) {
      //show error message
      showErrorMessage(inputID);
   } else {
      showNoError(inputID);
   }
}));

//function to show error message for invalid fields
function showErrorMessage (idValue) {
   const inputERROR = document.querySelector("." + idValue + "-error");
   const inputUnit = document.querySelector("#" + idValue);

   let errMessage;
   if (idValue === "email") {
      //if field is empty
      if (inputUnit.validity.valueMissing) errMessage = inputUnit.validationMessage + " Your email should have least 6 characters in total.";
      else if (inputUnit.validity.typeMismatch) errMessage = inputUnit.validationMessage + " Your email should have least 6 characters in total.";
      else if (inputUnit.value.length < 6) errMessage = inputUnit.validationMessage;
   }
   else if (idValue === "fname" || idValue === "lname") {
      //if field is empty
      if (inputUnit.validity.valueMissing) errMessage = inputUnit.validationMessage;
   }
   else if (idValue === "phone") {
      if (inputUnit.validity.valueMissing) errMessage = inputUnit.validationMessage;
      //if field does not match format
      if (inputUnit.validity.patternMismatch) errMessage = inputUnit.validationMessage + ": 012-345-6789";
   }
   else if (idValue === "password1") {
      //if field does not match the requested format
      if (inputUnit.validity.valueMissing) errMessage = inputUnit.validationMessage;
      if (inputUnit.validity.patternMismatch) errMessage = "Minimum 8 characters. Match the requested format: At least 1 lowercase letter, 1 uppercase letter, 1 number and 1 special character.";
      //else if (inputUnit.value.length < 8) errMessage = "Minimum 8 characters";
   }
   else if (idValue === "password2") {
      //confirm password field is empty or does not match password field
      if (inputUnit.validity.valueMissing) errMessage = inputUnit.validationMessage;
      if (passwordConfirm === false) errMessage = "The password fields do not match.";
   }

   inputERROR.textContent = errMessage;
}

//Remove error messages if all is valid
function showNoError (idValue) {
   const inputERROR = document.querySelector("." + idValue + "-error");
   inputERROR.textContent = "";
}

//Run validation on all fields when submit in pressed
//first create an array containing the id value of all the fields
let nodeListFields = Array.from(inputs);
let arrOfFields = nodeListFields.map((arr)=>{
   return arr.id;
});

//Run validation on all fields when submit in pressed
const submitBtn = document.querySelector("#submit-button");
submitBtn.addEventListener("click", (e) => {

   //this prevent the form from submitting in test form - it should be removed in production code
   e.preventDefault();

   //console.log("Submit Button Pressed!");

   //loop to validate each field
   arrOfFields.forEach((item)=> {

      const inputID = item;
      const inputUnit = document.querySelector("#" + inputID);

      //validate confirm password field
      if (inputID === "password2") {
         const password1 = document.querySelector("#password1");
         const password2 = document.querySelector("#password2");
         if (password1.value === password2.value) passwordConfirm = true;
         else passwordConfirm = false;
      }
   
      if (inputUnit.validity.valid === false || (inputID === "password2" && passwordConfirm === false)) {
         //stop form from submitting
         e.preventDefault();
         //show error message
         showErrorMessage(inputID);
      } else {
         showNoError(inputID);
      }
      
   })

});