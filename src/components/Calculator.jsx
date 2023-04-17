import React, { useEffect } from 'react'

const Calculator = () => {

  const [result, setResult] = React.useState("");

  // get last character
  const getLastChar = (str) => {
    if (str.length === 0) return ""
    return str[str.length - 1];
  }

  // common function for checking operator condition
  const addOperator = (operator) => {
    const l = getLastChar(result);
    if (l === "+" || l === "-" || l === "*" || l === "/" || l === "." || l === "") {
      setResult(result + "")
    } else {
      setResult(result + operator)
    }
  }

  // checking dot condition
  const addDot = (dot) => {
    const l = getLastChar(result);
    if (l === "+" || l === "-" || l === "*" || l === "/" || l === "." || l === "") {
      setResult(result + 0 + dot)
    } else {
      const arr = result.split(/[\+\-\*\/]/);
      const last = arr[arr.length - 1];
      if (last.includes(".")) {
        setResult(result + "")
      } else {
        setResult(result + dot)
      }
    }
  }

  // get the value of the button
  const getValue = (e) => {
    const value = e.target.value;
    switch (value) {
      case "+":
        addOperator(value);
        break;
      case "-":
        addOperator(value);
        break;
      case "*":
        addOperator(value);
        break;
      case "/":
        addOperator(value);
        break;
      case ".":
        addDot(value);
        break;
      default:
        setResult(result + value)
    }
  }

  // evaluate the result
  const evaluate = () => {
    const l = getLastChar(result);
    if (l === "+" || l === "-" || l === "*" || l === "/" || l === "." || l === "") {
      setResult(result + "")
    } else {
      let res = eval(result).toString()
      setResult(res)
    }
  }


  // handle the keyboard input 
  const handleKeyDown = (e) => {
    const keyArray = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0", "+", "-", "*", "/", ".", "Enter", "Backspace", "Escape", "e"]

    // handle only the keys in the keyArray
    if (!keyArray.includes(e.key)) {
      return;
    }

    const key = e.key;
    if (key === "Enter") {
      evaluate()
    } else if (key === "Backspace") {
      setResult(result.slice(0, -1))
    } else if (key === "Escape") {
      setResult("")
    } else if (key === "e") {
      setResult("2.718281828459")
    } else {
      getValue({ target: { value: key } })
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    }
  }, [result])

  return (
    <>
      <div className="container">

        <div className="result_Section">
          <input id="screen" type="text" placeholder="0" disabled value={result} />
        </div>

        <div className="button_Section">
          <button onClick={() => { setResult("") }}><b>AC</b></button>
          <button onClick={() => { setResult("2.718281828459") }}>e</button>
          <button value="/" onClick={getValue}>/</button>
          <button onClick={() => { setResult(result.slice(0, -1)) }}><b>DEL</b></button>

          <button className="btn" value="7" onClick={getValue}>7</button>
          <button className="btn" value="8" onClick={getValue}>8</button>
          <button className="btn" value="9" onClick={getValue}>9</button>
          <button value="*" onClick={getValue}>*</button>

          <button className="btn" value="4" onClick={getValue}>4</button>
          <button className="btn" value="5" onClick={getValue}>5</button>
          <button className="btn" value="6" onClick={getValue}>6</button>
          <button value="+" onClick={getValue}>+</button>

          <button className="btn" value="1" onClick={getValue}>1</button>
          <button className="btn" value="2" onClick={getValue}>2</button>
          <button className="btn" value="3" onClick={getValue}>3</button>
          <button value="-" onClick={getValue}>-</button>

          <button className="btn doubleZero" value="00" onClick={getValue}>00</button>
          <button className="btn" value="0" onClick={getValue}>0</button>
          <button id="point" value="." onClick={getValue}>.</button>
          <button className="equalBtn" onClick={evaluate}><b> =</b></button>
        </div>

      </div>
    </>
  )
}

export default Calculator