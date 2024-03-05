// Define image descriptions and initialize the game with descriptions
const descriptions = {
    "bugatti_chiron_super_sport_300_plus.jpeg": {
        "showName": "Bugatti Chiron Super Sport 300+",
        "description": "The fastest car in the world, reaching a top speed of over 300 mph. It's powered by an 8.0-liter quad-turbocharged W16 engine, producing a staggering 1,578 horsepower."
    },
    "hennessey_venom_f5.jpeg": {
        "showName": "Hennessey Venom F5",
        "description": "Known for its remarkable speed, capable of reaching speeds of up to 301 mph. It's equipped with a powerful twin-turbocharged V8 engine generating around 1,817 horsepower."
    },
    "ssc_tuatara.jpeg": {
        "showName": "SSC Tuatara",
        "description": "Gained fame for its record-breaking top speed of 282.9 mph. It features a 5.9-liter twin-turbocharged V8 engine producing 1,750 horsepower."
    },
    "koenigsegg_jesko_absolut.jpeg": {
        "showName": "Koenigsegg Jesko Absolut",
        "description": "Designed for extreme speed, with a theoretical top speed estimated to exceed 330 mph. Its 5.0-liter twin-turbocharged V8 engine generates a remarkable 1,600 horsepower."
    },
    "bugatti_veyron_super_sport.jpeg": {
        "showName": "Bugatti Veyron Super Sport",
        "description": "Held the title of the fastest car in the world for several years, with a top speed of 267 mph. It's powered by an 8.0-liter quad-turbocharged W16 engine, producing 1,184 horsepower."
    },
    "rimac_c_two.jpeg": {
        "showName": "Rimac C_Two",
        "description": "An all-electric hypercar capable of reaching speeds of up to 258 mph. It boasts a sophisticated electric powertrain delivering 1,914 horsepower and impressive acceleration."
    },
    "koenigsegg_agera_rs.jpeg": {
        "showName": "Koenigsegg Agera RS",
        "description": "Set a world record for the highest top speed achieved by a production car on a public road, reaching 277.9 mph. It features a 5.0-liter twin-turbocharged V8 engine producing up to 1,341 horsepower."
    },
    "dodge_challenger_srt_demon.jpeg": {
        "showName": "Dodge Challenger SRT Demon",
        "description": "A high-performance muscle car capable of hitting a top speed of 168 mph. It's powered by a supercharged 6.2-liter Hemi V8 engine producing 840 horsepower."
    },
    "mclaren_speedtail.jpeg": {
        "showName": "McLaren Speedtail",
        "description": "A hybrid hypercar with a top speed of 250 mph. It features a sophisticated hybrid powertrain combining a twin-turbocharged V8 engine with an electric motor, delivering a total output of 1,036 horsepower."
    },
    "porsche_911_gt2_rs.jpeg": {
        "showName": "Porsche 911 GT2 RS",
        "description": "Renowned for its exceptional performance, with a top speed of 211 mph. It's powered by a 3.8-liter twin-turbocharged flat-six engine producing 700 horsepower, making it one of the fastest street-legal production cars available."
    }
};

// Initialize the game with descriptions
initializeGame(descriptions);

// Initialize the game with descriptions
initializeGame(descriptions);

