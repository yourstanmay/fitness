// Global variables for calculation results
let calorieNeeded = 0;
let fatNeeded = 0;
let proteinNeeded = 0;
let carbNeeded = 0;

// Initialize the calculator
document.addEventListener('DOMContentLoaded', function() {
    // Set up event listeners
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCalories);
    }

    const resetBtn = document.getElementById('reset-btn');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetCalculator);
    }

    const unitSelector = document.getElementById('unit-selector');
    if (unitSelector) {
        unitSelector.addEventListener('change', updateResultsUnits);
    }

    // Set up height conversion
    const heightCm = document.getElementById('height-cm');
    const heightFeet = document.getElementById('height-feet');
    const heightInches = document.getElementById('height-inches');

    if (heightCm && heightFeet && heightInches) {
        heightCm.addEventListener('input', function() {
            convertCmToFeetInches(this.value);
        });

        heightFeet.addEventListener('change', function() {
            convertFeetInchesToCm();
        });

        heightInches.addEventListener('change', function() {
            convertFeetInchesToCm();
        });
    }

    // Add input event listeners to clear error styling when user starts typing
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.addEventListener('input', function() {
            this.classList.remove('error');
            hideError();
        });
    });
});

// Calculate calories based on form inputs
function calculateCalories() {
    // Reset any previous error styling
    resetErrorStyles();
    
    // Get form elements
    const ageInput = document.getElementById('age');
    const heightCmInput = document.getElementById('height-cm');
    const weightInput = document.getElementById('weight');
    
    // Get form values
    const age = parseInt(ageInput.value);
    const gender = document.querySelector('input[name="gender"]:checked').value;
    const heightCm = parseFloat(heightCmInput.value);
    const weight = parseFloat(weightInput.value);
    const weightUnit = document.getElementById('weight-unit').value;
    const activityLevel = document.getElementById('activity-level').value;

    // Validate inputs
    let hasError = false;
    let errorMessage = '';
    
    if (isNaN(age) || age <= 0) {
        ageInput.classList.add('error');
        hasError = true;
        errorMessage = 'Please enter a valid age.';
    }
    
    if (isNaN(heightCm) || heightCm <= 0) {
        heightCmInput.classList.add('error');
        hasError = true;
        errorMessage = errorMessage || 'Please enter a valid height.';
    }
    
    if (isNaN(weight) || weight <= 0) {
        weightInput.classList.add('error');
        hasError = true;
        errorMessage = errorMessage || 'Please enter a valid weight.';
    }
    
    if (hasError) {
        showError(errorMessage || 'Please fill in all required fields with valid numbers.');
        return;
    }

    // Convert weight to kg if needed
    let weightKg = weight;
    if (weightUnit === 'pounds') {
        weightKg = weight / 2.2046;
    }

    // Calculate BMR using Mifflin-St Jeor Equation
    let bmr;
    if (gender === 'male') {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) + 5;
    } else {
        bmr = (10 * weightKg) + (6.25 * heightCm) - (5 * age) - 161;
    }

    // Apply activity multiplier
    const activityMultipliers = {
        'sedentary': 1.2,
        'light': 1.375,
        'moderate': 1.55,
        'active': 1.725,
        'very-active': 1.9
    };

    calorieNeeded = Math.floor(bmr * activityMultipliers[activityLevel]);

    // Calculate macronutrients (using standard percentages)
    // 30% from fat, 30% from protein, 40% from carbs
    fatNeeded = Math.floor((calorieNeeded * 0.30) / 9); // 9 calories per gram of fat
    proteinNeeded = Math.floor((calorieNeeded * 0.30) / 4); // 4 calories per gram of protein
    carbNeeded = Math.floor((calorieNeeded * 0.40) / 4); // 4 calories per gram of carbs

    // Hide any error messages
    hideError();
    
    // Display results
    displayResults();
}

// Reset the calculator to its initial state
function resetCalculator() {
    // Reset all input fields
    document.getElementById('age').value = '';
    document.getElementById('gender-male').checked = true;
    document.getElementById('height-cm').value = '';
    document.getElementById('height-feet').selectedIndex = 0;
    document.getElementById('height-inches').selectedIndex = 0;
    document.getElementById('weight').value = '';
    document.getElementById('weight-unit').selectedIndex = 0;
    document.getElementById('activity-level').selectedIndex = 2; // Default to moderate

    // Reset results
    calorieNeeded = 0;
    fatNeeded = 0;
    proteinNeeded = 0;
    carbNeeded = 0;

    // Hide results container
    document.getElementById('results-container').classList.add('hidden');
    
    // Reset any error styling
    resetErrorStyles();
}

