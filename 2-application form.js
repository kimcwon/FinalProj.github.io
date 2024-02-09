//FUNCTION FOR ENABLING AND DISABLING ENTRY FIELDS OF MIDDLE NAME AND SUFFIX BASED ON CHECK BOX
function checkbox() {
    //Get entries
    var middleNameField = document.getElementById("middlename");
    var disableMiddleNameCheckbox = document.getElementById("disableMiddleName");

    //Disable Middle Name field if checkbox is ticked
    middleNameField.disabled = disableMiddleNameCheckbox.checked;

    //Get entries
    var suffixField = document.getElementById("suffix");
    var disableSuffixCheckbox = document.getElementById("disableSuffix");

    //Disable Suffix field if checkbox is ticked
    suffixField.disabled = disableSuffixCheckbox.checked;
}

// DROPDOWN MENU FOR <COLLEGE>
var collegeOptions = {
    "Undergrad": ["College of Accountancy and Finance (CAF)", "College of Architecture, Design and the Built Environment (CADBE)", "College of Arts and Letters (CAL)", "College of Business Administration (CBA)", "College of Communication (COC)", "College of Computer and Information Sciences (CCIS)", "College of Education (COED)", "College of Engineering (CE)", "College of Human Kinetics (CHK)", "College of Law (CL)", "College of Political Science and Public Administration (CPSPA)", "College of Social Sciences and Development (CSSD)", "College of Science (CS)", "College of Tourism, Hospitality and Transportation Management (CTHTM)"],
    "College of Law": [],
    "Graduate School": ["Doctorate Degree Program", "Master's Degree Program", "Graduate Diploma Program"],
    "Open University": ["Institute of Open and Distance Education / Transnational Education", "Institute of Non-Traditional Study Program and ETEEAP", "Institute for Continuing and Professional Development"],
    "Institute of Technology": []
};

function updateCollegeDropdown() {
    //Get the selected value in <Educational Level> and <College> fields
    var levelDropdown = document.getElementById("level");
    var collegeDropdown = document.getElementById("college");

    // Clear current options if user selects a wrong one
    collegeDropdown.innerHTML = '<option value="" disabled selected></option>';

    // Get selected <Level>
    var selectedLevel = levelDropdown.value;

    // Add new options based on the selected <Educational Level>
    collegeOptions[selectedLevel].forEach(function (option) {
        var newOption = document.createElement("option");
        newOption.text = option;
        newOption.value = option;
        collegeDropdown.add(newOption);
    });

    // Disabling <College> dropdown of ITech and CL
    if (selectedLevel === "College of Law" || selectedLevel === "Institute of Technology") {
        collegeDropdown.disabled = true;
    } else {
        collegeDropdown.disabled = false;
    }
}

// Initialize the College dropdown when the page loads
window.onload = function () {
    updateCollegeDropdown();
};

//THIS FUNCTION CHECKS IF ALL FIELDS REQUIRED HAVE AN ENTRY
function validateForm() {
    var attributes = [
        { name: "applicationtype", message: "Application type is required." },
        { name: "level", message: "Educational level is required." },
        { name: "studentnumber", message: "Student number is required." },
        { name: "firstname", message: "First name is required." },
        { name: "middlename", message: "Middle name is required." },
        { name: "lastname", message: "Last name is required." },
        { name: "suffix", message: "Suffix is required." },
        { name: "gender", message: "Gender is required." },
        { name: "birthday", message: "Birthday is required." },
        { name: "college", message: "College is required." },
        { name: "pys", message: "PYS is required." },
        { name: "address", message: "Address is required." },
        { name: "phonenumber", message: "Phone number is required." },
        { name: "email", message: "Email is required and must be valid." },
        { name: "ename", message: "Person to contact in case of emergency is required." },
        { name: "ephonenumber", message: "Person to contact in case of emergency's phone number is required." },
        { name: "eaddress", message: "Person to contact in case of emergency's address is required." }
    ];
    //Check if suffix, middle name, and college entries are disabled
    var isSuffixDisabled = document.getElementById("disableSuffix").checked;
    var isMiddleNameDisabled = document.getElementById("disableMiddleName").checked;
    var isCollegeDisabled = document.getElementById("college").disabled;

    for (var i = 0; i < attributes.length; i++) {
        var value = document.forms["IDReplacementForm"][attributes[i].name].value;
        //Statements to skip suffix, middle name and college IF disabled
        if (attributes[i].name === "suffix" && isSuffixDisabled) {
            continue;
        }

        if (attributes[i].name === "middlename" && isMiddleNameDisabled) {
            continue;
        }

        if (attributes[i].name === "college" && isCollegeDisabled) {
            continue;
        }
        //Email format checker and if NOT empty
        if (attributes[i].name === "email") {
            var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (value == "" || !emailPattern.test(value)) {
                alert(attributes[i].message);
                return false;
            }
        } else {
            // Check if other attributes are not empty
            if (value == "") {
                alert(attributes[i].message);
                return false;
            }
        }
    }

    alert("Form submitted successfully!");
    return true;
}
