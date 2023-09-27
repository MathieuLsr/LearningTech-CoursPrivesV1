import React from 'react';

function SelectionNiveauScolaire({ niveau }) {

  niveau["select"] = false

  const changeValue = () => {
      niveau["select"] = !niveau["select"]
      //if(niveau["select"] === true) list.push(niveau["INT_ID"])
  }
/*
  <label key={ele["STR_Name"]}>
    <input type="checkbox" value={ele["STR_Name"]} />
    {ele["STR_Name"]}
  </label>
*/
  return (
    <div>
      <label key={niveau["STR_Name"]}>
        <input type="checkbox" value={niveau["STR_Name"]} onChange={changeValue}/>
        {niveau["STR_Name"]}
      </label>
    </div>
  );
}
export default SelectionNiveauScolaire;