// Reset error styles on all form inputs
function resetErrorStyles() {
    const formInputs = document.querySelectorAll('.form-control');
    formInputs.forEach(input => {
        input.classList.remove('error');
    });
    hideError();
}

// Show error message in the error container
function showError(message) {
    const errorContainer = document.getElementById('error-container');
    errorContainer.textContent = message;
    errorContainer.classList.remove('hidden');
}

// Hide the error message
function hideError() {
    const errorContainer = document.getElementById('error-container');
    errorContainer.classList.add('hidden');
    errorContainer.textContent = '';
}

// Display calculation results
function displayResults() {
    // Show results container
    const resultsContainer = document.getElementById('results-container');
    resultsContainer.classList.remove('hidden');

    // Update result values
    document.getElementById('calorie-result').textContent = calorieNeeded;
    document.getElementById('fat-result').textContent = fatNeeded;
    document.getElementById('protein-result').textContent = proteinNeeded;
    document.getElementById('carb-result').textContent = carbNeeded;

    // Update unit text
    updateResultsUnits();

    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
}

// Update results when unit selector changes
function updateResultsUnits() {
    const unitSelector = document.getElementById('unit-selector');
    const unit = unitSelector.value;
    const unitElements = document.querySelectorAll('.result-unit');

    // Update displayed values based on selected unit
    if (unit === 'g') {
        document.getElementById('fat-result').textContent = fatNeeded;
        document.getElementById('protein-result').textContent = proteinNeeded;
        document.getElementById('carb-result').textContent = carbNeeded;
        
        unitElements.forEach(element => {
            element.textContent = 'grams';
        });
    } else if (unit === 'kg') {
        document.getElementById('fat-result').textContent = (fatNeeded / 1000).toFixed(2);
        document.getElementById('protein-result').textContent = (proteinNeeded / 1000).toFixed(2);
        document.getElementById('carb-result').textContent = (carbNeeded / 1000).toFixed(2);
        
        unitElements.forEach(element => {
            element.textContent = 'kilograms';
        });
    } else if (unit === 'pounds') {
        document.getElementById('fat-result').textContent = (fatNeeded * 0.0022).toFixed(2);
        document.getElementById('protein-result').textContent = (proteinNeeded * 0.0022).toFixed(2);
        document.getElementById('carb-result').textContent = (carbNeeded * 0.0022).toFixed(2);
        
        unitElements.forEach(element => {
            element.textContent = 'pounds';
        });
    }
}

// Convert cm to feet and inches
function convertCmToFeetInches(cm) {
    if (!cm || isNaN(cm)) return;
    
    const totalInches = cm / 2.54;
    const feet = Math.floor(totalInches / 12);
    const inches = Math.round(totalInches % 12);
    
    document.getElementById('height-feet').value = feet;
    document.getElementById('height-inches').value = inches;
}

// Convert feet and inches to cm
function convertFeetInchesToCm() {
    const feet = parseInt(document.getElementById('height-feet').value) || 0;
    const inches = parseInt(document.getElementById('height-inches').value) || 0;
    
    const cm = Math.round((feet * 30.48) + (inches * 2.54));
    document.getElementById('height-cm').value = cm;
}

