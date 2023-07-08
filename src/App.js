import React, { useEffect, useState } from "react";
import "./App.css";
import { getQuizDetails } from "./services/service";
import QuestionUi from "./components/QuestionUi";
import Welcome from "./components/Welcome";
import Footer from "./components/Footer";
import { useAuth0 } from "@auth0/auth0-react";



function App() {
  const { loginWithRedirect, logout, isAuthenticated, user } = useAuth0();
  const [quiz, setQuiz] = useState([]);
  const [step, setStep] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(5);
  const [category, setCategory] = useState(9);
  const [level, setLevel] = useState("easy");
  const [points, setPoints] = useState(0);
  const [start, setStart] = useState(false);

  useEffect(() => {
    const fetchQuizDetails = async () => {
      const data = await getQuizDetails(totalQuestions, category, level);
      setQuiz(data);
    };
    fetchQuizDetails();
  }, [totalQuestions, category, level]);

  const handleSubmit = (e, selectedAns) => {
    e.preventDefault();
    if (selectedAns === quiz[step].answer) {
      setPoints(points + 1);
    }
    if (step !== totalQuestions) {
      setStep(step + 1);
    }
  };

 


  if (!quiz.length) {
    return <h1 className="loader">Loading...</h1>;
  }

  if (step === totalQuestions) {
    return (
      <>
        <div className="exit">
          <h1 style={{ color: `${points >= totalQuestions / 2 ? "green" : "red"}` }}>
            {points >= totalQuestions / 2 ? `CONGRATS!` : `BETTER LUCK NEXT TIME `}
          </h1>
          <h1>You have completed your quiz</h1>
          <h2>TOTAL POINTS: {points}/{totalQuestions}</h2>
          <h3>Want to try again? </h3>
          <button
            className="btn"
            onClick={() => {
              setStep(0);
              setStart(!start);
              setTotalQuestions(5);
              setLevel("easy");
              setCategory(9);
              setPoints(0);
            }}
          >
            New Quiz
          </button>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <div>
      {!isAuthenticated ? (
         <div style={{marginLeft:'510px',marginBottom:'20px',}}>
        <button style={{backgroundColor:'lightblue',marginLeft:'130px',borderRadius:"15px",padding:'15px',marginTop:'50px',fontSize:"20px"}}  onClick={() => loginWithRedirect()}>Log In</button>
        </div>
      ) : (
        <div style={{marginLeft:'510px',marginBottom:'20px',}}>
          <h4>Welcome, {user.name}</h4>
          <button style={{backgroundColor:'lightblue',marginLeft:'130px',borderRadius:"15px",padding:'8px',fontSize:"20px"}} onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
        </div>
      )}
      {isAuthenticated && (
        <>
        {
          start ?(
        <QuestionUi
          question = { quiz[step].question }
          options = { quiz[step].options }
          handleSubmit = { handleSubmit }
              />
      ): (
              <Welcome
          setCategory = { setCategory }
          setTotalQuestions = { setTotalQuestions }
          setLevel = { setLevel }
          setStart = { setStart }
        />
      )}
      <Footer />
      </>
          )}
    </div>
  );
}

export default App;