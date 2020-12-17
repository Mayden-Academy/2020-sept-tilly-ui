import React from 'react';
import './profile.css';
import decoder from "../../Functions/decoder";
import Create from "../Create";
import Search from "../Search";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            url: window.location.pathname
        }
    }

    render() {
        return (
            <div>
                {this.state.url === ('/' + this.props.username) &&
                <Create
                    id={this.props.id}
                    onCreateLesson={this.props.onAddLesson}
                />}
                <section id="my-lessons" className="primary">
                    <h3>
                        my lessons
                    </h3>
                    {this.props.lessons.map((lesson, i) =>
                        <div key={'lesson' + i} className="lesson">
                            <span className="fade-text small">
                                {lesson.date}
                            </span>
                            <p>
                                {lesson.lesson}
                            </p>
                        </div>
                    )}
                </section>
                <Search />
            </div>
        );
    }
}

export default Profile;