function cc() {
  var age = parseInt(document.getElementById("age").value);
  var wtype = document.getElementById("wtype").value;
  var foot = parseInt(document.getElementById("foot").value);
  var inch = parseInt(document.getElementById("inch").value);
  var cm = document.getElementById("cen").value;
  var weight = document.getElementById("weight").value;
  if (age != '' && cm != '' && weight != '') {
    if (wtype == "pounds") {
      weight = parseInt(weight);
      weight = Math.round(weight / 2.2046);
    }
    var loa = document.getElementById("loa").value;
    if (document.getElementById("gen").checked) {
      fd = (10 * weight) + (6.25 * cm) - (5 * age) + 5;
    }
    else {
      fd = (10 * weight) + (6.25 * cm) - (5 * age) - 161;
    }
    switch (loa) {
      case "1":
        cneed = fd * 1.2;
        break;
      case "2":
        cneed = fd * 1.375
        break;
      case "3":
        cneed = fd * 1.53;
        break;
      case "4":
        cneed = fd * 1.725;
        break;
      case "5":
        cneed = fd * 1.9;
        break;
    }
    cneed = Math.floor(cneed);
    //cneed1=Math.floor(cneed*0.0353);
    fneed = Math.floor((cneed * 0.25) / 9);
    if (wtype == "pounds") {
      fneed = Math.floor(fneed * 0.0353);
      //fneed=fneed*0.0022 ;
    }
    pneed = Math.floor((cneed * 0.25) / 4);
    if (wtype == "pounds") {
      pneed = Math.floor(pneed * 0.0353);
    }
    crneed = Math.floor((cneed * 0.25) / 4);
    if (wtype == "pounds") {
      crneed = Math.floor(crneed * 0.0353);
    }
    aneed = Math.floor((cneed * 0.25) / 7);
    if (wtype == "pounds") {
      aneed = Math.floor(aneed * 0.0353);
    }
    document.getElementById("rc").value = " " + cneed;
    document.getElementById("rf").value = " " + fneed;
    document.getElementById("rp").value = " " + pneed;
    document.getElementById("rh").value = " " + crneed;
    document.getElementById("ra").value = " " + aneed;
    document.getElementById("l1").innerHTML = "grams";
    document.getElementById("l2").innerHTML = "grams";
    document.getElementById("l3").innerHTML = "grams";
    document.getElementById("l4").innerHTML = "grams";
    var caltype = document.getElementById("caltype").value;
    if (caltype == 'g') {
      document.getElementById("l1").innerHTML = "grams";
      document.getElementById("l2").innerHTML = "grams";
      document.getElementById("l3").innerHTML = "grams";
      document.getElementById("l4").innerHTML = "grams";
    }
    if (wtype == "pounds") {
      fat1 = fneed * 0.0022;
      pro1 = pneed * 0.0022;
      car1 = crneed * 0.0022;
      alh1 = aneed * 0.0022;
      fat1 = fat1.toFixed(3);
      pro1 = pro1.toFixed(3);
      car1 = car1.toFixed(3);
      alh1 = alh1.toFixed(3);
      document.getElementById("rf").value = " " + fat1;
      document.getElementById("rp").value = " " + pro1;
      document.getElementById("rh").value = " " + car1;
      document.getElementById("ra").value = " " + alh1;
      document.getElementById("l1").innerHTML = "lbs";
      document.getElementById("l2").innerHTML = "lbs";
      document.getElementById("l3").innerHTML = "lbs";
      document.getElementById("l4").innerHTML = "lbs";
    }
    if (caltype == 'pounds') {
      fat1 = fneed * 0.0022;
      pro1 = pneed * 0.0022;
      car1 = crneed * 0.0022;
      alh1 = aneed * 0.0022;
      fat1 = fat1.toFixed(3);
      pro1 = pro1.toFixed(3);
      car1 = car1.toFixed(3);
      alh1 = alh1.toFixed(3);
      document.getElementById("rf").value = " " + fat1;
      document.getElementById("rp").value = " " + pro1;
      document.getElementById("rh").value = " " + car1;
      document.getElementById("ra").value = " " + alh1;
      document.getElementById("l1").innerHTML = "lbs";
      document.getElementById("l2").innerHTML = "lbs";
      document.getElementById("l3").innerHTML = "lbs";
      document.getElementById("l4").innerHTML = "lbs";
    }
    if (caltype == 'kg') {
      fat2 = fneed / 1000;
      pro2 = pneed / 1000;
      car2 = crneed / 1000;
      alh2 = aneed / 1000;
      fat2 = fat2.toFixed(3);
      pro2 = pro2.toFixed(3);
      car2 = car2.toFixed(3);
      alh2 = alh2.toFixed(3);
      document.getElementById("rf").value = " " + fat2;
      document.getElementById("rp").value = " " + pro2;
      document.getElementById("rh").value = " " + car2;
      document.getElementById("ra").value = " " + alh2;
      document.getElementById("l1").innerHTML = "kilogram";
      document.getElementById("l2").innerHTML = "kilogram";
      document.getElementById("l3").innerHTML = "kilogram";
      document.getElementById("l4").innerHTML = "kilogram";
    }
  }
  else {
    alert("Please fill your details properly!");
  }
}

