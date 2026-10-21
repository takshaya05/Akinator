use("akinator_db");

db.characters.insertMany([
  {
    name: "Aamir Khan",
    type: "real",
    category: "Bollywood",
    movie: "Dangal",
    gender: "Male",
    speciality: "Meticulous method acting"
  },
  {
    name: "Abhishek Bachchan",
    type: "real",
    category: "Bollywood",
    movie: "Dhoom",
    gender: "Male",
    speciality: "Naturalistic dramatic performances"
  },
  {
    name: "Aishwarya Rai Bachchan",
    type: "real",
    category: "Bollywood",
    movie: "Devdas",
    gender: "Female",
    speciality: "Expressive eyes and elegance"
  },
  {
    name: "Ajay Devgn",
    type: "real",
    category: "Bollywood",
    movie: "Singham",
    gender: "Male",
    speciality: "Intense cop portrayals"
  },
  {
    name: "Ajith Kumar",
    type: "real",
    category: "Kollywood",
    movie: "Mankatha",
    gender: "Male",
    speciality: "Stylish antihero performances"
  },
  {
    name: "Akshay Kumar",
    type: "real",
    category: "Bollywood",
    movie: "Hera Pheri",
    gender: "Male",
    speciality: "Rapid-fire comic delivery"
  },
  {
    name: "Aladdin",
    type: "fictional",
    category: "Disney",
    movie: "Aladdin",
    gender: "Male",
    speciality: "Magic carpet adventures"
  },
  {
    name: "Alia Bhatt",
    type: "real",
    category: "Bollywood",
    movie: "Gangubai Kathiawadi",
    gender: "Female",
    speciality: "Emotionally layered character portrayals"
  },
  {
    name: "Allu Arjun",
    type: "real",
    category: "Tollywood",
    movie: "Pushpa: The Rise",
    gender: "Male",
    speciality: "Signature dance and mannerisms"
  },
  {
    name: "Amitabh Bachchan",
    type: "real",
    category: "Bollywood",
    movie: "Sholay",
    gender: "Male",
    speciality: "Commanding baritone voice"
  },
  {
    name: "Anne Hathaway",
    type: "real",
    category: "Hollywood",
    movie: "The Princess Diaries",
    gender: "Female",
    speciality: "Versatile performances across comedy and drama"
  },
  {
    name: "Anushka Sharma",
    type: "real",
    category: "Bollywood",
    movie: "Rab Ne Bana Di Jodi",
    gender: "Female",
    speciality: "Effortless modern romantic roles"
  },
  {
    name: "Anushka Shetty",
    type: "real",
    category: "Tollywood",
    movie: "Baahubali: The Conclusion",
    gender: "Female",
    speciality: "Powerful warrior princess portrayals"
  },
  {
    name: "Ariel",
    type: "fictional",
    category: "Disney",
    movie: "The Little Mermaid",
    gender: "Female",
    speciality: "Mermaid fascination with humans"
  },
  {
    name: "Batman",
    type: "fictional",
    category: "DC",
    movie: "The Dark Knight",
    gender: "Male",
    speciality: "Detective skills and gadgets"
  },
  {
    name: "Belle",
    type: "fictional",
    category: "Disney",
    movie: "Beauty and the Beast",
    gender: "Female",
    speciality: "Bookish and compassionate nature"
  },
  {
    name: "Black Panther",
    type: "fictional",
    category: "Marvel",
    movie: "Black Panther",
    gender: "Male",
    speciality: "Vibranium suit and royal leadership"
  },
  {
    name: "Black Widow",
    type: "fictional",
    category: "Marvel",
    movie: "Avengers: Endgame",
    gender: "Female",
    speciality: "Espionage and elite combat"
  },
  {
    name: "Brad Pitt",
    type: "real",
    category: "Hollywood",
    movie: "Fight Club",
    gender: "Male",
    speciality: "Magnetic screen charisma"
  },
  {
    name: "Buzz Lightyear",
    type: "fictional",
    category: "Pixar",
    movie: "Toy Story",
    gender: "Male",
    speciality: "Space ranger catchphrases"
  },
  {
    name: "Captain America",
    type: "fictional",
    category: "Marvel",
    movie: "Captain America: The First Avenger",
    gender: "Male",
    speciality: "Indestructible shield mastery"
  },
  {
    name: "Cinderella",
    type: "fictional",
    category: "Disney",
    movie: "Cinderella",
    gender: "Female",
    speciality: "Glass slipper and midnight escape"
  },
  {
    name: "Darth Vader",
    type: "fictional",
    category: "Star Wars",
    movie: "Star Wars: The Empire Strikes Back",
    gender: "Male",
    speciality: "Breathing mask and Force powers"
  },
  {
    name: "Deadpool",
    type: "fictional",
    category: "Marvel",
    movie: "Deadpool",
    gender: "Male",
    speciality: "Fourth-wall breaking humor"
  },
  {
    name: "Deepika Padukone",
    type: "real",
    category: "Bollywood",
    movie: "Padmaavat",
    gender: "Female",
    speciality: "Regal screen presence"
  },
  {
    name: "Dhanush",
    type: "real",
    category: "Kollywood",
    movie: "Asuran",
    gender: "Male",
    speciality: "Raw emotional transformations"
  },
  {
    name: "Doctor Strange",
    type: "fictional",
    category: "Marvel",
    movie: "Doctor Strange",
    gender: "Male",
    speciality: "Multidimensional spellcasting"
  },
  {
    name: "Dulquer Salmaan",
    type: "real",
    category: "Mollywood",
    movie: "Sita Ramam",
    gender: "Male",
    speciality: "Charming romantic portrayals"
  },
  {
    name: "Dwayne Johnson",
    type: "real",
    category: "Hollywood",
    movie: "Jumanji: Welcome to the Jungle",
    gender: "Male",
    speciality: "Charismatic action-comedy roles"
  },
  {
    name: "Elsa",
    type: "fictional",
    category: "Disney",
    movie: "Frozen",
    gender: "Female",
    speciality: "Ice magic and snowstorms"
  },
  {
    name: "Emma Watson",
    type: "real",
    category: "Hollywood",
    movie: "Beauty and the Beast",
    gender: "Female",
    speciality: "Intelligent and independent character portrayals"
  },
  {
    name: "Fahadh Faasil",
    type: "real",
    category: "Mollywood",
    movie: "Aavesham",
    gender: "Male",
    speciality: "Unpredictable character transformations"
  },
  {
    name: "Goku",
    type: "fictional",
    category: "Anime",
    movie: "Dragon Ball Super: Broly",
    gender: "Male",
    speciality: "Limit-breaking Saiyan transformations"
  },
  {
    name: "Govinda",
    type: "real",
    category: "Bollywood",
    movie: "Coolie No. 1",
    gender: "Male",
    speciality: "Expressive comic dancing"
  },
  {
    name: "Harry Potter",
    type: "fictional",
    category: "Wizarding World",
    movie: "Harry Potter and the Deathly Hallows: Part 2",
    gender: "Male",
    speciality: "Lightning-shaped scar and wizardry"
  },
  {
    name: "Hema Malini",
    type: "real",
    category: "Bollywood",
    movie: "Sholay",
    gender: "Female",
    speciality: "Classical dance elegance"
  },
  {
    name: "Hermione Granger",
    type: "fictional",
    category: "Wizarding World",
    movie: "Harry Potter and the Deathly Hallows: Part 2",
    gender: "Female",
    speciality: "Brilliant spells and bookish intelligence"
  },
  {
    name: "Hrithik Roshan",
    type: "real",
    category: "Bollywood",
    movie: "Krrish",
    gender: "Male",
    speciality: "Precision dance and athleticism"
  },
  {
    name: "Hulk",
    type: "fictional",
    category: "Marvel",
    movie: "The Avengers",
    gender: "Male",
    speciality: "Anger-fueled superhuman strength"
  },
  {
    name: "Iron Man",
    type: "fictional",
    category: "Marvel",
    movie: "Avengers: Endgame",
    gender: "Male",
    speciality: "Genius-built powered armor"
  },
  {
    name: "Irrfan Khan",
    type: "real",
    category: "Bollywood",
    movie: "The Lunchbox",
    gender: "Male",
    speciality: "Subtle emotional expressions"
  },
  {
    name: "Jackie Chan",
    type: "real",
    category: "Hong Kong Cinema",
    movie: "Police Story",
    gender: "Male",
    speciality: "Acrobatic martial arts comedy"
  },
  {
    name: "Janhvi Kapoor",
    type: "real",
    category: "Bollywood",
    movie: "Dhadak",
    gender: "Female",
    speciality: "Expressive romantic performances"
  },
  {
    name: "Joker",
    type: "fictional",
    category: "DC",
    movie: "Joker",
    gender: "Male",
    speciality: "Chaotic laughter and psychological games"
  },
  {
    name: "Jr NTR",
    type: "real",
    category: "Tollywood",
    movie: "Janatha Garage",
    gender: "Male",
    speciality: "Explosive dance and emotional intensity"
  },
  {
    name: "Kajal Aggarwal",
    type: "real",
    category: "Tollywood",
    movie: "Magadheera",
    gender: "Female",
    speciality: "Romantic period-drama performances"
  },
  {
    name: "Kalyani Priyadarshan",
    type: "real",
    category: "Mollywood",
    movie: "Hridayam",
    gender: "Female",
    speciality: "Expressive performances and charming screen presence"
  },
  {
    name: "Kamal Haasan",
    type: "real",
    category: "Kollywood",
    movie: "Vikram",
    gender: "Male",
    speciality: "Radical character transformations"
  },
  {
    name: "Kareena Kapoor Khan",
    type: "real",
    category: "Bollywood",
    movie: "Jab We Met",
    gender: "Female",
    speciality: "Witty dialogue delivery"
  },
  {
    name: "Katrina Kaif",
    type: "real",
    category: "Bollywood",
    movie: "Tiger Zinda Hai",
    gender: "Female",
    speciality: "High-energy action choreography"
  },
  {
    name: "Keerthy Suresh",
    type: "real",
    category: "Kollywood",
    movie: "Mahanati",
    gender: "Female",
    speciality: "Authentic biographical portrayals"
  },
  {
    name: "Kiara Advani",
    type: "real",
    category: "Bollywood",
    movie: "Kabir Singh",
    gender: "Female",
    speciality: "Poised romantic performances"
  },
  {
    name: "Kriti Sanon",
    type: "real",
    category: "Bollywood",
    movie: "Mimi",
    gender: "Female",
    speciality: "Emotionally nuanced character work"
  },
  {
    name: "Leonardo DiCaprio",
    type: "real",
    category: "Hollywood",
    movie: "Titanic",
    gender: "Male",
    speciality: "Immersive dramatic performances"
  },
  {
    name: "Madhuri Dixit",
    type: "real",
    category: "Bollywood",
    movie: "Hum Aapke Hain Koun..!",
    gender: "Female",
    speciality: "Iconic expressive dance"
  },
  {
    name: "Mahesh Babu",
    type: "real",
    category: "Tollywood",
    movie: "Pokiri",
    gender: "Male",
    speciality: "Understated stylish action"
  },
  {
    name: "Mamitha Baiju",
    type: "real",
    category: "Mollywood",
    movie: "Premalu",
    gender: "Female",
    speciality: "Natural acting and relatable romantic-comedy roles"
  },
  {
    name: "Mammootty",
    type: "real",
    category: "Mollywood",
    movie: "Oru Vadakkan Veeragatha",
    gender: "Male",
    speciality: "Commanding character immersion"
  },
  {
    name: "Mario",
    type: "fictional",
    category: "Nintendo",
    movie: "The Super Mario Bros. Movie",
    gender: "Male",
    speciality: "Pipe-hopping mushroom kingdom hero"
  },
  {
    name: "Mohanlal",
    type: "real",
    category: "Mollywood",
    movie: "Drishyam",
    gender: "Male",
    speciality: "Effortless naturalistic acting"
  },
  {
    name: "Moana",
    type: "fictional",
    category: "Disney",
    movie: "Moana",
    gender: "Female",
    speciality: "Ocean-guided fearless voyaging"
  },
  {
    name: "Mrunal Thakur",
    type: "real",
    category: "Bollywood",
    movie: "Sita Ramam",
    gender: "Female",
    speciality: "Emotional romantic performances"
  },
  {
    name: "Nani",
    type: "real",
    category: "Tollywood",
    movie: "Eega",
    gender: "Male",
    speciality: "Relatable everyman performances"
  },
  {
    name: "Naruto Uzumaki",
    type: "fictional",
    category: "Anime",
    movie: "The Last: Naruto the Movie",
    gender: "Male",
    speciality: "Shadow clones and ninja determination"
  },
  {
    name: "Nayanthara",
    type: "real",
    category: "Kollywood",
    movie: "Raja Rani",
    gender: "Female",
    speciality: "Commanding female-led narratives"
  },
  {
    name: "Nithya Menen",
    type: "real",
    category: "Mollywood",
    movie: "Thiruchitrambalam",
    gender: "Female",
    speciality: "Subtle emotional expressions and natural performances"
  },
  {
    name: "Pawan Kalyan",
    type: "real",
    category: "Tollywood",
    movie: "Gabbar Singh",
    gender: "Male",
    speciality: "Rebellious mass-action charisma"
  },
  {
    name: "Pikachu",
    type: "fictional",
    category: "Pokémon",
    movie: "Pokémon: The First Movie",
    gender: "Male",
    speciality: "Electric cheek sparks"
  },
  {
    name: "Prabhas",
    type: "real",
    category: "Tollywood",
    movie: "Baahubali: The Conclusion",
    gender: "Male",
    speciality: "Towering epic-action heroism"
  },
  {
    name: "Pradeep Ranganathan",
    type: "real",
    category: "Kollywood",
    movie: "Love Today",
    gender: "Male",
    speciality: "Youthful relationship-comedy direction"
  },
  {
    name: "Prithviraj Sukumaran",
    type: "real",
    category: "Mollywood",
    movie: "Lucifer",
    gender: "Male",
    speciality: "Physically transformative dramatic roles"
  },
  {
    name: "Priyanka Chopra Jonas",
    type: "real",
    category: "Bollywood",
    movie: "Fashion",
    gender: "Female",
    speciality: "Versatile roles and strong screen presence"
  },
  {
    name: "Ram Charan",
    type: "real",
    category: "Tollywood",
    movie: "Rangasthalam",
    gender: "Male",
    speciality: "Precision dance and action"
  },
  {
    name: "Ramya Krishnan",
    type: "real",
    category: "Tollywood",
    movie: "Baahubali: The Beginning",
    gender: "Female",
    speciality: "Regal commanding performances"
  },
  {
    name: "Ranbir Kapoor",
    type: "real",
    category: "Bollywood",
    movie: "Rockstar",
    gender: "Male",
    speciality: "Vulnerable introspective character portrayals"
  },
  {
    name: "Ranveer Singh",
    type: "real",
    category: "Bollywood",
    movie: "Bajirao Mastani",
    gender: "Male",
    speciality: "High-voltage expressive performances"
  },
  {
    name: "Rashmika Mandanna",
    type: "real",
    category: "Tollywood",
    movie: "Geetha Govindam",
    gender: "Female",
    speciality: "Expressive emotional reactions"
  },
  {
    name: "Ravi Teja",
    type: "real",
    category: "Tollywood",
    movie: "Kick",
    gender: "Male",
    speciality: "Rapid-fire comic action"
  },
  {
    name: "Rishab Shetty",
    type: "real",
    category: "Sandalwood",
    movie: "Kantara",
    gender: "Male",
    speciality: "Intense folklore-inspired performances"
  },
  {
    name: "Ritu Varma",
    type: "real",
    category: "Tollywood",
    movie: "Pelli Choopulu",
    gender: "Female",
    speciality: "Natural performances and relatable characters"
  },
  {
    name: "Sai Pallavi",
    type: "real",
    category: "Tollywood",
    movie: "Fidaa",
    gender: "Female",
    speciality: "Natural acting and expressive dance performances"
  },
  {
    name: "Salman Khan",
    type: "real",
    category: "Bollywood",
    movie: "Bajrangi Bhaijaan",
    gender: "Male",
    speciality: "Mass-market action charisma"
  },
  {
    name: "Samantha Ruth Prabhu",
    type: "real",
    category: "Tollywood",
    movie: "Oh! Baby",
    gender: "Female",
    speciality: "Emotionally versatile leading roles"
  },
  {
    name: "Shah Rukh Khan",
    type: "real",
    category: "Bollywood",
    movie: "Dilwale Dulhania Le Jayenge",
    gender: "Male",
    speciality: "Signature romantic arm-spread pose"
  },
  {
    name: "Shahid Kapoor",
    type: "real",
    category: "Bollywood",
    movie: "Kabir Singh",
    gender: "Male",
    speciality: "Intense emotionally volatile characters"
  },
  {
    name: "Shraddha Kapoor",
    type: "real",
    category: "Bollywood",
    movie: "Stree",
    gender: "Female",
    speciality: "Playful supernatural-comedy performances"
  },
  {
    name: "Simba",
    type: "fictional",
    category: "Disney",
    movie: "The Lion King",
    gender: "Male",
    speciality: "Lion prince embracing destiny"
  },
  {
    name: "Sivakarthikeyan",
    type: "real",
    category: "Kollywood",
    movie: "Amaran",
    gender: "Male",
    speciality: "Relatable comedy-to-drama transitions"
  },
  {
    name: "Spider-Man",
    type: "fictional",
    category: "Marvel",
    movie: "Spider-Man: No Way Home",
    gender: "Male",
    speciality: "Web-slinging and precognitive spider-sense"
  },
  {
    name: "Sreeleela",
    type: "real",
    category: "Tollywood",
    movie: "Bhagavanth Kesari",
    gender: "Female",
    speciality: "Energetic dance and expressive performances"
  },
  {
    name: "Sridevi",
    type: "real",
    category: "Bollywood",
    movie: "English Vinglish",
    gender: "Female",
    speciality: "Expressive versatility across languages"
  },
  {
    name: "Superman",
    type: "fictional",
    category: "DC",
    movie: "Superman",
    gender: "Male",
    speciality: "Kryptonian flight and heat vision"
  },
  {
    name: "Suriya",
    type: "real",
    category: "Kollywood",
    movie: "Ghajini",
    gender: "Male",
    speciality: "Passionate socially driven performances"
  },
  {
    name: "Taapsee Pannu",
    type: "real",
    category: "Bollywood",
    movie: "Pink",
    gender: "Female",
    speciality: "Strong socially conscious roles"
  },
  {
    name: "Thor",
    type: "fictional",
    category: "Marvel",
    movie: "Thor: Ragnarok",
    gender: "Male",
    speciality: "Thunder manipulation and enchanted hammer"
  },
  {
    name: "Trisha Krishnan",
    type: "real",
    category: "Kollywood",
    movie: "Ponniyin Selvan: I",
    gender: "Female",
    speciality: "Elegant historical-character portrayals"
  },
  {
    name: "Varun Dhawan",
    type: "real",
    category: "Bollywood",
    movie: "Badrinath Ki Dulhania",
    gender: "Male",
    speciality: "Energetic dance and comedy"
  },
  {
    name: "Vijay",
    type: "real",
    category: "Kollywood",
    movie: "Master",
    gender: "Male",
    speciality: "Mass-action screen charisma"
  },
  {
    name: "Vijay Deverakonda",
    type: "real",
    category: "Tollywood",
    movie: "Arjun Reddy",
    gender: "Male",
    speciality: "Rebellious emotionally raw characters"
  },
  {
    name: "Vijay Sethupathi",
    type: "real",
    category: "Kollywood",
    movie: "96",
    gender: "Male",
    speciality: "Unconventional character transformations"
  },
  {
    name: "Will Smith",
    type: "real",
    category: "Hollywood",
    movie: "The Pursuit of Happyness",
    gender: "Male",
    speciality: "Charismatic dramatic storytelling"
  },
  {
    name: "Wonder Woman",
    type: "fictional",
    category: "DC",
    movie: "Wonder Woman",
    gender: "Female",
    speciality: "Amazonian warrior and lasso"
  },
  {
    name: "Wolverine",
    type: "fictional",
    category: "Marvel",
    movie: "Logan",
    gender: "Male",
    speciality: "Retractable adamantium claws"
  },
  {
    name: "Yash",
    type: "real",
    category: "Sandalwood",
    movie: "KGF: Chapter 2",
    gender: "Male",
    speciality: "Commanding rugged action persona"
  },
  {
    name: "Zendaya",
    type: "real",
    category: "Hollywood",
    movie: "Dune: Part Two",
    gender: "Female",
    speciality: "Expressive contemporary screen presence"
  }
]);