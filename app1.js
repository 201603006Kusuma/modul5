var score, roundScore, activePlayer, gamePlaying, A = 0;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){   
    if(gamePlaying){
		// 1. untuk acak nomer
        var Dadu1 = Math.floor(Math.random() * 6) + 1;
        var Dadu2 = Math.floor(Math.random() * 6) + 1;
		//2. hasil dari acak nomer
        var DaduDOM = document.querySelector('.Dadu1');
        var DaduDOM2 = document.querySelector('.Dadu2');
        DaduDOM.style.display = 'block';
        DaduDOM2.style.display = 'block';
        DaduDOM.src = 'dice-' + Dadu1 + '.png';
        DaduDOM2.src = 'dice-' + Dadu2 + '.png';
        
        var simpan = document.createTextNode("[" + Dadu2 + "," + Dadu1 + "]");
        document.getElementById('history').appendChild(simpan);
		
        if (Dadu1 !==1 && Dadu2 !== 1)
        {
			//tambah Nilai dadu
            roundScore += Dadu1 + Dadu2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
			if(Dadu1===6 || Dadu2 === 6){
				A += 1;
				if(A === 2){
					scores[activePlayer] = 0;
					document.querySelector('#score-' + activePlayer).textContent = 0;
					nextPlayer();
				}
			}
			else{
				A = 0;
			}
        }
        else{
			//pemain berikutnya
			A = 0;
			nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){    
    if(gamePlaying){
		var batas = document.querySelector('.skorakhirpermainan').value;
		
		scores[activePlayer] += roundScore;
        
	
		document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];
		var skorakhirpermainan;
		
		
		if(batas){
			skorakhirpermainan = batas;
		}
		else{
			skorakhirpermainan = 100;
		}
        if (scores[activePlayer] >= skorakhirpermainan){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.Dadu1').style.display = 'none';
			document.querySelector('.Dadu2').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
        
            gamePlaying = false;
        }
        else{
			//pemain berikutnya
			nextPlayer();
        }
    }
});

function nextPlayer(){
	//pemain berikutnya
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;
	A = 0;
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
	document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');
   
}
document.querySelector('.btn-new').addEventListener('click', init);
function init(){
    scores = [0,0];
    activePlayer = 0;
    roundScore = 0;
    gamePlaying = true;    
    document.querySelector('.Dadu1').style.display = 'none';
    document.querySelector('.Dadu2').style.display = 'none';
    document.getElementById('score-0').textContent = '0';
    document.getElementById('score-1').textContent = '0';
    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}