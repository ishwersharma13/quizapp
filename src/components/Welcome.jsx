import React, { useEffect, useState } from "react";
import { categories } from "../services/service";
const Welcome = ({ setCategory, setTotalQuestions, setLevel, setStart, }) => {
    const [name, setName] = useState();
    useEffect(() => {
        const data = async () => {
            const category = await categories();
            setName(category.map((e) => e.name));
        };
        data();
    }, []);
    let handelCategory = (e) => {
        setCategory(e.target.selectedIndex + 9);
    };
    let handelAmmount = (e) => {
        setTotalQuestions(parseInt(e.target.value, 10));
    };
    let handelDifficulty = (e) => {
        setLevel(e.target.value);
    };
    let handelSubmit = (e) => {
        e.preventDefault();
        setStart(true);
    };
    return (<div className="welcome">
      <div className="heading">
        <h1>Welcome to the Ultimate Quiz App</h1>
        <p>Select your ultimate quiz and test your knowledge </p>
      </div>
      <div>
        <form onSubmit={(e) => {
            handelSubmit(e);
        }}>
          <div className="form">
            <div className="box">
              <h3>Catagories</h3>
              <select name="category" onChange={(e) => handelCategory(e)}>
                {name?.map((e, i) => {
            return (<option key={i} value={e}>
                      {e}
                    </option>);
        })}
              </select>
            </div>
            <div className="box">
              <h3>Total Questions</h3>
              <select name="ammount" onChange={(e) => handelAmmount(e)}>
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
                <option value={25}>25</option>
              </select>
            </div>
            <div className="box">
              <h3>Difficulty Level</h3>
              <select name="difficulty" onChange={(e) => handelDifficulty(e)}>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </div>
          <div className="startQuiz">
            <input type="submit" value="START QUIZ"/>
          </div>
        </form>
      </div>
      <p className="youCanDoIt">You can Do it !</p>
    </div>);
};
export default Welcome;