function con(num) {
  var hc = parseInt(num.value);
  var hi = hc / 2.54;
  var hf = Math.floor(hi / 12);
  var ri = Math.round(hi % 12);
  if (hc > 40 && hc <= 210) {
    document.getElementById("foot").value = hf;
  }
  document.getElementById("inch").value = ri;
}

function hcon() {
  var hf = parseInt(document.getElementById("foot").value);
  var hi = parseInt(document.getElementById("inch").value);
  var hc;
  hc = Math.round((hf * 30.48) + (hi * 2.54));
  document.getElementById("cen").value = hc;
}

function cknum(event, num) {
  var kc;
  if (window.event) {
    kc = event.keyCode;
  }
  else {
    kc = event.which;
  }
  var a = num.value;
  if (kc == 48) {
    if (a == "") {
      return false;
    }
    else {
      return true;
    }
  } if (kc != 8 && kc != 0) {
    if (kc < 49 || kc > 57) {
      return false;
    }
  }
}

function isNumberKey(id) {
  var no = eval('"' + id + '"');
  var number = document.getElementById(no).value;
  if (!number.match(/^[0-9\.]+$/) && number != "") {
    number = number.substring(0, number.length - 1);
    document.getElementById(id).value = number;
  }
}

function convert() {
  var age = parseInt(document.getElementById("age").value);
  var cm = document.getElementById("cen").value;
  var weight = document.getElementById("weight").value;
  if (age != '' && cm != '' && weight != '') {
    var caltype = document.getElementById("caltype").value;
    var fat = document.getElementById("rf").value;
    var pro = document.getElementById("rp").value;
    var car = document.getElementById("rh").value;
    var alh = document.getElementById("ra").value;
    if (caltype == 'g') {
      document.getElementById("rc").value = " " + cneed;
      document.getElementById("rf").value = " " + fneed;
      document.getElementById("rp").value = " " + pneed;
      document.getElementById("rh").value = " " + crneed;
      document.getElementById("ra").value = " " + aneed;
      document.getElementById("l1").innerHTML = "grams";
      document.getElementById("l2").innerHTML = "grams";
      document.getElementById("l3").innerHTML = "grams";
      document.getElementById("l4").innerHTML = "grams";
    }
    if (caltype == 'pounds') {
      fat1 = fneed * 0.0022;
      pro1 = pneed * 0.0022;
      car1 = crneed * 0.0022;
      alh1 = aneed * 0.0022;
      fat1 = fat1.toFixed(3);
      pro1 = pro1.toFixed(3);
      car1 = car1.toFixed(3);
      alh1 = alh1.toFixed(3);
      document.getElementById("rf").value = " " + fat1;
      document.getElementById("rp").value = " " + pro1;
      document.getElementById("rh").value = " " + car1;
      document.getElementById("ra").value = " " + alh1;
      document.getElementById("l1").innerHTML = "lbs";
      document.getElementById("l2").innerHTML = "lbs";
      document.getElementById("l3").innerHTML = "lbs";
      document.getElementById("l4").innerHTML = "lbs";
    }
    if (caltype == 'kg') {
      fat2 = fneed / 1000;
      pro2 = pneed / 1000;
      car2 = crneed / 1000;
      alh2 = aneed / 1000;
      fat2 = fat2.toFixed(3);
      pro2 = pro2.toFixed(3);
      car2 = car2.toFixed(3);
      alh2 = alh2.toFixed(3);
      document.getElementById("rf").value = " " + fat2;
      document.getElementById("rp").value = " " + pro2;
      document.getElementById("rh").value = " " + car2;
      document.getElementById("ra").value = " " + alh2;
      document.getElementById("l1").innerHTML = "kilogram";
      document.getElementById("l2").innerHTML = "kilogram";
      document.getElementById("l3").innerHTML = "kilogram";
      document.getElementById("l4").innerHTML = "kilogram";
    }
  }
  else {
    alert("Please fill your details properly!");
  }
}