// Function to initialize the game with descriptions
	function initializeGame(descriptions) {
		// Define image data
		const images = Object.keys(descriptions).map(imagePath => ({
			image_path: `static/Images/${imagePath}`,
			show_name: descriptions[imagePath].showName,
			description: descriptions[imagePath].description
		}));

		// Initialize index to track current image, score, and total attempts counter
		let currentIndex = 0;
		let score = 0;
		let totalAttempts = 0; // Add variable to track total attempts
		let incorrectAttempts = 0;
		let soundPlayed = false; // Flag to track whether sound has been played
		let totalImagesCount = 0;

		// Update total count of images
		document.getElementById('total-count').textContent = images.length;

		// Function to display current image, description, and choices
		function displayImage(index) {
			const image = images[index];
			const currentImage = document.getElementById('current-image');
			currentImage.src = image.image_path;
			currentImage.alt = image.show_name;
			document.getElementById('description').textContent = image.description;
			generateChoices(image.show_name);
		}

    // Function to generate multiple choices
	function generateChoices(correctShowName) {
		const choicesContainer = document.getElementById('choices');
		choicesContainer.innerHTML = ''; // Clear previous choices
		const allShowNames = images.map(image => image.show_name);
		const shuffledShowNames = shuffleArray(allShowNames);
		const correctIndex = shuffledShowNames.indexOf(correctShowName);
		shuffledShowNames.splice(correctIndex, 1); // Remove correct answer from the array
		shuffledShowNames.sort(() => Math.random() - 0.5); // Shuffle remaining options
		shuffledShowNames.splice(Math.floor(Math.random() * 4), 0, correctShowName); // Insert correct answer at a random position
		shuffledShowNames.forEach((showName, index) => {
			if (index < 4) {
				const choiceButton = document.createElement('button');
				choiceButton.textContent = showName;
				choiceButton.classList.add('choice-button');
				choiceButton.addEventListener('click', () => {
					totalAttempts++; // Increment total attempts on each choice
					document.getElementById('attempt-count').textContent = totalAttempts; // Update attempts display
					if (showName === correctShowName) {
						choiceButton.style.color = 'white'; // Change text color to white for the correct answer
						document.getElementById('result').textContent = 'Correct!';
						document.getElementById('result').style.display = 'block'; // Show result message
						score++; // Increase score
						document.getElementById('score-value').textContent = score; // Update score display
						setTimeout(() => {
							document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
						}, 2000); // Hide message after 2 seconds
						nextImage(); // Move to next image
					} else {
						document.getElementById('result').textContent = 'Incorrect. Try again';
						document.getElementById('result').style.display = 'block'; // Show result message
						incorrectAttempts++;
						totalAttempts++; // Increment total attempts
						document.getElementById('attempt-count').textContent = totalAttempts; // Update total attempts display
						setTimeout(() => {
							document.getElementById('result').style.display = 'none'; // Hide result message after 2 seconds
						}, 2000); // Hide message after 2 seconds
						if (incorrectAttempts === 3) {
							nextImage(); // Move to next image after 3 incorrect attempts
							incorrectAttempts = 0; // Reset incorrect attempts counter
						}
					}
				});
				choicesContainer.appendChild(choiceButton);
			}
		});
	}


    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
        totalIncorrectAttempts = 0; // Reset total incorrect attempts counter
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        document.getElementById('attempt-count').textContent = totalIncorrectAttempts; // Reset total incorrect attempts display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

    // Function to move to the next image
    function nextImage() {
        currentIndex++;
        if (currentIndex >= images.length) {
            document.getElementById('game-over').innerHTML = 'Game Over<br>Restart?<br>Click here.';
            document.getElementById('game-over').style.display = 'block'; // Show game over message
            document.getElementById('game-over').addEventListener('click', restartGame);
        } else {
            displayImage(currentIndex);
        }
    }

    // Function to restart the game
    function restartGame() {
        currentIndex = 0; // Reset index
        incorrectAttempts = 0; // Reset incorrect attempts counter
		incorrect =0;
        score = 0; // Reset score
        document.getElementById('score-value').textContent = score; // Reset score display
        displayImage(currentIndex); // Display first image
        document.getElementById('game-over').style.display = 'none'; // Hide game over message
    }

	// Event listener for the play sound button
	document.getElementById('play-sound-button').addEventListener('click', function() {
		// Logic to play the sound when the button is clicked
		const audio = new Audio('static/default_sound.mp3');
		audio.play();
		// Set the flag to true indicating the sound has been played
		soundPlayed = true;
		// Hide the play sound button after playing sound
		document.getElementById('play-sound-button').style.display = 'none';
		// Enable the choice buttons after sound is played
		enableChoiceButtons();
		// Display the first image after the sound is played
		displayImage(currentIndex);
		// Update the total images count
		totalImagesCount = images.length;
		// Set the total images count as a CSS custom property
		document.documentElement.style.setProperty('--total-images', totalImagesCount);
		// Update the total images count display
	document.getElementById('total-count').textContent = totalImagesCount;
	});

    // Function to enable choice buttons
    function enableChoiceButtons() {
        const choiceButtons = document.querySelectorAll('.choice-button');
        choiceButtons.forEach(button => {
            button.disabled = false; // Enable each choice button
        });
    }

    // Initial display
    // Since we're removing the sound button, we need to call displayImage directly
    displayImage(currentIndex);
	
    // Optional: Add event listeners for keyboard navigation
    document.addEventListener('keydown', function(event) {
        if (event.key === 'ArrowLeft') {
            currentIndex--;
            if (currentIndex < 0) {
                currentIndex = images.length - 1; // Wrap around to the last image
            }
            displayImage(currentIndex);
        } else if (event.key === 'ArrowRight') {
            currentIndex++;
            if (currentIndex >= images.length) {
                currentIndex = 0; // Wrap around to the first image
            }
            displayImage(currentIndex);
        }
    });
}
