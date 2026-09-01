import {
  Brain,
  MessageCircleQuestion,
  MousePointerClick,
  Trophy,
} from "lucide-react";

function About() {
  const instructions = [
    {
      number: "01",
      icon: Brain,
      title: "Think",
      description:
        "Think of any real or fictional character. Keep the character in your mind.",
    },
    {
      number: "02",
      icon: MessageCircleQuestion,
      title: "Answer",
      description:
        "Akinator will ask simple questions about your character.",
    },
    {
      number: "03",
      icon: MousePointerClick,
      title: "Choose",
      description:
        "Select Yes or No based on the character you are thinking of.",
    },
    {
      number: "04",
      icon: Trophy,
      title: "Get the Guess",
      description:
        "Akinator narrows down the possibilities and attempts to identify your character.",
    },
  ];

  return (
    <section className="about section" id="about">
      <div className="section-container">
        <div className="section-heading">
          <span className="section-label">HOW IT WORKS</span>

          <h2>
            Let the guessing begin
          </h2>
          <p>
            Akinator will ask you a series of questions to guess the character you're thinking of. It uses your answers to progressively narrow down the list
            of possible characters and make its best prediction.
          </p>
        </div>

        <div className="instructions-grid">
          {instructions.map((item) => {
            const Icon = item.icon;

            return (
              <div className="instruction-card" key={item.number}>
                <div className="instruction-top">
                  <span className="instruction-number">{item.number}</span>

                  <div className="instruction-icon">
                    <Icon size={23} />
                  </div>
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default About;