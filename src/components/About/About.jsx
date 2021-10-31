import React from 'react';
import '../../css/About.css';
import TypeAnimation from 'react-type-animation';


const About = () => {
    return (
        <section className="about">

        <div className="about-typing-container">
            <TypeAnimation
					className='about-typing'
					cursor={false}
					sequence={[
						'Find your path',
					]}
					wrapper='a'
					repeat={1}
				/>
        </div>
        <div className="copy-box">
            <div className="about-statement">
                <h2>Wandering Souls</h2>
                <p>By now, we're sure you've heard the age-old expression, "Not all who wander are lost." We have decided to embody that in our own way through the creation of this app. <br/> <br/> One who wanders may simply be one in search of a new adventure. By using the Wandr app we make it easy for you to discover that next adventure and encapsulate it as a memory for you to keep.</p>
            </div>

            <div className="team">
                <h2>Meet the team</h2>
            <p>Sahira Bibi   <a href="https://github.com/sahirabibi" alt="sahira's website"> <img className="githubLogo" src="https://i.imgur.com/i9Pl0DI.png" alt="github logo"/> </a> </p>
            <p>Shelby Reese   <a href="https://github.com/shelbyreese47" alt="shelby's website"> <img className="githubLogo"  src="https://i.imgur.com/i9Pl0DI.png" alt="github logo"/>  </a></p>
            <p>Drew McLean   <a href="https://github.com/itsreallydrew" alt="drew's website"> <img className="githubLogo"  src="https://i.imgur.com/i9Pl0DI.png" alt="github logo"/> </a></p>
            <p>Ben Papac   <a href="https://github.com/benpapac" alt="ben's website"> <img className="githubLogo"  src="https://i.imgur.com/i9Pl0DI.png" alt="github logo"/> </a></p>
            </div>
        </div>
        </section>
    );
};

export default About;