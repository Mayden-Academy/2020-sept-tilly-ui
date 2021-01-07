import React from 'react';
import {Link} from "react-router-dom";
import './timeline.css';

class Timeline extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            lessons: [],
            following: [],
            offset: 10
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.handleScroll);
        this.setState({
            lessons: this.props.allLessons.slice(0, this.state.offset)
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.setState({
                lessons: this.props.allLessons.slice(0, this.state.offset)
            });
        }
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
            this.setState({
                offset: this.state.offset + 5
            })
            this.setState({
                lessons: this.props.allLessons.slice(0, this.state.offset)
            })
        }
    }

    render() {
        return (
            <section id="timeline" className="primary">
                <h3>
                    timeline
                </h3>
                {this.state.lessons.map((lesson, i) =>
                    <div key={'lesson' + i} className="lesson">
                        <span className="small">
                            <Link to={"/" + lesson.username}>
                                {lesson.username}
                            </Link> learned,
                        </span>
                        <span className="fade-text small">
                            on {lesson.date}
                        </span>
                        <p>
                            {lesson.lesson}
                        </p>
                    </div>
                )}
            </section>
        );
    }
}

export default Timeline;