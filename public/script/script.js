'use strict';

const getRangeElement = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const firstNumber = getRangeElement(6, 9);
const secondNumber = getRangeElement(11, 14) - firstNumber;
const result = firstNumber + secondNumber;

const firstNumberElement = document.querySelector('.first-number');
const secondNumberElement = document.querySelector('.second-number');
firstNumberElement.innerHTML = `${firstNumber}`;
secondNumberElement.innerHTML = `${secondNumber}`;
const equallySpan = document.querySelector('.expression_equallity');
const expression_sign = document.querySelector('.expression_sign');

const arrow = document.body.querySelector('.arrows');
const canvas = document.querySelector('.canvas');
const context = canvas.getContext('2d');
const separation = 39;
const firstControlX = (separation * firstNumber) / 2;
const firstControlY = -35;
const endY = 85;
const firstEndX = separation * firstNumber;
const secondControlX = ((separation * firstNumber) + (firstControlX * 2 + (separation * secondNumber))) / 2;
const secondEndX = (separation * secondNumber) + (separation * firstNumber);

const firstArc = () => {
	context.strokeStyle = '#c557ad';
    context.moveTo(-6, 90);
	context.quadraticCurveTo(firstControlX, firstControlY, firstEndX, endY);
	context.stroke();
	arrowEnd(firstEndX);

};

const secondArc = () => {
	context.moveTo(firstEndX, 82);
	context.quadraticCurveTo(secondControlX, firstControlY, secondEndX, endY);
	context.stroke();
	arrowEnd(secondEndX);

};

const arrowEnd = (endX) => {
	context.moveTo(endX, 85);
	context.lineTo(endX - 23, 74);
	context.moveTo(endX, 85);
	context.lineTo(endX - 7, 70);
	context.stroke();
}

const firstNumberInput = document.querySelector('.first-number_input');
arrow.append(firstNumberInput);
firstNumberInput.style.left = (firstControlX - 6 + 'px');
firstNumberInput.style.top = (firstControlY + 35 + 'px');
const secondNumberInput = document.querySelector('.second-number_input');
const resultInput = document.querySelector('.resultInput');

const isValueCorrect = (input, valueToCompare, expressValue) => {
	if (input.value != valueToCompare) {
		input.style.color = 'red';
		expressValue.style.background = '#ffbc3e';
	} else {
		input.disabled = true;
		input.style.color = 'black';
		expressValue.style.background = 'white';
		const allInputs = document.querySelectorAll('input');
		for (let element of allInputs) {
			if (element.disabled) {
				arrow.append(secondNumberInput);
				secondNumberInput.style.display = 'block';
				secondNumberInput.style.left = (secondControlX - 7 + 'px');
				secondNumberInput.style.top = (firstControlY + 35 + 'px');
				secondArc();
			}
		};
	};

	showResult();
};

const showResult = () => {
	if (firstNumberInput.disabled && secondNumberInput.disabled) {
		const expressionWrapper = document.querySelector('.expression_wrapper');
		expression_sign.parentNode.replaceChild(resultInput, expression_sign);
		resultInput.style.display = 'block';
		resultInput.classList.add('resultInput');
	};
}

const isRightAnswer = () => {
	if (Number(resultInput.value) === result) {
		resultInput.disabled = true;
		resultInput.style.color = 'black';
	} else {
		resultInput.style.color = 'red';
	}
};


document.addEventListener('DOMContentLoaded', () => {
	firstArc();
	firstNumberInput.oninput = () => isValueCorrect(firstNumberInput, firstNumber, firstNumberElement);
	secondNumberInput.oninput = () => isValueCorrect(secondNumberInput, secondNumber, secondNumberElement);
	resultInput.oninput = isRightAnswer;
});