import React from "react";
import Following from "../Sides/Following";
import ProfileHeader from "./ProfileHeader";
import Create from "../Create";
import follow from "../../Functions/follow";
import unfollow from "../../Functions/unfollow";
import getLessons from "../../Functions/getLessons";
import getFollowing from "../../Functions/getFollowing";
import getUserData from "../../Functions/getUserData";
import "./profile.css";

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: "",
            username: "",
            name: "",
            email: "",
            description: "",
            lessons: [],
            following: [],
            currentUserFollowing: []
        }
        this.getUserData = getUserData.bind(this);
        this.getLessons = getLessons.bind(this);
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
        this.getFollowing = getFollowing.bind(this);
    }

    abortController = new AbortController();

    componentDidMount() {
        this.getUserData(this.props.match.params.username, this.abortController);
        this.getFollowingData();
        this.getLessonData();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            this.getFollowingData();
            this.getLessonData();
        }
    }

    componentWillUnmount() {
        this.abortController.abort();
    }

    getLessonData = () => {
        this.getLessons(this.props.match.params.username, this.abortController)
            .then(data => {
                this.setState({
                    lessons: data
                });
            });
    }

    getFollowingData = () => {
        if (this.props.match.params.username && this.props.currentUser.username) {
            this.getFollowing(this.props.match.params.username, this.abortController)
                .then(data => {
                    this.setState({
                        following: data.data.username.following
                    });
                });
            this.getFollowing(this.props.currentUser.username, this.abortController)
                .then(data => {
                    this.setState({
                        currentUserFollowing: data.data.username.following
                    });
                });
        }
    }

    followAction = (event) => {
        console.log(event.target.value)
        this.follow(event, this.abortController)
            .then(data => {
                this.getFollowingData();
            });
    }

    unfollowAction = (event) => {
        console.log(event.target.value)
        this.unfollow(event, this.abortController)
            .then(data => {
                this.getFollowingData();
            });
    }

    addLesson = (text) => {
        let stateCopy = {...this.state}
        const lesson = {lesson: text, date: "just now"};
        stateCopy.lessons.unshift(lesson);
        this.setState({...stateCopy});
    }

    render() {
        return (
            <div>
                <Create
                    id={this.props.id}
                    currentUser={this.props.currentUser}
                    username={this.props.match.params.username}
                    onAddLesson={this.addLesson}
                />
                <section id="my-lessons" className="primary">
                    <ProfileHeader
                        id={this.state.id}
                        currentUser={this.props.currentUser}
                        currentUserFollowing={this.state.currentUserFollowing}
                        username={this.props.match.params.username}
                        following={this.state.following}
                        onFollow={this.followAction}
                        onUnfollow={this.unfollowAction}
                    />
                    {this.state.lessons.map((lesson, i) =>
                        <div key={"lesson" + i} className="lesson">
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
                    id={this.state.id}
                    loggedIn={this.props.currentUser.loggedIn}
                    currentUserUsername={this.props.currentUser.username}
                    currentUserFollowing={this.state.currentUserFollowing}
                    username={this.props.match.params.username}
                    following={this.state.following}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                />
            </div>
        );
    }
}

export default Profile;
