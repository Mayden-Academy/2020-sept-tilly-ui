import React from "react";
import {Link} from "react-router-dom";
import getLessons from "../../Functions/getLessons";
import getFollowing from "../../Functions/getFollowing";
import "./timeline.css";
import Create from "../Create";
import UserList from "../Following/UserList";
import Sidebar from "../Following/Sidebar";
import follow from "../../Functions/follow";
import unfollow from "../../Functions/unfollow";
import Lesson from "../Lesson";
import search from "../../Functions/search";

class Timeline extends React.Component {

    abortController = new AbortController();

    constructor(props) {
        super(props);
        this.state = {
            display: "timeline",
            allLessons: [],
            visibleLessons: [],
            offset: 10,
            matchedUsers: []
        }
        this.getLessons = getLessons.bind(this);
        this.getFollowing = getFollowing.bind(this);
        this.follow = follow.bind(this);
        this.unfollow = unfollow.bind(this);
    }

    componentDidMount() {
        window.addEventListener("scroll", this.handleScroll);
        if (this.props.currentUser.username) {
            this.getTimelineData();
        }
        this.setState({
            visibleLessons: this.state.allLessons.slice(0, this.state.offset)
        });

    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps !== this.props) {
            if (this.props.currentUser.username) {
                this.getTimelineData();
            }
            this.setState({
                visibleLessons: this.state.allLessons.slice(0, this.state.offset)
            });
        }
    }

    getTimelineData = () => {
        let allLessons = [];
        if (this.props.currentUser) {
            this.getLessons(this.props.currentUser.username, this.abortController)
                .then(lessons => {
                    allLessons = allLessons.concat(lessons);
                    return this.getFollowing(this.props.currentUser.username, this.abortController);
                })
                .then(data => {
                    return Promise.all(
                        data.data.username.following.map(user => {
                            return this.getLessons(user.username, this.abortController);
                        })
                    );
                })
                .then(data => {
                    data.forEach(lessons => {
                        allLessons = allLessons.concat(lessons);
                    });
                    return allLessons;
                })
                .then(data => {
                    data.sort((a, b) => {
                            if (a.id > b.id) {
                                return -1;
                            }
                            if (a.id < b.id) {
                                return 1;
                            }
                            return 0;
                        });
                    this.setState({
                        allLessons: data,
                        visibleLessons: data.slice(0, this.state.offset)
                    });
                    setTimeout(() => console.log(this.state.visibleLessons), 50)
                });
        }
    }

    handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop === document.documentElement.scrollHeight) {
            this.setState({
                offset: this.state.offset + 5
            })
            this.setState({
                visibleLessons: this.state.allLessons.slice(0, this.state.offset)
            })
        }
    }

    handleYouMayKnow = () => {
        this.setState({
            display: "youMayKnow"
        })
    }

    followAction = (event) => {
        this.follow(event, this.abortController)
            .then(data => {
                this.props.getFollowingData();
            });
    }

    unfollowAction = (event) => {
        this.unfollow(event, this.abortController)
            .then(data => {
                this.props.getFollowingData();
            });
    }

    handleSearch = (event) => {
        search(event.target.value, this.abortController)
            .then(data => {
                event.target.value ?
                this.setState({
                    matchedUsers: data.data.search,
                    display: "search"
                }) :
                this.setState({
                    display: "timeline"
                })
            })
    }

    render() {
        return (
            <div>
                <Create
                    id={this.props.currentUser.id}
                    currentUser={this.props.currentUser}
                />
                {this.state.display === "timeline" ?
                    <section id="timeline" className="primary">
                        <h3>
                            timeline
                        </h3>
                        {this.state.visibleLessons.map((lesson, i) =>
                            <Lesson
                                key={"tLesson" + i}
                                lesson={lesson}
                                profile={false}
                            />
                        )}
                    </section>
                    : this.state.display === "youMayKnow" ?
                    <UserList
                        sidebar={false}
                        username={this.props.currentUser.username}
                        loggedIn={this.props.currentUser.loggedIn}
                        onFollow={this.props.onFollow}
                        onUnfollow={this.props.onUnfollow}
                        currentUserUsername={this.props.currentUser.username}
                        currentUserFollowing={this.props.currentUser.following}
                        listTitle={this.props.currentUser.username + "'s potential chums"}
                        userList={this.props.currentUser.youMayKnow}
                    /> :
                    <UserList
                        sidebar={false}
                        username={this.props.currentUser.username}
                        loggedIn={this.props.currentUser.loggedIn}
                        onFollow={this.props.onFollow}
                        onUnfollow={this.props.onUnfollow}
                        currentUserUsername={this.props.currentUser.username}
                        currentUserFollowing={this.props.currentUser.following}
                        listTitle={"search results"}
                        userList={this.state.matchedUsers}
                    />
                }
                <Sidebar
                    sidebar={true}
                    component={"timeline"}
                    username={this.props.currentUser.username}
                    youMayKnow={this.props.currentUser.youMayKnow}
                    loggedIn={this.props.currentUser.loggedIn}
                    onFollow={this.followAction}
                    onUnfollow={this.unfollowAction}
                    youMayKnowLink={this.handleYouMayKnow}
                    currentUserUsername={this.props.currentUser.username}
                    currentUserFollowing={this.props.currentUser.following}
                    handleSearch={this.handleSearch}
                />
            </div>
        );
    }
}

export default Timeline;
