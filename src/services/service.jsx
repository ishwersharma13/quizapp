const shuffle = (array) => [...array].sort(() => Math.random() - 0.5);
export const getQuizDetails = async (ammount, category, difficulty) => {
    const res = await fetch(`https://opentdb.com/api.php?amount=${ammount}&category=${category}&difficulty=${difficulty}`);
    let { results } = await await res.json();
    const quiz = results.map((data) => {
        return {
            question: data.question,
            answer: data.correct_answer,
            options: shuffle(data.incorrect_answers.concat(data.correct_answer)),
        };
    });
    return quiz;
};
export const categories = async () => {
    const res = await fetch("https://opentdb.com/api_category.php");
    let { trivia_categories } = await res.json();
    const data = trivia_categories.map((data) => {
        return {
            id: data.id,
            name: data.name,
        };
    });
    return data;
};
