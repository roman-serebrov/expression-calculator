function eval() {
    // Do not use eval!!!
    return;
}
const Operators = {
    ["+"]: { priority: 1, calc: (a, b) => a + b },  
    ["-"]: { priority: 1, calc: (a, b) => a - b },  
    ["*"]: { priority: 2, calc: (a, b) => a * b },  
    ["/"]: { priority: 2, calc: (a, b) => a / b },
};

function expressionCalculator(expr) {
    let tocenCode = expr.replaceAll(" ", '&').split("&").filter(el => el !== '')
  const stack = []
  if(tocenCode.length === 1) {
    tocenCode = tocenCode[0].split('')
  }
  for(let tocken of tocenCode) {
    if(!isNaN(tocken)) {
      stack.push({type: "Number", value: tocken})
    }else if(tocken in Operators) {
      stack.push({type:"Function", calc: Operators[tocken].calc, priority: Operators[tocken].priority, value: tocken} )
    } else if(tocken === '(') {
      stack.push({type: 'leftBreckets', value: '('})
    }
    else if(tocken === ')') {
      stack.push({type: 'rightBrackets', value: ')', priority: 1})
    }
  }
  let res = expression(stack)
  return res[0]
  
}
function expression(formula) {

    const operands = []
    const operators = []
    for(let tocken of formula) {
      switch(tocken.type) {
        case "Number":
          operands.push(Number(tocken.value))
          break;
        case "Function":
          expCalc(operands, operators, tocken.priority)
          operators.push(tocken)
          break;  
        case "leftBreckets":
          operators.push(tocken)
          break;
         case "rightBrackets":
          expCalc(operands, operators, tocken.priority)
          operators.pop()
          break;
      }
    }
    expCalc(operands,operators, 0)
    return operands
  }
  
  function expCalc(operands, operators, minPr) {
    while(operators.length && (operators[operators.length - 1].priority >= minPr)){
      let operator = operators.pop()
      let n2 = operands.pop()
      let n1 = operands.pop()
      let res = operator.calc(n1, n2)
      if(isNaN(res)) throw new Error("ExpressionError: Brackets must be paired")
    if(!isFinite(operator.calc(n1, n2))) {
      throw new Error("TypeError: Division by zero.")
    }
      operands.push(Number(res))
    }
  }
  
module.exports = {
    expressionCalculator
}