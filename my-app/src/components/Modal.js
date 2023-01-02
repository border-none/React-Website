function Modal(props) {
  function yes() {
    //
  }
  function no() {
    //
  }
  return (
    <>
      <div className="modal">
        <div className="modal--container">
          <h3>{props.message}</h3>
          <div className="yesno">
            <button className="yes" onClick={yes}>
              YES
            </button>
            <button onClick={no}>CANCEL</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Modal;
