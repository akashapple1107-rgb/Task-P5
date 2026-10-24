import { tutorialData } from "../data/data";

function TutorialCard({ lesson }) {
    return (
        <div className="content-card">

            <img
                src={lesson.image}
                alt={lesson.title}
                className="card-image"
            />

            <h3>{lesson.title}</h3>

            <p>{lesson.description}</p>

            <div className="card-info">
                <span>★ {lesson.rating}</span>
                <span>{lesson.author}</span>
            </div>

        </div>
    );
}


function TutorialSection() {
    return (
        <section className="content-section">

            <h2>Featured Tutorials</h2>

            <div className="card-container">

                {tutorialData.map((lesson) => (
                    <TutorialCard
                        key={lesson.id}
                        lesson={lesson}
                    />
                ))}

            </div>

            <button>See all tutorials</button>

        </section>
    );
}

export default TutorialSection;