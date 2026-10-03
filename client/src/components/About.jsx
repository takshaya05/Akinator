import {
  Brain,
  MessageCircleQuestion,
  MousePointerClick,
  Trophy,
} from "lucide-react";

function About() {
  const instructions = [
    ["01", Brain, "Think", "Think of any real or fictional character and keep it in your mind."],
    ["02", MessageCircleQuestion, "Answer", "Akinator will ask simple questions about your character."],
    ["03", MousePointerClick, "Choose", "Select Yes or No based on the character you are thinking of."],
    ["04", Trophy, "Get the Guess", "Akinator narrows down the possibilities and attempts to identify your character."],
  ];

  return (
    <section className="about section" id="about">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">HOW IT WORKS</span>
          <h2>Let the guessing begin</h2>
          <p>
            Akinator asks questions about your character and uses your answers
            to narrow down the possibilities and make its best prediction.
          </p>
        </div>

        <div className="instructions-grid">
          {instructions.map(([number, Icon, title, description]) => (
            <div className="instruction-card" key={number}>
              <div className="instruction-top">
                <span className="instruction-number">{number}</span>
                <div className="instruction-icon">
                  <Icon size={23} />
                </div>
              </div>
              <h3>{title}</h3>
              <p>{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default About;