import React from 'react';
import Create from "../../Create";
import Following from "../../Sides/Following";
import '../profile.css';

class Current extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            username: '',
            email: '',
            description: '',
            lessons: [],
            following: [],
            url: window.location.pathname
        }
    }

    render() {
        return (
            <div>
                <Create
                    id={this.props.id}
                    onCreateLesson={this.props.onAddLesson}
                />
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
                <Following
                    following={this.props.following}
                />
            </div>
        );
    }
}

export default Current;