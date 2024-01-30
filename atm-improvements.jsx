const ATMDeposit = ({ onChange, isDeposit, isRendered, isValid }) => {
  const choice = ['Deposit', 'Cash Back'];
  console.log(`ATM isDeposit: ${isDeposit}`);
  console.log('atmdeposit - isValid', isValid)

  return (
    <label className="label huge">
      <h3> {choice[Number(!isDeposit)]}</h3>
      {isRendered && <div>
      <input id="number-input" type="number" width="200" onChange={onChange}></input>
      <input type="submit" width="200" value="Submit" id="submit-input" disabled={!isValid}></input>
      </div>}
    </label>
  );
};

const Account = () => {
  const [deposit, setDeposit] = React.useState(0);
  const [totalState, setTotalState] = React.useState(0);
  const [isDeposit, setIsDeposit] = React.useState(true);
  const [atmMode, setAtmMode] = React.useState("");
  const [isRendered, setIsRendered] = React.useState(false);
  const [validTransaction, setValidTransaction] = React.useState(false);

  let status = `Account Balance $ ${totalState} `;
  console.log(`Account Rendered with isDeposit: ${isDeposit}`);
  const handleChange = (event) => {
    console.log(`handleChange ${event.target.value}`);
    setDeposit(Number(event.target.value));
    if (Number(event.target.value) <= 0) {
      setValidTransaction(false);
      return;
    }
    else if ((atmMode === "Cash Back") && (Number(event.target.value) > totalState)) {
      setValidTransaction(false);
    } else {
      setValidTransaction(true);
    }
  };
  const handleSubmit = (event) => {
    let newTotal = isDeposit ? totalState + deposit : totalState - deposit;
    setTotalState(newTotal);
    event.preventDefault();
  };
  const handleModeSelect = (event) => {
    setAtmMode(event.target.value);
    switch (event.target.value) {
      case "Deposit":
        setIsDeposit(1);
        !isRendered ? setIsRendered(true) : null;
        break;
      case "Cash Back":
        setIsDeposit(0);
        !isRendered ? setIsRendered(true) : null;
        break;
      default:
        setDeposit(Number(event.target.value));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 id="total">{status}</h2>
      <label>Select an action below to continue</label>
      <select onChange={(e) => handleModeSelect(e)} name="mode" id="mode-select">
      <option id="no-selection" value=""></option>
      <option id="deposit-selection" value="Deposit">Deposit</option>
      <option id="cashback-selection" value="Cash Back">Cash Back</option>
      </select>
      {isRendered && <div>
      <ATMDeposit onChange={handleChange} isDeposit={isDeposit} isRendered={isRendered} isValid={validTransaction}></ATMDeposit>
      </div>}
    </form>
  );
};
// ========================================
ReactDOM.render(<Account />, document.getElementById('root'));
