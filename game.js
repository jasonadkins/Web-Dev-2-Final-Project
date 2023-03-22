import { getClue as getClueFromCallback } from './callback-version.js';
import { getClue as getClueFromPromise } from './promise-version.js';
import { getClue as getClueFromAsyncFunction } from './async-await-version.js';
let answer = document.getElementById('answer');
let score = 0;
let playerResponse = document.getElementById('player-response');


function htmlClues(clue) {
    document.getElementById('answer').innerHTML = clue.answer;
    document.getElementById('question').innerHTML = clue.question;
    document.getElementById('value').innerHTML = clue.value;
    document.getElementById('category-title').innerHTML = clue.category.title;
    let isValid = 'valid';
    if (clue.invalid_count && clue.invalid_count > 0) {
        isValid = 'inValid';
    }

    document.getElementById('invalid-count').innerHTML = isValid
    document.getElementById('invalid-count').classList.add('is-hidden')

}

document
    .getElementById('use-callback')
    .addEventListener('click', () => {
        getClueFromCallback((err, clue) => {
            if (err !== null) return console.error(err);
            htmlClues(clue)
        }
        );
        document.getElementById('answer').classList.add('is-hidden');
        document.getElementById('check-response').classList.remove('is-hidden');


    });


document
    .getElementById('use-async-await')
    .addEventListener('click',async ()=>{
        try{
            const clue = await getClueFromAsyncFunction();
            htmlClues(clue);
        } catch(err){
            console.log(err.message);
        }
        document.getElementById('answer').classList.add('is-hidden');
        document.getElementById('check-response').classList.remove('is-hidden');


    }
    )

document
    .getElementById('use-promise')
    .addEventListener('click', ()=>{
        getClueFromPromise()
            .then(clue => htmlClues(clue))
            .catch(err => console.log(err.message));

        document.getElementById('answer').classList.add('is-hidden');
        document.getElementById('check-response').classList.remove('is-hidden');

    }
        )

document
    .getElementById('check-response')
    .addEventListener('click', ()=>{
        if(playerResponse.value.trim() === answer.innerHTML){
            let score1 = parseInt(document.getElementById('value').innerHTML);
            score += score1;
            document.getElementById('score').innerHTML = score;

        }else{
            console.log(score)
            let score1 = parseInt(document.getElementById('value').innerHTML);
            score -= score1;
            document.getElementById('score').innerHTML = score;

        }

        document.getElementById('answer').classList.remove('is-hidden');
        document.getElementById('check-response').classList.add('is-hidden');
        document.getElementById('invalid-count').classList.add('is-hidden')
    })
