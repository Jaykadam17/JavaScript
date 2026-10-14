
function validateEmail(executionContext) {

    var formContext = executionContext.getFormContext();

    var email = formContext
        .getAttribute("jk_emailaddress")
        .getValue();

    formContext.ui.clearFormNotification("EMAIL_ERROR");

    if (email != null) {

        email = email.toLowerCase();

        if (email.endsWith("@nsquarexperts.com")) {

            formContext.ui.setFormNotification(
                "Email address from @nsquarexperts.com is not allowed.",
                "ERROR",
                "EMAIL_ERROR"
            );

            formContext
                .getAttribute("jk_emailaddress")
                .setValue(null);
        }
    }
}




// Runs when WoW Moment form opens
function shopFilterOnLoad(executionContext) {

    var formContext = executionContext.getFormContext();

    var shopControl =
        formContext.getControl("jk_shops");

    // Register filtering before Shops lookup opens
    shopControl.addPreSearch(function () {
        filterShops(formContext);
    });

    // Check Occasion and lock/unlock Shops
    controlShopField(formContext);
}


// Runs when the Occasion value changes
function occasionOnChange(executionContext) {

    var formContext = executionContext.getFormContext();

    var shopField =
        formContext.getAttribute("jk_shops");

    // Clear the previously selected Shop
    shopField.setValue(null);

    // Check Occasion and lock/unlock Shops
    controlShopField(formContext);
}


// Locks or unlocks the Shops field
function controlShopField(formContext) {

    var occasionValue =
        formContext.getAttribute("jk_occasion").getValue();

    var shopControl =
        formContext.getControl("jk_shops");

    if (occasionValue != null) {

        // Occasion selected, unlock Shops
        shopControl.setDisabled(false);

    } else {

        // Occasion empty, lock Shops
        shopControl.setDisabled(true);
    }
}


// Filters Shops based on the selected Occasion
function filterShops(formContext) {

    var occasionValue =
        formContext.getAttribute("jk_occasion").getValue();

    var shopControl =
        formContext.getControl("jk_shops");

    // Stop when Occasion is empty
    if (occasionValue == null) {
        return;
    }

    // Shop.Events Organized Here must equal selected Occasion
    var filter =
        "<filter type='and'>" +
            "<condition " +
                "attribute='jk_eventsorganizedhere' " +
                "operator='eq' " +
                "value='" + occasionValue + "' />" +
        "</filter>";

    // Apply the filter to the Shops lookup
    shopControl.addCustomFilter(filter);
}


// Runs when First Name changes
function firstNameOnChange(executionContext) {

    var formContext = executionContext.getFormContext();

    validateName(
        formContext,
        "jk_firstname",
        "First Name",
        "firstNameError"
    );
}


// Runs when Last Name changes
function lastNameOnChange(executionContext) {

    var formContext = executionContext.getFormContext();

    validateName(
        formContext,
        "jk_lastname",
        "Last Name",
        "lastNameError"
    );
}


// Common function used to validate both names
function validateName(formContext, fieldName, displayName, errorId) {

    var nameValue = formContext
        .getAttribute(fieldName)
        .getValue();

    var nameControl = formContext
        .getControl(fieldName);

    // Clear our previous error message first
    nameControl.clearNotification(errorId);

    // Stop when the field is empty
    // Mandatory field validation will handle empty values
    if (nameValue == null || nameValue == "") {
        return;
    }

    // At least 2 characters are required
    if (nameValue.length < 2) {

        nameControl.setNotification(
            displayName + " must contain at least two characters.",
            errorId
        );

        return;
    }

    // Allow letters and an optional hyphen between names
    var namePattern = /^[A-Za-z]+(-[A-Za-z]+)*$/;

    if (!namePattern.test(nameValue)) {

        nameControl.setNotification(
            displayName +
            " can contain only alphabetic characters and hyphens.",
            errorId
        );
    }
}






// Runs when Mobile Number changes
function mobileNumberOnChange(executionContext) {

    var formContext = executionContext.getFormContext();

    var mobileValue = formContext
        .getAttribute("jk_mobilenumber")
        .getValue();

    var mobileControl = formContext
        .getControl("jk_mobilenumber");

    // Clear the previous error first
    mobileControl.clearNotification("mobileNumberError");

    // Stop when Mobile Number is empty
    // Mandatory-field validation will handle empty values
    if (mobileValue == null || mobileValue == "") {
        return;
    }

    // Must start with +91 and contain exactly 10 digits after it
    var mobilePattern = /^\+91[0-9]{10}$/;

    if (!mobilePattern.test(mobileValue)) {

        mobileControl.setNotification(
            "Mobile Number must start with +91 and contain exactly 10 digits without spaces.",
            "mobileNumberError"
        );
    }
}


function rejectionRemarksValidation(executionContext) {

    var formContext = executionContext.getFormContext();

    var approvalValue = formContext
        .getAttribute("jk_managementapproval")
        .getValue();

    var remarksField = formContext
        .getAttribute("jk_rejectionremarks");

    var remarksControl = formContext
        .getControl("jk_rejectionremarks");

    var rejectedValue = 123690002;

    if (approvalValue == rejectedValue) {

        remarksControl.setVisible(true);
        remarksField.setRequiredLevel("required");

    } else {

        remarksField.setRequiredLevel("none");
        remarksControl.setVisible(false);
    }
}
