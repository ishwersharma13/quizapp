import React, { useState } from "react";
const QuestionUi = ({ question, options, handelSubmit, }) => {
    let [selectedAns, setSelectedAns] = useState("");
    const handelSelection = (e) => {
        setSelectedAns(e.target.value);
    };
    function createMarkup() { return { __html: question }; }
    ;
    return (<div className='question'>
      <div className='questionBox'>
      <h1 dangerouslySetInnerHTML={createMarkup()}></h1>
      <form onSubmit={(e) => handelSubmit(e, selectedAns)}>
        {options.map((e, ind) => {
            return (<div className='options' key={ind}>
              <label>
                <input type="radio" name="opt" value={e} onChange={handelSelection} required checked={selectedAns === e}/>
                {e}
              </label>
            </div>);
        })}

        <input type="submit" value="submit"/>
      </form>
      </div>
    </div>);
};
export default QuestionUi;
