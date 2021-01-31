// var inputLeft = document.getElementById("input-left");
// var inputRight = document.getElementById("input-right");

function getSliderLeftInputChangeFunction(inputRight) {
    console.log("you're in the first part")
    return function() {
        var _this = inputLeft,
		min = parseInt(_this.min),
		max = parseInt(_this.max);
        console.log("now within the returned callback function")
	    _this.value = Math.min(parseInt(_this.value), parseInt(inputRight.value) - 1);
    }   
}

function getSliderRightInputChangeFunction(inputLeft) {
    return function() {
        var _this = inputRight,
		min = parseInt(_this.min),
		max = parseInt(_this.max);

        _this.value = Math.max(parseInt(_this.value), parseInt(inputLeft.value) + 1);
    }   
}

// inputLeft.addEventListener("input", setLeftValue);
// inputRight.addEventListener("input", setRightValue);

