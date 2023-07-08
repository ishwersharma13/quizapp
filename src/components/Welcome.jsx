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
      <img src="https://t4.ftcdn.net/jpg/04/39/13/37/360_F_439133763_FrLdhZsd5aGC23r9ATARuKJBr8ifZjIe.jpg" alt="" />
      <div className="heading">
      <div className="landing-page">
      <header className="landing-page-header">
        <h1 className="landing-page-title">MindQuiz</h1>
        <p className="landing-page-subtitle">Unleash Your Knowledge</p>
      </header>
      <section className="landing-page-section">
        <h2 className="landing-page-section-title">Challenge Your Mind</h2>
        <p className="landing-page-section-description">Put your knowledge to the test with captivating quizzes covering a wide range of topics. From history and science to pop culture and sports, there's something for everyone.</p>
      </section>
      </div>
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
