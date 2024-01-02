import { useState, useCallback, useEffect, useRef } from "react";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [specialCharAllowed, setSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm";

    if (numberAllowed) str += "1234567890";
    if (specialCharAllowed) str += "@#$&!_";

    for (let i = 0; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, specialCharAllowed, setPassword]);

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, specialCharAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md px-4 py-8 rounded-lg     text-orange-500 bg-gray-700 my-8">
        <h1 className="text-4xl text-center text-white my-3">
          Password Generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 px-3 py-0.5 text-white shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex item-center gap-x-1">
            <input
              type="range"
              id="length"
              onChange={(e) => setLength(e.target.value)}
              min={6}
              max={25}
              value={length}
              className="cursor-pointer"
            />
            <label htmlFor="length">Length ({length})</label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              id="number"
              defaultChecked={numberAllowed}
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="number">Number </label>
          </div>
          <div className="flex item-center gap-x-1">
            <input
              type="checkbox"
              id="special"
              defaultChecked={specialCharAllowed}
              onChange={() => {
                setSpecialCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="special">Special Character </label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
